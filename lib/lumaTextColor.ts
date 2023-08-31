/**
 * returns color for text based on background color
 * @param backgroundColor color in rgb format ({ r: number; g: number; b: number })
 * @returns
 */
const lumaTextColor = (backgroundColor: {
	r: number;
	g: number;
	b: number;
}): string => {
	const { r, g, b } = backgroundColor;

	// perceived brightness of RGB color
	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	const textColor = luma > 40 ? "black" : "white";

	return textColor;
};

export default lumaTextColor;
