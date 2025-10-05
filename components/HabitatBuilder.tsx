import React, { useState, useRef, useCallback, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BuilderConfig, PlacedPart, HabitatPartType, TabID } from '../types';
import { partIcons, partLabels, getPartSize, PartComponent } from './IconComponents';
import { LUNAR_DOME_SPECS, INFLIGHT_DOME_SPECS, MARTIAN_DOME_SPECS, ORBITAL_DOME_SPECS } from '../constants';


interface HabitatBuilderProps {
  config: BuilderConfig;
}

const HabitatBuilder: React.FC<HabitatBuilderProps> = ({ config }) => {
  const [placedParts, setPlacedParts] = useState<PlacedPart[]>([]);
  const [selectedPart, setSelectedPart] = useState<HabitatPartType | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [generatedExteriorImage, setGeneratedExteriorImage] = useState<string | null>(null);
  const [generatedInteriorImages, setGeneratedInteriorImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const domeSpecs = useMemo(() => {
    switch (config.id) {
      case TabID.LunarBuilder: return LUNAR_DOME_SPECS;
      case TabID.MartianBuilder: return MARTIAN_DOME_SPECS;
      case TabID.InflightBuilder: return INFLIGHT_DOME_SPECS;
      case TabID.OrbitalBuilder: return ORBITAL_DOME_SPECS;
      default: return [];
    }
  }, [config.id]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedPart || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const partSize = getPartSize(selectedPart);
    const x = e.clientX - canvasRect.left - partSize.width / 2;
    const y = e.clientY - canvasRect.top - partSize.height / 2;

    const newPart: PlacedPart = {
      id: new Date().toISOString(),
      type: selectedPart,
      x,
      y,
    };
    setPlacedParts([...placedParts, newPart]);
  };

  const handleReset = useCallback(() => {
    setPlacedParts([]);
    setSelectedPart(null);
  }, []);
  
  const handlePartSelect = (part: HabitatPartType) => {
    setSelectedPart(part === selectedPart ? null : part);
  }

  const handleOpenAnalysisModal = () => {
    setGeneratedExteriorImage(null);
    setGeneratedInteriorImages([]);
    setError(null);
    setIsAnalysisModalOpen(true);
  };
  
  const handleCloseAnalysisModal = () => {
    setIsAnalysisModalOpen(false);
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setGeneratedExteriorImage(null);
    setGeneratedInteriorImages([]);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const specsString = domeSpecs.map(s => `${s.parameter}: ${s.value}`).join('; ');

      let prompts: string[] = [];

      switch (config.id) {
        case TabID.LunarBuilder: {
          const exteriorPrompt = `Generate a photorealistic concept art of a lunar habitat on the Moon's surface, based on the following specifications: ${specsString}. Key visual elements to include: The dome as the main structure, adjacent solar panels, the lunar surface environment with harsh lighting and deep shadows, and the blackness of space with a visible Earth in the sky. The image should be high-resolution, cinematic, and highly detailed.`;
          const interiorPrompts = [
            `Photorealistic concept art of the interior of a lunar habitat dome, focusing on the crew's living quarters. The design should feel functional yet comfortable for 4-6 crew members, with sleeping pods, a communal area, and personal storage. Base the design on these specs: ${specsString}. Show the curved dome ceiling. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a lunar habitat dome, focusing on the laboratory and research area. Show advanced scientific equipment, sample analysis stations, and glove boxes. The environment should be sterile and highly technical. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a lunar habitat dome, focusing on the operations and command center. Include control consoles with multiple displays showing mission data, communication systems, and views of the lunar exterior. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a lunar habitat dome, showing the closed-loop Environmental Control and Life Support System (ECLSS). Visualize the complex machinery for CO2 scrubbing, oxygen generation, and water recycling, with neatly organized pipes and hardware. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`
          ];
          prompts = [exteriorPrompt, ...interiorPrompts];
          break;
        }

        case TabID.MartianBuilder: {
          const exteriorPrompt = `Generate a photorealistic concept art of a Martian habitat, partially subterranean on the surface of Mars, based on the following specifications: ${specsString}. Key visual elements to include: A surface-level airlock dome connected to the underground modules, vertical solar arrays mitigating dust, the reddish Martian landscape with a thin, pinkish sky, and evidence of robotic mining operations nearby. The image should be high-resolution, cinematic, and evoke a sense of rugged pioneering.`;
          const interiorPrompts = [
            `Photorealistic concept art of the interior of a subterranean Martian habitat, focusing on the crew's living quarters. The area is functional and compact, with multi-purpose furniture and a small viewport showing the red soil outside. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a Martian habitat, focusing on the geological research laboratory. Show equipment for analyzing rock and soil samples, a containment glovebox, and screens displaying mineral composition data. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a Martian habitat, showing the mission operations center. Crew members monitor robotic rovers and drilling equipment on large displays. The center manages the base's power and life support systems. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a Martian habitat, featuring the ECLSS and an integrated hydroponics bay for food production. Show racks of green plants under purple grow lights, contrasting with the metallic, industrial look of the life support machinery. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`
          ];
          prompts = [exteriorPrompt, ...interiorPrompts];
          break;
        }

        case TabID.InflightBuilder: {
          const exteriorPrompt = `Generate a photorealistic concept art of a large, inflatable habitat module designed for a long-duration deep space mission from the Moon to Mars. The habitat is a key component of a larger interplanetary transit vehicle. Base the design on the following specifications: ${specsString}. Key visual elements: The inflatable module should have a multi-layered, robust appearance with small observation windows. It is docked to a truss-based main spacecraft structure. The main ship features large solar arrays for power and radiators for cooling. The background is the vast, empty blackness of deep space, with a distant Sun and starfield, conveying a sense of isolation and journey. The image should be cinematic, high-resolution, and exceptionally detailed, with a realistic feel.`;
          const interiorPrompts = [
            `Photorealistic concept art of the interior of a deep-space transit habitat module, showing the crew's living quarters for a 500-day mission. The zero-gravity environment has modular sleeping pods, a communal galley/recreation area, and a small viewport showing the vastness of space. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a deep-space transit habitat module, focused on the compact, multi-disciplinary science and research station. Show crew members conducting experiments in microgravity, with equipment for geology, biology, and physics research. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a deep-space transit habitat module, showing the flight deck and operations center. Include advanced control consoles, holographic displays showing trajectory and ship status, and seats for the 4-person crew overlooking a large forward viewport. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of a deep-space transit habitat module, featuring the regenerative ECLSS and integrated hydroponics bay. Visualize the glowing lights of the plant growth racks, with various crops growing to supplement the crew's diet. The area is filled with the complex machinery of life support systems. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`
          ];
          prompts = [exteriorPrompt, ...interiorPrompts];
          break;
        }
          
        case TabID.OrbitalBuilder: {
          const exteriorPrompt = `Generate a photorealistic concept art of a modular habitat dome attached to a large orbital space station, based on the following specifications: ${specsString}. Key visual elements: The hard-shell module is docked to the station via a Common Berthing Mechanism. The station itself has large solar arrays and robotic arms. The Earth or Moon is visible in the background. The scene should feel complex and technologically advanced. High-resolution, cinematic, and detailed.`;
          const interiorPrompts = [
            `Photorealistic concept art of the interior of a zero-gravity orbital habitat module, showing the crew's quarters. Include sleeping bags attached to walls, a personal workstation, and handholds for navigation. A large window provides a stunning view of Earth below. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of an orbital habitat module, configured as a microgravity research laboratory. Show standardized experiment racks (like ISS EXPRESS racks), a glovebox for contained experiments, and astronauts working. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of an orbital habitat module, serving as a station operations and control center. Displays show station status, experiment data, and communication links. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`,
            `Photorealistic concept art of the interior of an orbital habitat module, set up as an in-space manufacturing and 3D printing bay. Show advanced 3D printers creating tools or components in zero-g, with raw material spools and finished parts stored nearby. Base the design on these specs: ${specsString}. High resolution, cinematic, detailed.`
          ];
          prompts = [exteriorPrompt, ...interiorPrompts];
          break;
        }
      }

      if (prompts.length === 0) {
        setError('No prompts configured for this habitat type.');
        setIsGenerating(false);
        return;
      }

      const imagePromises = prompts.map(prompt => 
        ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
          },
        })
      );
      
      const responses = await Promise.all(imagePromises);

      const images = responses.map(response => {
        if (response.generatedImages && response.generatedImages.length > 0) {
          const base64ImageBytes = response.generatedImages[0].image.imageBytes;
          return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
      });
      
      if (images.some(img => img === null) || images.length === 0) {
        setError('Image generation failed.');
        return;
      }
      
      setGeneratedExteriorImage(images[0]);
      setGeneratedInteriorImages(images.length > 1 ? images.slice(1) as string[] : []);

    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the images. Please check the console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full gap-4 p-4 bg-black/30 rounded-lg">
      <div className="w-full md:w-48 flex-shrink-0 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
        <button
            onClick={handleOpenAnalysisModal}
            className="p-3 rounded-lg bg-purple-600/80 text-white hover:bg-purple-500/80 transition-colors duration-200 w-28 md:w-full flex-shrink-0 text-sm font-semibold"
        >
            Habitat Explorer
        </button>
        <button
            onClick={handleReset}
            className="p-3 rounded-lg bg-red-600/80 text-white hover:bg-red-500/80 transition-colors duration-200 w-28 md:w-full flex-shrink-0"
        >
            Reset
        </button>
        
        <hr className="border-gray-600 hidden md:block my-2" />
        
        <h3 className="text-lg font-bold text-white hidden md:block">Future Features</h3>
        {config.availableParts.map((partType) => {
          const Icon = partIcons[partType];
          return (
            <button
              key={partType}
              onClick={() => handlePartSelect(partType)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 w-28 md:w-full flex-shrink-0 ${
                selectedPart === partType
                  ? 'bg-cyan-500 text-white ring-2 ring-cyan-300'
                  : 'bg-gray-700/80 text-gray-300 hover:bg-cyan-600/50 hover:text-white'
              }`}
            >
              <Icon className="w-10 h-10 mb-1" />
              <span className="text-xs text-center">{partLabels[partType]}</span>
            </button>
          );
        })}
      </div>
      <div className="flex-grow h-96 md:h-auto relative rounded-lg overflow-hidden border-2 border-gray-700">
        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.backgroundImage})`, cursor: selectedPart ? 'copy' : 'default' }}
        >
            <div className="absolute inset-0 bg-black/20"></div>
          {placedParts.map((part) => (
            <div
              key={part.id}
              className="absolute"
              style={{
                left: `${part.x}px`,
                top: `${part.y}px`,
              }}
            >
              <PartComponent type={part.type} />
            </div>
          ))}
        </div>
        {!selectedPart && placedParts.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-white text-xl bg-black/50 p-4 rounded-lg">Select a feature from the left to begin building.</p>
            </div>
        )}
      </div>

      {isAnalysisModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handleCloseAnalysisModal} role="dialog" aria-modal="true" aria-labelledby="analysis-title">
          <div className="bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
              <h2 id="analysis-title" className="text-2xl font-bold text-cyan-300">Habitat Explorer</h2>
              <button onClick={handleCloseAnalysisModal} className="text-gray-400 hover:text-white text-3xl leading-none" aria-label="Close modal">&times;</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Minimum Specifications</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-700">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-cyan-300 uppercase bg-gray-900/50">
                            <tr>
                                <th scope="col" className="px-4 py-3">Parameter</th>
                                <th scope="col" className="px-4 py-3">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domeSpecs.map(spec => (
                                <tr key={spec.parameter} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                    <td className="px-4 py-3 font-medium text-white">{spec.parameter}</td>
                                    <td className="px-4 py-3">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">AI Visualization</h3>
                <div className="flex flex-col gap-4">
                  <button onClick={handleGenerateImage} disabled={isGenerating} className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75">
                    {isGenerating ? 'Generating...' : 'Generate Image(s)'}
                  </button>
                  
                  {isGenerating && (
                    <div className="text-center text-gray-400 p-8">
                        <svg className="animate-spin h-8 w-8 text-white mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p>Generating visualizations... <br/>This may take a moment.</p>
                    </div>
                  )}
                  {error && <p className="text-red-400 p-4 text-center">{error}</p>}

                  {!isGenerating && !error && !generatedExteriorImage && (
                    <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                        <p className="text-gray-400 p-4 text-center">Click 'Generate' to visualize the habitat dome based on its specs.</p>
                    </div>
                  )}

                  {!isGenerating && !error && generatedExteriorImage && (
                    <div className="flex flex-col gap-6">
                        <div>
                            <h4 className="text-lg font-semibold mb-2 text-cyan-500">Exterior View</h4>
                            <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                                <img src={generatedExteriorImage} alt="AI generated habitat dome exterior" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {generatedInteriorImages.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold mb-2 text-cyan-500">Interior Views</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {generatedInteriorImages.map((src, index) => (
                                        <div key={index} className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                                            <img src={src} alt={`AI generated habitat interior view ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitatBuilder;