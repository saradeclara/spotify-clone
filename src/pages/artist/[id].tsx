import FeedWrapper from "@/components/FeedWrapper";
import GradientLayoutArtist from "@/components/GradientLayoutArtist";
import TopList from "@/components/TopList";
import { NavBarHeaderContext } from "@/context/NavBarHeader";
import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import prisma from "../../../lib/prisma";

const ArtistPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { artist } = props;
	const { updateHeader } = useContext(NavBarHeaderContext);
	const { updateScrollPosition } = useContext(ScrollPositionContext);
	const { asPath } = useRouter();

	const gradientProps = {
		image: "",
		roundAvatar: true,
		description: ["description"],
		subtitle: "subtitle",
		title: "title",
		...artist,
	};

	const artistFeedData: { label: string; data: any[] }[] = [
		{
			label: "Discography",
			data: artist.albums ?? [],
		},
	];

	useEffect(() => {
		updateHeader(artist.name);
	});

	// reset scrollPosition when navigating through pages
	useEffect(() => {
		updateScrollPosition(0);
	}, [asPath]);

	return (
		<Box
			sx={{
				background: "black",
				height: "calc(100vh - 90px)",
				padding: "8px 8px 8px 0px",
			}}
		>
			<GradientLayoutArtist {...gradientProps}>
				<Box>
					<TopList
						heading={`${artist.name}'s Top 5 Tracks`}
						items={artist.top5Songs}
						showFavourites
					/>
					<FeedWrapper data={artistFeedData} />
				</Box>
			</GradientLayoutArtist>
		</Box>
	);
};

export const getServerSideProps = async ({ query }: { query: any }) => {
	const singleArtist = await prisma.artist.findUnique({
		where: {
			id: query.id,
		},
		include: {
			albums: {
				include: {
					Category: true,
				},
			},
			songs: {
				include: {
					Category: true,
					album: true,
					artist: true,
				},
			},
		},
	});

	if (singleArtist) {
		// convert dates to serializable formats
		// select top 5 songs
		const top5Songs = singleArtist.songs.slice(0, 4);
		const newArtist = {
			...singleArtist,
			top5Songs,
			createdAt: JSON.parse(JSON.stringify(singleArtist.createdAt)),
			updatedAt: JSON.parse(JSON.stringify(singleArtist.updatedAt)),
		};

		return {
			props: {
				artist: newArtist,
			},
		};
	}
};

export default ArtistPage;
