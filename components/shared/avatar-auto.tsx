"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type BorderMode = "always" | "fallback" | "never";

type AvatarAutoProps = {
  name: string;
  src?: string | null;
  size?: number;
  sizeMobile?: number;
  sizeDesktop?: number;
  breakpointPx?: number;
  border?: BorderMode;
  fallbackDelayMs?: number;
  className?: string;
};

export function AvatarAuto({
  name,
  src,
  size,
  sizeMobile = 48,
  sizeDesktop = 48,
  fallbackDelayMs,
  className,
}: AvatarAutoProps) {
  const isMobile = useIsMobile()
  const [imgError, setImgError] = useState(false);
  
  const finalSize = useMemo(() => {
    if (typeof size === "number") return size;
    return isMobile ?? false ? sizeMobile : sizeDesktop;
  }, [size, isMobile, sizeMobile, sizeDesktop]);

  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";
  const invalidSrc =
    !src || src === "" || src === "undefined" || typeof src !== "string";
  const shouldFallback = invalidSrc || imgError;

  const style = {
    width: `${finalSize}px`,
    height: `${finalSize}px`,
    fontSize: `${finalSize * 0.4}px`,
  };

  return (
    <Avatar
      style={style}
      className={cn(
        "bg-blue-700 text-white font-bold select-none rounded-full",
        className
      )}
      aria-label={name}
      title={name}
    >
      {!shouldFallback && (
        <AvatarImage
          src={String(src)}
          alt={name}
          onError={() => setImgError(true)}
        />
      )}
      <AvatarFallback delayMs={fallbackDelayMs}>{initial}</AvatarFallback>
    </Avatar>
  );
}
