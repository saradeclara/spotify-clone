import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync();

const categories = ["album", "song", "artist", "show", "playlist"];
const artists = [
	{
		name: "Depeche Mode",
		headerUrl:
			"https://ipfs.filebase.io/ipfs/QmSwiDwhYzUn4KoAx1opdpyjs1drePk5hsmYc4wpLTPfdc",
		avatarUrl:
			"https://ipfs.filebase.io/ipfs/QmQParJbu6D6iD6xNo9gbV6HcGGrUFxNVVxENuc4ak1fvp",
	},
	{
		name: "Soundgarden",
		headerUrl:
			"https://ipfs.filebase.io/ipfs/Qmf7cd67JnZS2ecwJkdq6T9fQP2GpjmJ3merQvRUGgJtbB",
		avatarUrl:
			"https://ipfs.filebase.io/ipfs/QmQH28cjvd5w4pYiEsdexBiMtBAP3p1HQrNeSsDxaXBkiN",
	},
	{
		name: "PJ Harvey",
		headerUrl:
			"https://ipfs.filebase.io/ipfs/QmSxmSB7HLJztiKK5DLRkZXAbd7LKraLVSMPnxpgK1JMMg",
		avatarUrl:
			"https://ipfs.filebase.io/ipfs/QmYpwhwAa3K2UbgZooFmKSgJRs7hkU48mGgnueekfrQVwH",
	},
];

