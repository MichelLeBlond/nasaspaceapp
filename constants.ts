import { TabID, BuilderConfig, HabitatPartType } from './types';

export const TAB_DEFINITIONS = [
  { id: TabID.Info, label: "About This Tool" },
  { id: TabID.LunarDesc, label: "Lunar Habitat" },
  { id: TabID.MartianDesc, label: "Martian Habitat" },
  { id: TabID.StationDesc, label: "Orbital Station" },
  { id: TabID.LunarBuilder, label: "Build on Moon" },
  { id: TabID.MartianBuilder, label: "Build on Mars" },
  { id: TabID.InflightBuilder, label: "Build In-Flight" },
  { id: TabID.OrbitalBuilder, label: "Build in Orbit" }
];

export const LUNAR_DOME_SPECS = [
  { parameter: 'Type', value: 'Inflatable structure with sintered regolith composite shell' },
  { parameter: 'Primary Function', value: 'Living quarters, laboratory, and operations center' },
  { parameter: 'Capacity', value: '4-6 crew members' },
  { parameter: 'Diameter', value: '8 meters (minimum)' },
  { parameter: 'Height', value: '4 meters (internal)' },
  { parameter: 'Radiation Shielding', value: 'Minimum 1 meter of compressed lunar regolith' },
  { parameter: 'Micrometeoroid Protection', value: 'Multi-layer Whipple shield integrated into the shell' },
  { parameter: 'Life Support', value: 'Closed-loop ECLSS system (CO2 scrubbing, O2 generation, water recycling)' },
  { parameter: 'Power Requirement', value: '15 kW (peak), supplied by adjacent solar arrays' },
  { parameter: 'Connectivity Ports', value: '4 standard docking/corridor ports' },
];

export const INFLIGHT_DOME_SPECS = [
  { parameter: 'Type', value: 'Inflatable "TransHab" style module for interplanetary transit' },
  { parameter: 'Primary Function', value: 'Long-duration crew habitat for Moon-to-Mars missions' },
  { parameter: 'Capacity', value: '4 crew members for up to 500 days' },
  { parameter: 'Pressurized Volume', value: '350 cubic meters (minimum)' },
  { parameter: 'Length', value: '11 meters (overall)' },
  { parameter: 'Radiation Shielding', value: 'Multi-layer system with water-filled shell and dedicated polyethylene storm shelter' },
  { parameter: 'Micrometeoroid Protection', value: 'Advanced Whipple shield with multiple bumper layers' },
  { parameter: 'Life Support', value: 'Regenerative ECLSS with hydroponics for food supplement' },
  { parameter: 'Power System', value: 'Integrates with main vessel\'s solar electric or nuclear thermal propulsion system (NTP)' },
  { parameter: 'Docking', value: 'Standard docking mechanism for integration with main transit vehicle' },
];

export const MARTIAN_DOME_SPECS = [
  { parameter: 'Type', value: 'Subterranean inflatable module with surface-level dome airlock' },
  { parameter: 'Primary Function', value: 'Primary habitat, research lab, and mission control' },
  { parameter: 'Capacity', value: '4-6 crew members' },
  { parameter: 'Diameter', value: '9 meters (subterranean main module)' },
  { parameter: 'Radiation Shielding', value: 'Minimum 3 meters of Martian regolith overburden' },
  { parameter: 'Atmospheric Processing', value: 'MOXIE-derived system for O2 production from CO2' },
  { parameter: 'Life Support', value: 'Closed-loop ECLSS with water recovery from sub-surface ice' },
  { parameter: 'Power Requirement', value: '20 kW (peak), supplied by deployable vertical solar arrays with dust mitigation' },
  { parameter: 'Connectivity Ports', value: 'Pressurized rover docking port and 2 corridor ports' },
];

export const ORBITAL_DOME_SPECS = [
  { parameter: 'Type', value: 'Modular hard-shell composite habitat for orbital station' },
  { parameter: 'Primary Function', value: 'Zero-G laboratory, manufacturing bay, and crew quarters' },
  { parameter: 'Capacity', value: '4 crew members (rotating)' },
  { parameter: 'Pressurized Volume', value: '150 cubic meters' },
  { parameter: 'Docking', value: '2x Common Berthing Mechanism (CBM) ports for station integration' },
  { parameter: 'Radiation Shielding', value: 'Augmented polyethylene layers and station-provided shielding' },
  { parameter: 'Micrometeoroid Protection', value: 'Advanced Whipple shield optimized for LEO or lunar orbit debris environment' },
  { parameter: 'Life Support', value: 'Integrates with main station ECLSS resources' },
  { parameter: 'Power System', value: 'Receives power from station main bus via CBM connection' },
  { parameter: 'Special Features', value: 'Robotic arm grapple fixture, large Earth-observation window' },
];


