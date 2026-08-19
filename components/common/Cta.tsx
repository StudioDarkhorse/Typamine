import React from "react";
import Grainient from "@/components/cherry/Grainient";
import GlassSurface from "@/components/cherry/GlassSurface";

interface CtaProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  bgImage?: string;
  useGrainient?: boolean;
  useGlassmorphism?: boolean;
  grainientOptions?: Partial<React.ComponentProps<typeof Grainient>>;
  align?: "left" | "center" | "right";
  overlayClassName?: string;
  linearGradientClassName?: string;
  radialGradientClassName?: string;
  className?: string;
}

export const Cta: React.FC<CtaProps> = ({
  title,
  subtitle,
  children,
  bgImage,
  useGrainient = false,
  useGlassmorphism = false,
  grainientOptions = {},
  align = "center",
  overlayClassName = "bg-white/70 dark:bg-black/60",
  linearGradientClassName = "bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-950",
  radialGradientClassName = "bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue/20 via-transparent to-transparent dark:from-[#00cece]/40 dark:via-transparent dark:to-transparent",
  className = "",
}) => {
  const alignStyles = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <section className={`relative border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden py-16 px-6 sm:px-12 flex flex-col justify-center transition-all ${className}`}>
      
      {/* Background Layer */}
      {useGrainient ? (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Grainient
            color1="#321c1c"
            color2="#78117c"
            color3="#fca2a2"
            timeSpeed={.5}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={.8}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={3}
            grainAmount={0.27}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
            {...grainientOptions}
          />
        </div>
      ) : bgImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : (
        <>
          <div className={`absolute inset-0 ${linearGradientClassName}`} />
          <div className={`absolute inset-0 ${radialGradientClassName}`} />
        </>
      )}

      {/* Overlay Layer (Applied when bgImage is present to ensure text readability) */}
      {bgImage && !useGrainient && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}

      {/* Content Layer */}
      <div className={`relative z-10 w-full ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"} ${align === "right" ? "ml-auto" : ""}`}>
        {/* backgroundOpacity = velo di colore sopra al backdrop, satinBlur =
            quanto è smerigliato il vetro. Valori bassi: il contenuto dietro
            deve restare leggibile, non sparire. */}
        {useGlassmorphism ? (
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={24}
            brightness={10}
            opacity={1.1}
            blur={25}
            backgroundOpacity={0.12}
            satinBlur={3}
            className="p-6 md:p-10"
          >
            <div className={`flex flex-col w-full ${alignStyles[align]}`}>
              <h2 className="font-crenzo text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
                {title}
              </h2>
              {subtitle && (
                <p className="font-haas text-black dark:text-white font-medium mb-8">
                  {subtitle}
                </p>
              )}
              {children && (
                <div className="flex flex-wrap gap-4">
                  {children}
                </div>
              )}
            </div>
          </GlassSurface>
        ) : (
          <div className={`flex flex-col w-full ${alignStyles[align]}`}>
            <h2 className="font-crenzo text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="font-haas text-zinc-600 dark:text-zinc-400 text-sm sm:text-base mb-8">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="flex flex-wrap gap-4">
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
