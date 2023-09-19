import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync();

const categories = ["album", "song", "artist", "podcast", "playlist"];
const artists = [
	{
		name: "Depeche Mode",
		headerUrl: "https://i.ibb.co/gwBGf2c/depeche-mode-FINAL-IMAGE.jpg",
		avatarUrl:
			"https://i.ibb.co/hghwKxr/ab6761610000e5ebaff13c9484fdad590ccfb73c.jpg",
	},
	{
		name: "Soundgarden",
		headerUrl: "https://i.ibb.co/0VpYgLD/soundgardenborucki-copy.jpg",
		avatarUrl: "https://i.ibb.co/hY7mtbT/cc7.jpg",
	},
	{
		name: "PJ Harvey",
		headerUrl: "https://i.ibb.co/0sXLrJh/image-18.png",
		avatarUrl: "https://i.ibb.co/Vg67Q7h/500x500-000000-80-0-0.jpg",
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
		where: { description: "podcast" },
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
				avatarUrl: "https://i.ibb.co/9VrXvB0/Superunknown.jpg",
				releasedOn: new Date("1994-03-07T00:00:00+0000"),
				artistId: artist1?.id,
				songs: [
					{
						name: "Black Hole Sun",
						duration: 138,
						albumIndex: 8,
						url: "https://www.dropbox.com/s/ncrnretfal1kpyp/forest-lullaby-110624.mp3?dl=0",
					},
				],
			},
			{
				name: "Violator",
				avatarUrl: "https://i.ibb.co/9hCrb1r/violator.png",
				releasedOn: new Date("1990-03-19T00:00:00+0000"),
				artistId: artist2?.id,
				songs: [
					{
						name: "Policy of Truth",
						duration: 138,
						albumIndex: 8,
						url: "https://www.dropbox.com/s/ncrnretfal1kpyp/forest-lullaby-110624.mp3?dl=0",
					},
				],
			},
			{
				name: "Dry",
				avatarUrl: "https://i.ibb.co/dLDQG6R/PJHarvey-Dryalbumcover.jpg",
				releasedOn: new Date("1992-03-30T00:00:00+0000"),
				artistId: artist3?.id,
				songs: [
					{
						name: "Sheela-Na-Gig",
						duration: 138,
						albumIndex: 5,
						url: "https://www.dropbox.com/s/ncrnretfal1kpyp/forest-lullaby-110624.mp3?dl=0",
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

		const playlist1 = await prisma.playlist.create({
			data: {
				name: "90s Mix",
				categoryId: catPlaylist?.id,
				avatarUrl: "https://i.ibb.co/QD8qHnT/download.png",
				songs: {
					connect: allSongs.map((singleSong) => {
						return { id: singleSong.id };
					}),
				},
			},
		});

		const podcast1 = await prisma.show.create({
			data: {
				name: "Significant Others",
				author: "Team Coco",
				categoryId: catPodcast?.id,
				avatarUrl: "https://i.ibb.co/M8tmrvk/significant.webp",
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
			const newUser = await prisma.user.create({
				data: {
					firstName: "Sara",
					lastName: "De Clara",
					username: "saradc88",
					avatarUrl: "https://i.ibb.co/fH00WNk/500x500-000000-80-0-0.jpg",
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
					followingArtist: {
						connectOrCreate: [
							{
								where: {
									name: "Depeche Mode",
								},
								create: {
									name: "Depeche Mode",
									avatarUrl:
										"https://i.ibb.co/hghwKxr/ab6761610000e5ebaff13c9484fdad590ccfb73c.jpg",
									categoryId: catArtist.id,
								},
							},
							{
								where: {
									name: "Soundgarden",
								},
								create: {
									name: "Soundgarden",
									avatarUrl: "https://i.ibb.co/hY7mtbT/cc7.jpg",
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
