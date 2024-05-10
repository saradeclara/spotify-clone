import { Box, Heading } from "@chakra-ui/react";
import { Episode } from "@prisma/client";
import capitalise from "../../../lib/capitalise";
import { Track } from "../../../lib/store";
import EpisodeRow from "./EpisodeRow";

const EpisodeList = ({
	heading,
	episodes,
	avatarUrl,
	showTitle,
}: {
	heading: string;
	episodes: Episode[];
	avatarUrl: string | null;
	showTitle: string;
}) => {
	const episodeTracks: Track[] = [...episodes].map((el) => {
		return {
			id: el.id,
			name: el.title,
			author: showTitle,
			authorId: el.showId,
			duration: el.duration,
			collectionName: showTitle,
			thumbnail: avatarUrl,
			createdAt: el.createdAt,
			updatedAt: el.updatedAt,
			url: el.url,
			description: el.description,
		};
	});
	return (
		<Box>
			{heading ? (
				<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
					{capitalise(heading)}
				</Heading>
			) : null}
			{episodeTracks.map((singleEpisode, index) => {
				return (
					<EpisodeRow
						key={index}
						collection={episodeTracks}
						info={singleEpisode}
					/>
				);
			})}
		</Box>
	);
};

export default EpisodeList;
