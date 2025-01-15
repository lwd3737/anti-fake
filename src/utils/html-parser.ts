import parse, { HTMLElement } from "node-html-parser";

export const parseHtml = (html: string) => {
	const [ELEMENT_NODE, TEXT_NODE] = [1, 3];

	const body = parse(html, {
		blockTextElements: {
			script: false,
			noscript: false,
			style: false,
			pre: false,
		},
		comment: false,
		parseNoneClosedTags: false,
	}).getElementsByTagName("body")[0];

	[
		...Array.from(document.getElementsByTagName("header")),
		...Array.from(document.getElementsByTagName("footer")),
		...Array.from(document.getElementsByTagName("nav")),
		...Array.from(document.getElementsByTagName("aside")),
		...Array.from(document.getElementsByTagName("script")),
		...Array.from(document.getElementsByTagName("noscript")),
		...Array.from(document.getElementsByTagName("style")),
	].forEach((el) => el.remove());

	return body.textContent;
};
