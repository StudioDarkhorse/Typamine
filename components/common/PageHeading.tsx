"use client";

import React from "react";
import Grainient from "@/components/cherry/Grainient";

export interface PageHeadingProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  rightElement?: React.ReactNode;
  titleClassName?: string;
  className?: string;
  useGrainient?: boolean;
  grainientOptions?: Partial<React.ComponentProps<typeof Grainient>>;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle,
  rightElement,
  titleClassName = "text-glow-cyan dark:text-glow-red text-blue dark:text-red",
  className = "",
  useGrainient = false,
  grainientOptions = {},
}) => {
  return (
    <div className={`mt-4 hidden lg:block relative overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-lg ${className}`}>

      {useGrainient && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Grainient
            timeSpeed={0.5}
            colorBalance={0}
            warpStrength={0.5}
            warpFrequency={3}
            warpSpeed={0.5}
            warpAmplitude={30}
            blendAngle={0}
            blendSoftness={0.1}
            rotationAmount={100}
            noiseScale={2}
            grainAmount={0.15}
            grainScale={1.5}
            grainAnimated={false}
            contrast={1.2}
            gamma={1}
            saturation={0.5}
            centerX={0}
            centerY={0}
            zoom={1}
            {...grainientOptions}
          />
        </div>
      )}

      <div className="relative z-10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="space-y-1">
          <h1 className={`font-haas text-2xl font-bold ${titleClassName}`}>
            {title}
          </h1>
          <div className="text-ocragray-800 dark:text-zinc-200 text-xs font-haas mt-1">
            {subtitle}
          </div>
        </div>
        {rightElement && (
          <div className="flex-shrink-0 w-full md:w-auto">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};
