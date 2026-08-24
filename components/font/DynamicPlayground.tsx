"use client"
import React, { useState } from "react";
import LivePreview from "@/components/common/LivePreview";
import { PlaygroundFont } from "@/types";
import { cn } from "@/lib/utils";

interface DynamicPlaygroundProps {
  font?: PlaygroundFont;
  hideFontSelector?: boolean;
}

export const DynamicPlayground: React.FC<DynamicPlaygroundProps> = ({
  font,
  hideFontSelector = false
}) => {
  const [activeFont, setActiveFont] = useState<PlaygroundFont>(
    font || { name: "Alte Haas Grotesk", fontFamily: "var(--font-haas)" }
  );

  return (
    <section 
      className="group border border-zinc-200 dark:border-zinc-800 bg-ocragray-100 dark:bg-ocragray-900 rounded-lg overflow-hidden transition-colors duration-300"
    >

      {/* Header of the Sandbox Panel */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-4 py-3 md:px-8 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <h2 className="font-haas text-md font-bold tracking-widest text-blue uppercase">
          Live Test
        </h2>


      </div>

      {/* Content Layout */}
      <div className={cn("grid grid-cols-1", !hideFontSelector && "lg:grid-cols-4")}>


        {/* Interactive Live Preview */}
        <div className={cn(!hideFontSelector && "lg:col-span-3", "p-0 md:p-6")}>
          <LivePreview
            fontName={activeFont.name}
            fontFamilyCss={activeFont.fontFamily}
            fontUrl={activeFont.fontUrl}
            initialSize={48}
            minSize={16}
            maxSize={120}
            isVariable
            showTextColorControl
            showBgColorControl
            showLineHeightControl
            showLetterSpacingControl
            mobileControlsInModal
            rounded={false}
          />
        </div>
      </div>
    </section>
  );
};
