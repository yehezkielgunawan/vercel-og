import React from "react";

import clsxm from "@/lib/helpers/clsxm";

type BaseImageProps = {
	className?: string;
} & React.ComponentPropsWithRef<"img">;

const BaseImage = React.forwardRef<HTMLImageElement, BaseImageProps>(
	({ className, ...rest }, ref) => {
		return (
			// biome-ignore lint: false positive
			<img
				aria-label="image"
				ref={ref}
				className={clsxm(className)}
				alt={rest.alt}
				loading="lazy"
				decoding="async"
				{...rest}
			/>
		);
	},
);

export default BaseImage;
