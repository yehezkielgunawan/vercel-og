import React from "react";

import clsxm from "@/lib/helpers/clsxm";

import UnstyledLink, { type UnstyledLinkProps } from "../links/UnstyledLink";

enum ButtonVariant {
	primary = 0,
	outline = 1,
	ghost = 2,
	light = 3,
	dark = 4,
}

type ButtonLinkProps = {
	variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	({ children, className, variant = "primary", ...rest }, ref) => {
		return (
			<UnstyledLink
				ref={ref}
				{...rest}
				className={clsxm(
					"inline-flex items-center rounded-sm px-4 py-2 font-semibold",
					"focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-500",
					"shadow-xs",
					"transition-colors duration-75",
					//#region  //*=========== Variants ===========
					[
						variant === "primary" && [
							"bg-primary-500 text-white",
							"border border-primary-600",
							"hover:bg-primary-600 hover:text-white",
							"active:bg-primary-500",
							"disabled:bg-primary-400 disabled:hover:bg-primary-400",
						],
						variant === "outline" && [
							"text-primary-500",
							"border border-primary-500",
							"hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
						],
						variant === "ghost" && [
							"text-primary-500",
							"shadow-none",
							"hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
						],
						variant === "light" && [
							"bg-white text-dark ",
							"border border-gray-300",
							"hover:bg-gray-100 hover:text-dark",
							"active:bg-white/80 disabled:bg-gray-200",
						],
						variant === "dark" && [
							"bg-gray-900 text-white",
							"border border-gray-600",
							"hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700",
						],
					],
					//#endregion  //*======== Variants ===========
					"disabled:cursor-not-allowed",
					className,
				)}
			>
				{children}
			</UnstyledLink>
		);
	},
);

export default ButtonLink;