export const DESCRIPTIVE_CONTENT: Record<string, { title: string; content: string; subtext: string; }> = {
  [TabID.Info]: {
    title: "Extraterrestrial Habitat Design and Analysis Platform",
    content: "This application is both a powerful working tool and an educational platform designed to help students, space agencies like NASA and the Canadian Space Agency, and researchers explore and understand the complex design specifications required for extraterrestrial habitats. Whether you're a student learning the fundamentals of space architecture, an engineer prototyping real mission concepts, or a researcher analyzing habitat requirements, this tool enables you to design and test prototype habitats that comply with established space agency standards and mission requirements.",
    subtext: "Use it to experiment with life support systems, structural designs, and resource management strategies while learning the real-world constraints and challenges of building humanity's future homes beyond Earth. Every design you create helps bridge the gap between theoretical knowledge and practical application in space exploration."
  },
  [TabID.LunarDesc]: {
    title: "Lunar Habitat",
    content: "The lunar habitat is a self-sustaining outpost built from inflatable structures reinforced with a sintered regolith composite. On-site mining operations extract valuable volatiles and minerals from the lunar soil, which are then processed in advanced refinement facilities. This process yields essential materials for construction, life support, and 3D printing of tools and replacement parts, minimizing dependency on Earth.",
    subtext: "Finished materials and surplus resources are efficiently launched into orbit using a massive electromagnetic rail gun, providing crucial supplies for orbital construction platforms."
  },
  [TabID.MartianDesc]: {
    title: "Martian Oasis Colony",
    content: "Surviving on Mars requires resilience and ingenuity. The Martian habitat utilizes subterranean inflatable modules, shielded from radiation by the planet's own regolith. The thin Martian atmosphere, rich in carbon dioxide, is harvested and processed to produce breathable air and rocket propellant. Sub-surface ice deposits are mined for water, which is crucial for life support and hydroponic agriculture within the habitat's bio-domes.",
    subtext: "Materials are sent to Phobos and Deimos via a smaller-scale chemical rocket system, establishing a robust interplanetary supply chain."
  },
  [TabID.StationDesc]: {
    title: "Lunar Gateway",
    content: "This orbital station is a bustling zero-gravity shipyard, strategically positioned in a stable Earth orbit. It serves as the primary assembly point for interplanetary vessels and deep-space habitats. Prefabricated components, launched from Earth and the Moon, are received and assembled by a combination of robotic arms and EVA specialists. The station features large, modular bays where inflatable habitats are fitted, tested, and integrated into larger spacecraft frameworks.",
    subtext: "The station acts as a critical logistics hub, a gateway to the outer solar system and beyond."
  }
};


export const BUILDER_CONFIGS: Record<string, BuilderConfig> = {
  [TabID.LunarBuilder]: {
    id: TabID.LunarBuilder,
    environment: 'lunar',
    backgroundImage: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop',
    availableParts: [HabitatPartType.Dome, HabitatPartType.Corridor, HabitatPartType.Solar, HabitatPartType.Airlock, HabitatPartType.Refinery]
  },
  [TabID.MartianBuilder]: {
    id: TabID.MartianBuilder,
    environment: 'martian',
    backgroundImage: 'https://images.unsplash.com/photo-1610212570415-475775438275?q=80&w=1932&auto=format&fit=crop',
    availableParts: [HabitatPartType.Dome, HabitatPartType.Corridor, HabitatPartType.Solar, HabitatPartType.Airlock, HabitatPartType.Refinery]
  },
  [TabID.InflightBuilder]: {
    id: TabID.InflightBuilder,
    environment: 'space',
    backgroundImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop',
    availableParts: [HabitatPartType.Rocket, HabitatPartType.Dome, HabitatPartType.Corridor, HabitatPartType.Solar, HabitatPartType.Airlock]
  },
  [TabID.OrbitalBuilder]: {
    id: TabID.OrbitalBuilder,
    environment: 'space',
    backgroundImage: 'https://images.unsplash.com/photo-1614726353902-77c4b3a12152?q=80&w=2070&auto=format&fit=crop',
    availableParts: [HabitatPartType.Rocket, HabitatPartType.Dome, HabitatPartType.Corridor, HabitatPartType.Solar, HabitatPartType.Airlock]
  }
};