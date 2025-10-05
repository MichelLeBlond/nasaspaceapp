export enum TabID {
  Info = 'info',
  LunarDesc = 'lunar-desc',
  MartianDesc = 'martian-desc',
  StationDesc = 'station-desc',
  LunarBuilder = 'lunar-builder',
  MartianBuilder = 'martian-builder',
  InflightBuilder = 'inflight-builder',
  OrbitalBuilder = 'orbital-builder'
}

export enum HabitatPartType {
  Dome = 'dome',
  Corridor = 'corridor',
  Solar = 'solar',
  Airlock = 'airlock',
  Rocket = 'rocket',
  Refinery = 'refinery'
}

export interface PlacedPart {
  id: string;
  type: HabitatPartType;
  x: number;
  y: number;
}

export interface BuilderConfig {
  id: TabID;
  environment: 'lunar' | 'martian' | 'space';
  backgroundImage: string;
  availableParts: HabitatPartType[];
}