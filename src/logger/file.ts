import path from "path";
import fs from "fs";
import { json } from "@/utils/serialize";

export const logJsonFile = async (pathName: string, data: any) => {
	const absolutePath = path.join(process.cwd(), pathName);

	const dir = path.dirname(absolutePath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	if (!pathName.endsWith(".json")) {
		throw new Error(`${pathName} is not a JSON file`);
	}

	return new Promise((resolve, reject) => {
		fs.writeFile(absolutePath, json(data, true), (err) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(undefined);
		});
	});
};
