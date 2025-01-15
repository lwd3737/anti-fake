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
	}).getElementsByTagName("body")[0];

	const elements: HTMLElement[] = [body];

	let text = "";

	while (elements.length > 0) {
		const curElement = elements.pop();
		if (!curElement) continue;

		for (const node of curElement.childNodes) {
			if (node.nodeType === TEXT_NODE) {
				text += node.textContent;
			} else if (node.nodeType === ELEMENT_NODE) {
				const el = node as unknown as HTMLElement;

				switch (el.tagName) {
					case "HEADER":
					case "FOOTER":
					case "NAV":
					case "ASIDE":
					case "SCRIPT":
					case "NOSCRIPT":
					case "STYLE":
						break;
					default:
						elements.push(el);
				}
			}
		}
	}

	return text;
};
