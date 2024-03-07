import GradientLayoutPages from "@/components/GradientLayoutPages";
import FollowButton from "@/components/ShowPage/FollowButton";
import TopList from "@/components/TopList/TopList";
import { Mode, Size } from "@/enums/FollowButton";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { Artist, Category, Song } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import convertSeconds from "../../../lib/convertSeconds";
import pluralise from "../../../lib/pluralise";
import prisma from "../../../lib/prisma";

const AlbumPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { album } = props;

	const renderDescription = ({
		artistAvatar,
		artistName,
		nOfTracks,
		totalLength,
	}: {
		artistAvatar: string | null;
		artistName: string;
		nOfTracks: number;
		totalLength: string;
	}) => {
		// [artistImage, artist name, x songs, total length]
		const artistImage = artistAvatar ? (
			<Avatar
				size="xs"
				sx={{ border: "2px solid black", marginRight: "5px" }}
				src={artistAvatar}
			/>
		) : null;
		const descriptionArray = [
			`${nOfTracks} ${pluralise(nOfTracks, "Track")}`,
			totalLength,
		];

		return [
			artistImage,
			<Link href={`/artist/${album.artist.id}`}>
				<Text
					sx={{ display: "inline", marginRight: "4px" }}
					_hover={{ textDecoration: "underline" }}
				>
					{artistName}
				</Text>
			</Link>,
			" \u2022 ",
			descriptionArray.join(" \u2022 "),
		];
	};

	const gradientProps = {
		image: album?.avatarUrl,
		roundAvatar: false,
		description: renderDescription(album.stats),
		subtitle: "album",
		title: album.name,
		...album,
	};

	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			<GradientLayoutPages {...gradientProps}>
				<Box>
					<Box sx={{ padding: "30px 0px 0px 30px" }}>
						<FollowButton
							mode={Mode.Heart}
							categoryArray="favouriteAlbums"
							categoryData={album}
							size={Size.medium}
						/>
					</Box>
					<TopList
						showHeadings
						items={album.songs}
						mode="album"
						showArtist
						showFavourites
					/>
				</Box>
			</GradientLayoutPages>
		</Box>
	);
};

export const getServerSideProps = async ({
	query,
}: {
	query: { id: string };
}) => {
	const singleAlbum = await prisma.album.findUnique({
		where: {
			id: query.id,
		},
		include: {
			category: true,
			artist: true,
			songs: { include: { category: true } },
		},
	});
	// [artistImage, artist name, x songs, total length]

	if (singleAlbum) {
		let totalLength = 0;
		singleAlbum.songs
			.map((singleSong) => singleSong.duration)
			.forEach((songDuration) => {
				totalLength = totalLength + songDuration;
			});

		const newSongs: {
			artist: {
				id: string;
				name: string;
				createdAt: Date;
				updatedAt: Date;
				avatarUrl: string | null;
				headerUrl: string | null;
				categoryId: string;
			};
			album: {
				id: string;
				name: string;
				avatarUrl: string | null;
				createdAt: Date;
				updatedAt: Date;
				releasedOn: Date;
				categoryId: string;
				artistId: string;
				category: Category;
				artist: Artist;
				songs: (Song & { category: Category })[];
			};
			id: string;
			albumIndex: number;
			createdAt: Date; // [artistImage, artist name, x songs, total length]
			// [artistImage, artist name, x songs, total length]
			updatedAt: Date;
			name: string;
			url: string;
			duration: number;
			albumId: string | null;
			artistId: string | null;
			categoryId: string;
			category: Category;
		}[] = [];

		singleAlbum.songs.forEach((singleSong) => {
			const tempSong = {
				...singleSong,
				artist: {
					...singleAlbum.artist,
					id: singleAlbum.artist.id,
					name: singleAlbum.artist.name,
				},
				album: {
					...singleAlbum,
					id: singleAlbum.id,
					name: singleAlbum.name,
					avatarUrl: singleAlbum.avatarUrl,
				},
			};
			newSongs.push(tempSong);
		});
		const stats = {
			artistAvatar: singleAlbum.artist.avatarUrl,
			artistName: singleAlbum.artist.name,
			nOfTracks: singleAlbum.songs.length,
			totalLength: convertSeconds(totalLength, "hhhh mmmm ssss"),
		};

		const singleAlbumWithStats = {
			...singleAlbum,
			songs: newSongs,
			stats,
		};
		return {
			props: {
				album: singleAlbumWithStats,
			},
		};
	}
};
export default AlbumPage;
