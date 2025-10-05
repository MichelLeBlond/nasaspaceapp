import React, { useState, useMemo, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { TabID } from './types';
import { TAB_DEFINITIONS, DESCRIPTIVE_CONTENT, BUILDER_CONFIGS } from './constants';
import TabButton from './components/TabButton';
import HabitatBuilder from './components/HabitatBuilder';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabID>(TabID.Info);
  
  const [orbitalStationImage, setOrbitalStationImage] = useState<string | null>(null);
  const [isGeneratingOrbitalImage, setIsGeneratingOrbitalImage] = useState(false);
  const [orbitalImageError, setOrbitalImageError] = useState<string | null>(null);

  const [lunarHabitatImage, setLunarHabitatImage] = useState<string | null>(null);
  const [isGeneratingLunarImage, setIsGeneratingLunarImage] = useState(false);
  const [lunarImageError, setLunarImageError] = useState<string | null>(null);

  const [martianHabitatImage, setMartianHabitatImage] = useState<string | null>(null);
  const [isGeneratingMartianImage, setIsGeneratingMartianImage] = useState(false);
  const [martianImageError, setMartianImageError] = useState<string | null>(null);

  const addWatermark = (base64Image: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }
        
        ctx.drawImage(img, 0, 0);
        
        const fontSize = Math.max(12, Math.min(canvas.width, canvas.height) / 50);
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        ctx.fillText('AI Generated', canvas.width - 10, canvas.height - 10);
        
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = base64Image;
    });
  };

  useEffect(() => {
    const generateOrbitalImage = async () => {
      setIsGeneratingOrbitalImage(true);
      setOrbitalImageError(null);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `A photorealistic, cinematic concept art of a massive, bustling orbital shipyard and space station in a stable Earth orbit. The station serves as a primary assembly point for interplanetary vessels. It features large, modular bays where prefabricated components are assembled by robotic arms and EVA specialists. Multiple spacecraft are docked, and smaller transport vehicles are moving around. The Earth is visible in the background. The scene is full of activity and detail, conveying a sense of a critical logistics hub for humanity's expansion into space.`;
        
        const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
          },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          const base64ImageBytes = response.generatedImages[0].image.imageBytes;
          const originalImage = `data:image/jpeg;base64,${base64ImageBytes}`;
          const watermarkedImage = await addWatermark(originalImage);
          setOrbitalStationImage(watermarkedImage);
        } else {
          throw new Error("Image generation failed to return an image.");
        }

      } catch (e) {
        console.error(e);
        setOrbitalImageError('Failed to generate image. Please try again later.');
      } finally {
        setIsGeneratingOrbitalImage(false);
      }
    };

    if (activeTab === TabID.StationDesc && !orbitalStationImage && !isGeneratingOrbitalImage) {
      generateOrbitalImage();
    }
  }, [activeTab, orbitalStationImage, isGeneratingOrbitalImage]);

  useEffect(() => {
    const generateLunarImage = async () => {
        setIsGeneratingLunarImage(true);
        setLunarImageError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `A photorealistic, cinematic concept art of a sprawling lunar habitat on the Moon's surface. The central feature is a self-sustaining outpost built from inflatable structures reinforced with sintered regolith. In the surrounding area, show active on-site mining operations with rovers and robotic extractors kicking up dust. Include advanced refinement facilities processing the lunar soil. An electromagnetic rail gun is visible in the distance, prepared to launch materials into orbit. The scene should be full of activity under the harsh lighting of the lunar environment, with deep shadows and the Earth visible in the black sky. High-resolution and highly detailed.`;

            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '16:9',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                const originalImage = `data:image/jpeg;base64,${base64ImageBytes}`;
                const watermarkedImage = await addWatermark(originalImage);
                setLunarHabitatImage(watermarkedImage);
            } else {
                throw new Error("Image generation failed to return an image.");
            }

        } catch (e) {
            console.error(e);
            setLunarImageError('Failed to generate image. Please try again later.');
        } finally {
            setIsGeneratingLunarImage(false);
        }
    };

    if (activeTab === TabID.LunarDesc && !lunarHabitatImage && !isGeneratingLunarImage) {
        generateLunarImage();
    }
  }, [activeTab, lunarHabitatImage, isGeneratingLunarImage]);

  useEffect(() => {
    const generateMartianImage = async () => {
        setIsGeneratingMartianImage(true);
        setMartianImageError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `A photorealistic, cinematic concept art of a Martian habitat colony. The scene features subterranean inflatable modules with surface-level access points and observation domes. In the surrounding area, show robotic operations: advanced machinery harvesting carbon dioxide from the thin atmosphere, and drilling rigs extracting sub-surface water ice. A nearby transparent bio-dome reveals a lush hydroponics farm inside. A small chemical rocket is on a landing pad, preparing for a supply run to Phobos. The Martian landscape is vast and reddish, under a dusty pink sky. High-resolution and highly detailed.`;

            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '16:9',
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                const originalImage = `data:image/jpeg;base64,${base64ImageBytes}`;
                const watermarkedImage = await addWatermark(originalImage);
                setMartianHabitatImage(watermarkedImage);
            } else {
                throw new Error("Image generation failed to return an image.");
            }

        } catch (e) {
            console.error(e);
            setMartianImageError('Failed to generate image. Please try again later.');
        } finally {
            setIsGeneratingMartianImage(false);
        }
    };

    if (activeTab === TabID.MartianDesc && !martianHabitatImage && !isGeneratingMartianImage) {
        generateMartianImage();
    }
}, [activeTab, martianHabitatImage, isGeneratingMartianImage]);

  const renderContent = useMemo(() => {
    const isBuilderTab = [TabID.LunarBuilder, TabID.MartianBuilder, TabID.InflightBuilder, TabID.OrbitalBuilder].includes(activeTab);
    
    if (isBuilderTab) {
      const config = BUILDER_CONFIGS[activeTab];
      return <HabitatBuilder config={config} />;
    }

    const content = DESCRIPTIVE_CONTENT[activeTab];
    if (!content) return null;

    if ([TabID.StationDesc, TabID.LunarDesc, TabID.MartianDesc].includes(activeTab)) {
        const configMap = {
            [TabID.StationDesc]: {
                isLoading: isGeneratingOrbitalImage,
                error: orbitalImageError,
                image: orbitalStationImage,
                loadingText: "Generating orbital view...",
                altText: "AI Generated Orbital Station",
            },
            [TabID.LunarDesc]: {
                isLoading: isGeneratingLunarImage,
                error: lunarImageError,
                image: lunarHabitatImage,
                loadingText: "Generating lunar view...",
                altText: "AI Generated Lunar Habitat",
            },
            [TabID.MartianDesc]: {
                isLoading: isGeneratingMartianImage,
                error: martianImageError,
                image: martianHabitatImage,
                loadingText: "Generating Martian view...",
                altText: "AI Generated Martian Habitat",
            }
        };

      const { isLoading, error, image, loadingText, altText } = configMap[activeTab as keyof typeof configMap];

      return (
        <div className="h-full w-full rounded-lg p-4 md:p-8 flex flex-col md:flex-row items-center gap-8 bg-black/30">
          <div className="md:w-1/2 bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h2 className="text-3xl font-bold text-cyan-300 mb-4">{content.title}</h2>
              <p className="text-gray-200 mb-6 text-lg leading-relaxed">{content.content}</p>
              <p className="text-cyan-400 italic text-md">{content.subtext}</p>
          </div>
          <div className="md:w-1/2 w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700 overflow-hidden">
             {isLoading && (
                <div className="text-center text-gray-400">
                    <svg className="animate-spin h-8 w-8 text-white mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>{loadingText}</p>
                </div>
             )}
             {error && <p className="text-red-400 p-4 text-center">{error}</p>}
             {image && (
              <img src={image} alt={altText} className="w-full h-full object-cover" />
             )}
          </div>
        </div>
      );
    }

    let bgImageUrl = '';
    if (activeTab === TabID.Info) bgImageUrl = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';
    
    return (
      <div className="h-full w-full rounded-lg bg-cover bg-center p-8 flex items-center justify-center" style={{backgroundImage: `url(${bgImageUrl})`}}>
          <div className="bg-black/70 backdrop-blur-md p-8 rounded-xl max-w-2xl text-center text-white border border-gray-600">
            <h2 className="text-3xl font-bold text-cyan-300 mb-4">{content.title}</h2>
            <p className="text-gray-200 mb-6 text-lg leading-relaxed">{content.content}</p>
            <p className="text-cyan-400 italic text-md">{content.subtext}</p>
          </div>
      </div>
    );
  }, [activeTab, orbitalStationImage, isGeneratingOrbitalImage, orbitalImageError, lunarHabitatImage, isGeneratingLunarImage, lunarImageError, martianHabitatImage, isGeneratingMartianImage, martianImageError]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8 flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Extraterrestrial Habitat <span className="text-cyan-400">Design and Analysis Platform</span>
        </h1>
        <p className="text-gray-400 mt-2">Design the future of humanity in space.</p>
      </header>
      
      <main className="flex-grow flex flex-col bg-gray-800/40 rounded-xl shadow-2xl p-4 border border-gray-700">
        <div className="flex flex-wrap gap-2 mb-4">
          {TAB_DEFINITIONS.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
        <div className="flex-grow relative">
          {renderContent}
        </div>
      </main>
    </div>
  );
};

export default App;
