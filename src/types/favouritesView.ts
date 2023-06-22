type CategoryType = {
	id: string;
	description: string;
};

type UserType = {
	id: string;
	firstName: string;
	lastName: string;
};

type artistType = {
	categoryId: string;
	createdAt: string;
	id: string;
	name: string;
	thumbnail: string;
	updatedAt: string;
};

type favAlbumsType = {
	albumId: string;
	albumIndex: number;
	artist: artistType;
	Category: CategoryType;
	createdAt: string;
	duration: number;
	id: string;
	name: string;
	updatedAt: string;
	url: string;
	thumbnail: string;
};

type favArtistsType = {
	Category: CategoryType;
	id: string;
	name: string;
	thumbnail: string;
};

type favShowsType = {
	id: string;
	name: string;
	author: string;
	thumbnail: string;
	Category: CategoryType;
};

type playlistType = {
	thumbnail: string;
	author: string;
	Category: CategoryType;
	name: string;
	User: UserType;
};

type FavouritesProps = {
	data: (favAlbumsType | favArtistsType | favShowsType | playlistType)[];
	textInput: string;
};

export type {
	FavouritesProps,
	favAlbumsType,
	favArtistsType,
	favShowsType,
	playlistType,
};
