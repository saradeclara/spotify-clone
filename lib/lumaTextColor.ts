type rgbColor = {
	r: number;
	g: number;
	b: number;
};

/**
 * returns color for text based on background color
 * @param backgroundColor color in rgb format ({ r: number; g: number; b: number })
 * @returns
 */
const lumaTextColor = (backgroundColor: rgbColor): rgbColor => {
	const { r, g, b } = backgroundColor;

	// perceived brightness of RGB color
	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	console.log({ luma });
	const textColor =
		luma > 60 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };

	return textColor;
};
export default lumaTextColor;
