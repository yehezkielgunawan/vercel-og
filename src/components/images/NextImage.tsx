import Image, { ImageProps } from "next/image";
import React from "react";

import clsxm from "@/lib/helpers/clsxm";

type NextImageProps = {
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
} & (
  | { width: string | number; height: string | number }
  | { layout: "fill"; width?: string | number; height?: string | number }
) &
  ImageProps;

export default function NextImage({
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  ...rest
}: NextImageProps) {
  const widthIsSet = className?.includes("w-") ?? false;

  return (
    <figure
      className={className}
      style={!widthIsSet ? { width: `${width}px` } : undefined}
    >
      <Image
        className={clsxm(imgClassName)}
        src={src}
        width={width}
        height={height}
        placeholder="blur"
        alt={alt}
        priority
        decoding="async"
        loading="lazy"
        unoptimized
        {...rest}
      />
    </figure>
  );
}
