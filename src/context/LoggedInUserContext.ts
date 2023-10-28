import { Album, Artist, Playlist, Show, Song, User } from "@prisma/client";
import { Dispatch, createContext } from "react";

export type loggedInUserContextType = {
	updateLoggedInUser: Dispatch<React.SetStateAction<User>>;
};

const loggedInUserDefault: User & {
	favouriteShows?: Show[];
	favouriteSongs?: Song[];
	followingArtist?: Artist[];
	favouriteAlbums?: Album[];
	createdPlaylists?: Playlist[];
	favouritedPlaylists?: Playlist[];
} & loggedInUserContextType = {
	id: "",
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	isAdmin: false,
	createdAt: new Date(),
	updatedAt: new Date(),
	username: "",
	avatarUrl: "",
	updateLoggedInUser: () => {},
};

export const LoggedInUserContext = createContext<
	User & {
		favouriteShows?: Show[];
		favouriteSongs?: Song[];
		artistFollowing?: Artist[];
		favouriteAlbums?: Album[];
		createdPlaylists?: Playlist[];
		favouritePlaylists?: Playlist[];
	} & loggedInUserContextType
>(loggedInUserDefault);
