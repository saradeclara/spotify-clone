import { Album, Artist, Category, Song } from "@prisma/client";
import { Action, action, createStore, createTypedHooks } from "easy-peasy";

export type ExtendedSong = Song & {
	artist: Artist | null;
	album: Album | null;
	category: Category | null;
};

export type Track = {
	id: string;
	name: string;
	author: string | undefined;
	authorId: string | null;
	duration: number;
	thumbnail: string | null | undefined;
	albumIndex?: number;
	url: string;
	createdAt: Date;
	updatedAt: Date;
	collectionName: string | undefined;
	description?: string;
};

export interface StoreModel {
	activeTracks: Track[];
	activeTrack: Track | null;
	changeActiveTracks: Action<StoreModel, Track[]>;
	changeActiveTrack: Action<StoreModel, Track | null>;
}

const storeModel: StoreModel = {
	activeTracks: [],
	activeTrack: null,
	changeActiveTracks: action((state, payload) => {
		state.activeTracks = payload;
	}),
	changeActiveTrack: action((state, payload) => {
		state.activeTrack = payload;
	}),
};

export const store = createStore(storeModel);

// In order to avoid having to constantly provide your StoreModel definition to each use of the Easy Peasy hooks, we provide a utility API that allows you to create versions of the hooks that will have the StoreModel type information baked in. - easy-pease docs

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
