import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/common/Button";
import Link from "next/link";

interface TabHeadingProps {
  title: string;
  subtitle?: string;
  buttonHref?: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
  showButton?: boolean;
  extraButtons?: React.ReactNode;
  extraButtonsPosition?: "left" | "right";
}

export default function TabHeading({
  title,
  subtitle,
  buttonHref,
  buttonLabel,
  buttonIcon = <Plus className="h-5 w-5" />,
  showButton = true,
  extraButtons,
  extraButtonsPosition = "right",
}: TabHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-2 pb-4">
      <div className="space-y-2 ps-4">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-crenzo text-black dark:text-white tracking-tight leading-none">
          {title}
        </h2>
        {subtitle && (
          <p className="ps-2 font-haas text-md text-bluegray-800 dark:text-redgray-200 font-bold max-w-2xl leading-relaxed">
            {"==[ " + subtitle + " ]=="}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4 shrink-0 sm:self-center self-start">
        {extraButtonsPosition === "left" && extraButtons}
        {showButton && buttonHref && buttonLabel && (
          <Link href={buttonHref}>
            <Button
              variant="primary"
              size="lg"
              roundness="md"
              className="flex items-center gap-2"
            >
              {buttonIcon}
              {buttonLabel}
            </Button>
          </Link>
        )}
        {extraButtonsPosition !== "left" && extraButtons}
      </div>
    </div>
  );
}