const main = async () => {
	await Promise.all(
		categories.map((singleCategory) => {
			return prisma.category.create({
				data: {
					description: singleCategory,
				},
			});
		})
	);

	const catArtist = await prisma.category.findFirst({
		where: { description: "artist" },
	});

	const catAlbum = await prisma.category.findFirst({
		where: { description: "album" },
	});

	const catSong = await prisma.category.findFirst({
		where: { description: "song" },
	});

	const catPlaylist = await prisma.category.findFirst({
		where: { description: "playlist" },
	});

	const catPodcast = await prisma.category.findFirst({
		where: { description: "show" },
	});

	if (catArtist && catAlbum && catSong && catPlaylist && catPodcast) {
		await Promise.all(
			artists.map(async (singleArtist) => {
				return await prisma.artist.create({
					data: {
						name: singleArtist.name,
						avatarUrl: singleArtist.avatarUrl,
						headerUrl: singleArtist.headerUrl,
						categoryId: catArtist.id,
					},
				});
			})
		);

		const artist1 = await prisma.artist.findFirst({
			where: { name: "Soundgarden" },
		});

		const artist2 = await prisma.artist.findFirst({
			where: { name: "Depeche Mode" },
		});

		const artist3 = await prisma.artist.findFirst({
			where: { name: "PJ Harvey" },
		});

		const albums: any = [
			{
				name: "Superunknown",
				avatarUrl:
					"https://ipfs.filebase.io/ipfs/QmXtfyE8gZdc5fsXSUZYDSaZCZCNaiT4TUTTHixchhtusV",
				releasedOn: new Date("1994-03-07T00:00:00+0000"),
				artistId: artist1?.id,
				songs: [
					{
						name: "Black Hole Sun",
						duration: 138,
						albumIndex: 8,
						url: "https://www.dropbox.com/s/ncrnretfal1kpyp/forest-lullaby-110624.mp3?dl=1",
					},
				],
			},
			{
				name: "Violator",
				avatarUrl:
					"https://ipfs.filebase.io/ipfs/QmNav8tkhHrhhXqUwgqk1TojZvJr3gSfBUfVKoh7s9XKPf",
				releasedOn: new Date("1990-03-19T00:00:00+0000"),
				artistId: artist2?.id,
				songs: [
					{
						name: "Policy of Truth",
						duration: 138,
						albumIndex: 8,
						url: "https://www.dropbox.com/s/ncrnretfal1kpyp/forest-lullaby-110624.mp3?dl=1",
					},
				],
			},
			{
				name: "Dry",
				avatarUrl:
					"https://ipfs.filebase.io/ipfs/QmXxL7S8HqmHXoGnHuJHYf2ijYtGQgi4MLo7pUqa5NPnWf",
				releasedOn: new Date("1992-03-30T00:00:00+0000"),
				artistId: artist3?.id,
				songs: [
					{
						name: "Sheela-Na-Gig",
						duration: 138,
						albumIndex: 5,
						url: "https://www.dropbox.com/s/ncrnretfal1kpyp/forest-lullaby-110624.mp3?dl=1",
					},
				],
			},
		];

		if (artist1 && artist2 && artist3) {
			await Promise.all(
				albums.map(async (singleAlbum: any) => {
					return await prisma.album.create({
						data: {
							name: singleAlbum.name,
							avatarUrl: singleAlbum.avatarUrl,
							releasedOn: singleAlbum.releasedOn,
							artistId: singleAlbum.artistId,
							categoryId: catAlbum.id,
							songs: {
								create: singleAlbum.songs?.map((singleSong: any) => {
									return {
										name: singleSong.name,
										albumIndex: singleSong.albumIndex,
										url: singleSong.url,
										duration: singleSong.duration,
										artistId: singleAlbum.artistId,
										categoryId: catSong.id,
									};
								}),
							},
						},
					});
				})
			);
		}

		const allSongs = await prisma.song.findMany();

		const podcast1 = await prisma.show.create({
			data: {
				name: "Significant Others",
				author: "Team Coco",
				categoryId: catPodcast?.id,
				avatarUrl:
					"https://ipfs.filebase.io/ipfs/Qma1RcWz2yrsJDDfdiGpHcK6RofGjtDyPoGog5y1ceramw",
			},
		});

		const favAlbum = await prisma.album.findFirst({
			where: { name: "Dry" },
		});

		const spotifyUser = await prisma.user.create({
			data: {
				firstName: "Spotify",
				lastName: "Spotify",
				username: "spotify_admin",
				email: "spotify@spotify.com",
				password: bcrypt.hashSync("spotify", salt),
				isAdmin: true,
			},
		});

		console.log({ spotifyUser });

		if (favAlbum) {
			const playlist1 = await prisma.playlist.create({
				data: {
					name: "90s Mix",
					categoryId: catPlaylist?.id,
					userId: spotifyUser?.id,
					avatarUrl:
						"https://ipfs.filebase.io/ipfs/QmVncFNBff9kv9VafT1s6q7cRHvqdjC89hJXHpSHJphyps",
					songs: {
						connect: allSongs.map((singleSong) => {
							return { id: singleSong.id };
						}),
					},
				},
			});
			const newUser = await prisma.user.create({
				data: {
					firstName: "Sara",
					lastName: "De Clara",
					username: "saradc88",
					avatarUrl:
						"https://ipfs.filebase.io/ipfs/QmNy9a2QanHffTWKWPButhvY2xfMsMR8iTJvzpCevXRk35",
					email: "saradeclara@gmail.com",
					password: bcrypt.hashSync("password", salt),
					isAdmin: true,
					createdPlaylists: {
						connect: { id: playlist1.id },
					},
					favouriteShows: {
						connect: { id: podcast1.id },
					},
					favouriteAlbums: {
						connect: [{ id: favAlbum.id }],
					},
					favouriteSongs: {
						connect: allSongs.map((singleSong) => {
							return { id: singleSong.id };
						}),
					},
					artistFollowing: {
						connectOrCreate: [
							{
								where: {
									name: "Depeche Mode",
								},
								create: {
									name: "Depeche Mode",
									avatarUrl:
										"https://ipfs.filebase.io/ipfs/QmQParJbu6D6iD6xNo9gbV6HcGGrUFxNVVxENuc4ak1fvp",
									categoryId: catArtist.id,
								},
							},
							{
								where: {
									name: "Soundgarden",
								},
								create: {
									name: "Soundgarden",
									avatarUrl:
										"https://ipfs.filebase.io/ipfs/QmQH28cjvd5w4pYiEsdexBiMtBAP3p1HQrNeSsDxaXBkiN",
									categoryId: catArtist.id,
								},
							},
						],
					},
				},
			});
			console.log({ newUser });
		}
	}
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
