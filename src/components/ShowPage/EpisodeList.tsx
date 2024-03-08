import { Box, Heading } from "@chakra-ui/react";
import { Episode } from "@prisma/client";
import capitalise from "../../../lib/capitalise";
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
	return (
		<Box>
			{heading ? (
				<Heading size="md" sx={{ color: "white", margin: "20px 0px" }}>
					{capitalise(heading)}
				</Heading>
			) : null}
			{episodes.map((singleEpisode) => {
				return (
					<EpisodeRow
						avatarUrl={avatarUrl}
						showTitle={showTitle}
						info={singleEpisode}
					/>
				);
			})}
		</Box>
	);
};

export default EpisodeList;
