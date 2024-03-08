import GradientLayoutPages from "@/components/GradientLayoutPages";
import EpisodeList from "@/components/ShowPage/EpisodeList";
import FollowButton from "@/components/ShowPage/FollowButton";
import { Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import prisma from "../../../lib/prisma";

const ShowPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { show } = props;
	const { episodes, avatarUrl, author, category, name } = show;
	enum Mode {
		Button,
		Heart,
	}
	const gradientProps = {
		image: avatarUrl,
		roundAvatar: false,
		description: [author],
		subtitle:
			category.description === "show" ? "Podcast" : category.description,
		title: name,
		...show,
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
				<Box sx={{ marginTop: "50px", marginLeft: "30px" }}>
					<FollowButton
						mode={Mode.Button}
						categoryArray="favouriteShows"
						categoryData={show}
					/>

					<EpisodeList
						heading={`All Episodes`}
						episodes={episodes}
						avatarUrl={avatarUrl}
						showTitle={name}
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
	const show = await prisma.show.findUnique({
		where: {
			id: query.id,
		},
		include: {
			category: true,
			subscribers: true,
			episodes: true,
		},
	});

	if (show) {
		return {
			props: {
				show,
			},
		};
	}
};

export default ShowPage;
