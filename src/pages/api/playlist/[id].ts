import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(async (req, res, _user) => {
	const { id } = req.query;
	const { newSongId, flag } = req.body;

	if (typeof id !== "string") return;
	// /api/playlist/[id] update songs array on current playlist
	if (req.method === "PUT") {
		if (flag === "remove") {
			const updatedPlaylist = await prisma.playlist.update({
				where: {
					id,
				},
				data: {
					songs: {
						disconnect: {
							id: newSongId,
						},
					},
				},
			});
			res
				.status(200)
				.json({ message: "Playlist updated successfully", updatedPlaylist });
		} else if (flag === "add") {
			const currentPlaylist = await prisma.playlist.findUnique({
				where: { id },
				select: { songs: true },
			});

			const newSong = await prisma.song.findUnique({
				where: { id: newSongId },
			});

			if (currentPlaylist && newSong) {
				currentPlaylist.songs.push(newSong);

				await prisma.playlist.update({
					where: {
						id,
					},
					data: {
						songs: {
							connect: {
								id: newSongId,
							},
						},
					},
				});
			}
			res.status(200).json({ message: "Playlist updated successfully" });
		} else if (flag === "edit") {
			const { flag, ...restOfBody } = req.body;
			const updatedPlaylist = await prisma.playlist.update({
				where: {
					id,
				},
				data: {
					...restOfBody,
				},
			});

			res
				.status(200)
				.json({ message: "Playlist updated successfully", updatedPlaylist });
		}
	} else if (req.method === "GET") {
		// /api/playlist/[id] get all data regarding current playlist
		const currentPlaylist = await prisma.playlist.findUnique({
			where: {
				id,
			},
			include: {
				songs: {
					include: {
						album: true,
						artist: true,
					},
				},
				createdBy: true,
				category: true,
			},
		});

		if (currentPlaylist) {
			let totalLength: number = 0;
			currentPlaylist.songs.forEach((song) => (totalLength += song.duration));

			const playlistWithTotalLength = {
				...currentPlaylist,
				totalLength,
			};

			res.status(200).json(playlistWithTotalLength);
		}
	} else if (req.method === "DELETE") {
		// /api/playlist/[id] delete current playlist
		await prisma.playlist.delete({
			where: {
				id,
			},
		});

		res.status(200).json({ message: "Playlist deleted successfully" });
	} else {
		res.setHeader("Allow", ["PUT", "GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
});
