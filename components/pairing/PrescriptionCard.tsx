import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Prescription } from "@/types";

interface PrescriptionCardProps {
  prescription: Prescription;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription }) => {
  const imageUrl = prescription.imageUrl || prescription.imgUrl;
  const href = prescription.href || `/prescriptions/${prescription.slug}`;
  const fontList = prescription.fonts && prescription.fonts.length > 0
    ? prescription.fonts
    : [prescription.primaryFont, prescription.secondaryFont].filter(Boolean) as any[];

  const fontNames = fontList.map(f => f.name).join(" + ");

  return (
    <Link
      href={href as any}
      className="relative border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 flex flex-col justify-between transition-all group overflow-hidden min-h-[220px] hover:border-zinc-400 dark:hover:border-zinc-600"
    >
      {/* Background Image with Overlay */}
      {imageUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-white/85 dark:bg-zinc-950/85 group-hover:bg-white/75 dark:group-hover:bg-zinc-950/75 transition-colors" />
        </>
      )}

      {/* Fallback Background if no image */}
      {!imageUrl && (
        <div className="absolute inset-0 bg-white/50 dark:bg-zinc-950/50" />
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full space-y-4">
        <div>
          <div className="flex justify-end flex-wrap gap-2 mb-3">
            {(prescription.tags || []).slice(0, 2).map((tag, idx) => {
              const tagName = typeof tag === "string" ? tag : tag.name;
              const tagKey = typeof tag === "string" ? tag : (tag.id || idx);
              return (
                <Badge key={tagKey} variant="monochrome">
                  {tagName}
                </Badge>
              );
            })}
            {(prescription.tags || []).length > 2 && (
              <Badge variant="standard">
                +{prescription.tags!.length - 2} {prescription.tags!.length - 2 === 1 ? "Tag" : "Tags"}
              </Badge>
            )}
          </div>
          <h3 className="font-haas text-2xl font-bold text-foreground leading-tight">{prescription.name}</h3>
          <p className="font-haas text-lg mt-1">{fontNames}</p>
        </div>

        <div className="flex-1 flex flex-col justify-end mt-4">
          <p className="font-haas text-[10px] text-ocragray-800 dark:text-zinc-200 font-bold mb-1 uppercase tracking-wider">{fontNames}</p>
          {prescription.description && (
            <p className="font-haas text-ocragray-800 dark:text-zinc-200 text-lg mb-4 line-clamp-2">
              {prescription.description}
            </p>
          )}
          <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
            <span className="font-haas text-[10px] text-bluegray-800 dark:text-redgray-200 uppercase">Typamine Studio</span>
            <div className="flex flex-row items-center gap-2 font-haas text-lg font-bold  dark:text-red transition-colors pe-4 hover:underline">
              View
              <MoveRight size={12} className="icon-altalenante" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};