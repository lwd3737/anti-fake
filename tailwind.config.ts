import { subtle } from "crypto";
import type { Config } from "tailwindcss";

const BaseColors = {
	gray50: "#F9FAFB",
	gray100: "#F3F4F6",
	gray200: "#E5E7EB",
	gray600: "#4B5563",
	gray900: "#374151",

	blue50: "#1F3A930D",
	blue600: "#3A539B",
	blue800: "#1F3A93",

	red: "#E74C3C",
};

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			zIndex: {
				"-1": "-1", // background
				"0": "0", // default
				// 10~50: button, icon, form control
				"100": "100", // menu, popover, tooltip, dropdown
				"200": "200", // header, footer
				"300": "300", // slider
				"1000": "1000", // modal, dialog, overlay
				"9999": "9999", // global: toast, alart
			},
			colors: {
				brand: {
					DEFAULT: BaseColors.blue800,
					hover: BaseColors.blue600,
				},
				accent: {},
				surface: {
					DEFAULT: BaseColors.gray50,
					subtle: {
						DEFAULT: BaseColors.gray100,
						hover: BaseColors.gray200,
					},
					card: {
						DEFAULT: BaseColors.gray50,
						hover: BaseColors.blue50,
					},
				},
				text: {
					base: BaseColors.gray900,
					subtle: {
						DEFAULT: BaseColors.gray600,
						hover: BaseColors.gray200,
					},
				},
				success: {},
				warning: {},
				danger: BaseColors.red,
			},
		},
	},
	plugins: [],
};
export default config;
