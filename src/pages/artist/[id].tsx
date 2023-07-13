import { Box, Text } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import prisma from "../../../lib/prisma";

const ArtistPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return (
		<Box>
			{Object.values(props.artist).map((el) => (
				<Text>{el}</Text>
			))}
		</Box>
	);
};

export const getServerSideProps = async ({ query }: { query: any }) => {
	const singleArtist = await prisma.artist.findUnique({
		where: {
			id: query.id,
		},
	});

	if (singleArtist) {
		// convert dates to serializable formats
		const newArtist = {
			...singleArtist,
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
