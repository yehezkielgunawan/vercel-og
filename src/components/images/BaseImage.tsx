import React from "react";

import clsxm from "@/lib/helpers/clsxm";

type BaseImageProps = {
  className?: string;
} & React.ComponentPropsWithRef<"img">;

const BaseImage = React.forwardRef<HTMLImageElement, BaseImageProps>(
  ({ className, ...rest }, ref) => {
    return (
      <img
        ref={ref}
        className={clsxm(className)}
        placeholder="blur"
        alt={rest.alt}
        loading="lazy"
        decoding="async"
        {...rest}
      />
    );
  }
);

export default BaseImage;
