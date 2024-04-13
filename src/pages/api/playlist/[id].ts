import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
	const { id } = req.query;
	const { newSongId } = req.body;

	// /api/playlist/[id] update songs array on current playlist
	if (req.method === "PUT") {
		if (typeof id === "string") {
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
		}
		res.status(200).json({ message: "Playlist updated successfully" });
	} else if (req.method === "GET") {
		// /api/playlist/[id] get all data regarding current playlist
		if (typeof id === "string") {
			const currentPlaylist = await prisma.playlist.findUnique({
				where: {
					id,
				},
				include: {
					songs: {
						include: {
							album: true,
						},
					},
					createdBy: true,
					category: true,
				},
			});

			res.status(200).json(currentPlaylist);
		}
	} else {
		res.setHeader("Allow", ["PUT", "GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
});
