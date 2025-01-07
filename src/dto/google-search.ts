export interface GoogleSearchDto {
	items: GoogleSearchItemDto[];
}

export interface GoogleSearchItemDto {
	title: string;
	link: string;
}
