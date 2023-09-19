/**
 * returns color for text based on background color
 * @param backgroundColor color in rgb format ({ r: number; g: number; b: number })
 * @returns
 */
const lumaTextColor = (backgroundColor: {
	r: number;
	g: number;
	b: number;
}): { r: number; g: number; b: number } => {
	const { r, g, b } = backgroundColor;

	// perceived brightness of RGB color
	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	const textColor =
		luma > 40 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };

	return textColor;
};

export default lumaTextColor;
