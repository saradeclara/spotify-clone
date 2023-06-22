import { Text } from "@chakra-ui/react";
import findSubstring from "../../lib/findSubstring";
function SubstringSearchText({
	string,
	substring,
}: {
	string: string;
	substring: string;
}) {
	const segments = findSubstring(string, substring);
	const renderString = (
		string: string,
		segments: { match: boolean; text: string }[]
	) => {
		return segments && segments.length > 0
			? segments.map((singleSegment, index) => {
					return singleSegment.match ? (
						<Text
							as="span"
							key={index}
							sx={{
								color: "white",
								backgroundColor: "#2E77D0",
								borderRadius: "5px",
							}}
						>
							{singleSegment.text}
						</Text>
					) : (
						<Text as="span">{singleSegment.text}</Text>
					);
			  })
			: string;
	};

	return <span>{renderString(string, segments)}</span>;
}

export default SubstringSearchText;
