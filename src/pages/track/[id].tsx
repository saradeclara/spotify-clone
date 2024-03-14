import GradientLayoutPages from "@/components/GradientLayoutPages";
import FollowButton from "@/components/ShowPage/FollowButton";
import { Mode, Size } from "@/enums/FollowButton";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { State } from "easy-peasy";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { AiFillPlayCircle } from "react-icons/ai";
import convertSeconds from "../../../lib/convertSeconds";
import prisma from "../../../lib/prisma";
import {
	StoreModel,
	Track,
	useStoreActions,
	useStoreState,
} from "../../../lib/store";

const TrackPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { singleTrack, stats } = props;
	console.log({ props });
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
			<Link href={`/artist/${singleTrack.artist?.id}`}>
				<Text
					sx={{ display: "inline", fontWeight: "bold", marginRight: "4px" }}
					_hover={{ textDecoration: "underline" }}
				>
					{artistName}
				</Text>
			</Link>,
			" \u2022 ",
			<Link href={`/album/${singleTrack.album?.id}`}>
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
		image: singleTrack.album?.avatarUrl,
		roundAvatar: false,
		description: stats ? renderDescription(stats) : [""],
		subtitle: singleTrack.category.description,
		title: singleTrack.name,
		...singleTrack,
	};

	const activeTrack = useStoreState(
		(store: State<StoreModel>) => store.activeTrack
	);
	const activeTracks = useStoreState(
		(store: State<StoreModel>) => store.activeTracks
	);

	const setActiveTrack = useStoreActions((store) => store.changeActiveTrack);
	const setActiveTracks = useStoreActions((store) => store.changeActiveTracks);

	const setCurrentTrack = () => {
		const newTrack: Track = {
			...singleTrack,
			thumbnail: singleTrack.album?.avatarUrl,
			author: singleTrack.artist?.name,
			authorId: singleTrack.artist?.id ?? null,
			collectionName: singleTrack.album?.name,
		};
		setActiveTrack(newTrack);
		setActiveTracks([newTrack]);
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
				<Box sx={{ display: "flex", padding: "20px" }}>
					<Box
						onClick={setCurrentTrack}
						sx={{ marginRight: "20px", cursor: "pointer" }}
					>
						<AiFillPlayCircle color="black" fontSize="55px" />
					</Box>
					<FollowButton
						size={Size.medium}
						mode={Mode.Heart}
						categoryArray="favouriteSongs"
						categoryData={singleTrack}
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

		return {
			props: {
				singleTrack,
				stats,
			},
		};
	}
};

export default TrackPage;
