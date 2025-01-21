import parse from "node-html-parser";

export const parseHtml = (html: string) => {
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

	// FIX: ReferenceError: document is not defined
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
