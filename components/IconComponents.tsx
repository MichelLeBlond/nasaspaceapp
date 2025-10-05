import React from 'react';
import { HabitatPartType } from '../types';

interface IconProps {
    className?: string;
}

const DomeIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C 22.38 10, 0 35, 0 60 L 0 90 L 100 90 L 100 60 C 100 35, 77.62 10, 50 10 Z M 50 20 C 72.09 20, 90 40.2, 90 60 L 90 80 L 10 80 L 10 60 C 10 40.2, 27.91 20, 50 20 Z" />
    </svg>
);

const CorridorIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="35" width="80" height="30" rx="15" />
    </svg>
);

const SolarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="20" width="90" height="60" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
        <line x1="27.5" y1="20" x2="27.5" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
        <line x1="72.5" y1="20" x2="72.5" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/>
    </svg>
);

const AirlockIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="20" width="40" height="60" rx="5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="5"/>
    </svg>
);

const RocketIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M75,90 L25,90 L35,70 L65,70 L75,90 Z" />
        <path d="M50,10 L65,50 L35,50 L50,10 Z" />
        <rect x="40" y="45" width="20" height="30" />
    </svg>
);

const RefineryIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="70" width="80" height="20" />
        <rect x="20" y="20" width="20" height="50" />
        <rect x="60" y="40" width="20" height="30" />
        <circle cx="30" cy="15" r="10" />
        <path d="M70,40 L70,20 L90,30 L70,40 Z" />
    </svg>
);


export const partIcons: Record<HabitatPartType, React.FC<IconProps>> = {
    [HabitatPartType.Dome]: DomeIcon,
    [HabitatPartType.Corridor]: CorridorIcon,
    [HabitatPartType.Solar]: SolarIcon,
    [HabitatPartType.Airlock]: AirlockIcon,
    [HabitatPartType.Rocket]: RocketIcon,
    [HabitatPartType.Refinery]: RefineryIcon,
};

export const partLabels: Record<HabitatPartType, string> = {
    [HabitatPartType.Dome]: "Habitat Dome",
    [HabitatPartType.Corridor]: "Connector",
    [HabitatPartType.Solar]: "Solar Array",
    [HabitatPartType.Airlock]: "Airlock",
    [HabitatPartType.Rocket]: "Core Vehicle",
    [HabitatPartType.Refinery]: "Refinery Unit",
};

export const getPartSize = (type: HabitatPartType) => {
    switch (type) {
        case HabitatPartType.Dome: return { width: 100, height: 80 };
        case HabitatPartType.Corridor: return { width: 100, height: 40 };
        case HabitatPartType.Solar: return { width: 120, height: 80 };
        case HabitatPartType.Airlock: return { width: 50, height: 70 };
        case HabitatPartType.Rocket: return { width: 80, height: 120 };
        case HabitatPartType.Refinery: return { width: 90, height: 90 };
        default: return { width: 80, height: 80 };
    }
};

interface PartComponentProps {
    type: HabitatPartType;
}

export const PartComponent: React.FC<PartComponentProps> = ({ type }) => {
    const Icon = partIcons[type];
    const size = getPartSize(type);

    return (
        <div 
            className="absolute text-cyan-200" 
            style={{ width: size.width, height: size.height, pointerEvents: 'none' }}
        >
            <Icon className="w-full h-full" />
        </div>
    );
};
