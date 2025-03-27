import type { Config } from "tailwindcss";

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
		},
	},
	plugins: [],
};
export default config;
