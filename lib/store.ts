import { Album, Artist, Category, Song } from "@prisma/client";
import { Action, action, createStore, createTypedHooks } from "easy-peasy";

export type ExtendedSong = Song & {
	artist: Artist | null;
	album: Album | null;
	category: Category | null;
};

export interface StoreModel {
	activeSongs: ExtendedSong[];
	activeSong: ExtendedSong | null;
	changeActiveSongs: Action<StoreModel, ExtendedSong[]>;
	changeActiveSong: Action<StoreModel, ExtendedSong>;
}

const storeModel: StoreModel = {
	activeSongs: [],
	activeSong: null,
	changeActiveSongs: action((state, payload) => {
		state.activeSongs = payload;
	}),
	changeActiveSong: action((state, payload) => {
		state.activeSong = payload;
	}),
};

export const store = createStore(storeModel);

// In order to avoid having to constantly provide your StoreModel definition to each use of the Easy Peasy hooks, we provide a utility API that allows you to create versions of the hooks that will have the StoreModel type information baked in. - easy-pease docs

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
