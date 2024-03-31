import { getRandomInt } from "@/helpers";
import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

/* The `const backgrounds` array is storing URLs of different background images. These URLs are used to
randomly select an image from the array when creating a new playlist. The selected background image
is then assigned to the `avatarUrl` property of the new playlist being created. This allows for some
variety in the appearance of the playlists created, as each new playlist will have a different
background image selected randomly from the `backgrounds` array. */
const backgrounds = [
	"https://i.ibb.co/xSb7f7T/codioful-formerly-gradienta-m-7p45-Jf-XQo-unsplash.jpg",
	"https://i.ibb.co/xjx05vX/mymind-XUls-F9-LYe-Vk-unsplash.jpg",
	"https://i.ibb.co/5KJqbGT/pawel-czerwinski-6l-QDFGOB1iw-unsplash.jpg",
];

export default validateRoute(async (req, res, user) => {
	if (req.method === "POST") {
		let newPlaylistNumber = 1;

		const playlistCategory = await prisma.category.findFirst({
			where: {
				description: "playlist",
			},
		});

		const allMyPlaylists = await prisma.playlist.findMany({
			where: {
				name: {
					contains: "My Playlist #",
				},
			},
		});

		if (allMyPlaylists.length > 0) {
			const orderedPlaylists = allMyPlaylists.sort((a, b) => {
				const dateA = a.createdAt.toString().split("T")[0].split("-").join("");
				const dateB = b.createdAt.toString().split("T")[0].split("-").join("");
				return dateB > dateA ? 1 : dateB < dateA ? -1 : 0;
			});

			const mostRecentPlaylist = orderedPlaylists[0];

			newPlaylistNumber = Number(mostRecentPlaylist.name.split("#")[1]) + 1;
		}

		if (playlistCategory && user) {
			const newPlaylist = await prisma.playlist.create({
				data: {
					name: `My Playlist #${newPlaylistNumber}`,
					categoryId: playlistCategory.id,
					userId: user.id,
					avatarUrl: backgrounds[getRandomInt(backgrounds.length)],
				},
			});

			res.status(200).json(newPlaylist);
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
});
