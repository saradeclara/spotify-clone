import GradientLayoutPages from "@/components/GradientLayoutPages";
import FollowButton from "@/components/ShowPage/FollowButton";
import { Mode } from "@/enums/FollowButton";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import convertSeconds from "../../../lib/convertSeconds";
import prisma from "../../../lib/prisma";

const TrackPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { song } = props;

	const renderDescription = ({
		songAvatar,
		artistName,
		albumName,
		albumReleasedOn,
		duration,
	}: {
		songAvatar: string | null;
		artistName: string;
		albumName: string;
		albumReleasedOn: number;
		duration: string;
	}) => {
		// avatar, band name, album name, year, duration
		const artistImage = songAvatar ? (
			<Avatar
				size="xs"
				sx={{ border: "2px solid black", marginRight: "5px" }}
				src={songAvatar}
			/>
		) : null;

		const text = [albumReleasedOn, duration];

		return [
			artistImage,
			<Link href={`/artist/${song.artist?.id}`}>
				<Text
					sx={{ display: "inline", fontWeight: "bold", marginRight: "4px" }}
					_hover={{ textDecoration: "underline" }}
				>
					{artistName}
				</Text>
			</Link>,
			" \u2022 ",
			<Link href={`/album/${song.album?.id}`}>
				<Text
					sx={{ display: "inline", margin: "0px 4px" }}
					_hover={{ textDecoration: "underline" }}
				>
					{albumName}
				</Text>
			</Link>,
			" \u2022 ",
			text.join(" \u2022 "),
		];
	};

	const gradientProps = {
		image: song.album?.avatarUrl,
		roundAvatar: false,
		description: renderDescription(song.stats),
		subtitle: song.category.description,
		title: song.name,
		...song,
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
					<FollowButton
						mode={Mode.Heart}
						categoryArray="favouriteSongs"
						categoryData={song}
					/>
					{/* <TopList
						showHeadings
						items={album.songs}
						mode="album"
						showArtist
						showFavourites
					/> */}
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
	const singleTrack = await prisma.song.findUnique({
		where: {
			id: query.id,
		},
		include: {
			category: true,
			artist: true,
			album: true,
		},
	});
	if (singleTrack && singleTrack.album && singleTrack.artist) {
		const stats = {
			songAvatar: singleTrack.artist.avatarUrl,
			artistName: singleTrack.artist.name,
			albumName: singleTrack.album.name,
			albumReleasedOn: singleTrack.album.releasedOn.getUTCFullYear(),
			duration: convertSeconds(singleTrack.duration),
		};

		const songWithStats = {
			...singleTrack,
			stats,
		};

		return {
			props: {
				song: songWithStats,
			},
		};
	}
};

export default TrackPage;
