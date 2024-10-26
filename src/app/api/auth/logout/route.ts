import { NextResponse } from "next/server";

export function POST() {
	const res = new NextResponse();
	res.cookies.delete("access-token");
	res.cookies.delete("csrf-token");
	return res;
}
