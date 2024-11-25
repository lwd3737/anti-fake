export interface GoogleSearchDto {
	// info: GoogleSearchInfoDto;
	items: GoogleSearchItemDto[];
}

// export interface GoogleSearchInfoDto {

// }

export interface GoogleSearchItemDto {
	title: string;
	link: string;
}
