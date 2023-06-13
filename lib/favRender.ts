const renderFavFeed = (category: string) => {
	switch (category) {
		case "album":
			return (
				<ListItem
					key={index}
					_hover={{ backgroundColor: "#1A1A1A" }}
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "10px",
						cursor: "pointer",
					}}
				>
					<Image borderRadius="md" boxSize="50px" src={thumbnail} alt={name} />
					<Box sx={{ marginLeft: "10px" }}>
						<Text color="white">{name}</Text>
						<Text fontSize="small">{`${capitalise(
							Category.description
						)} \u2022 ${artist.name}`}</Text>
					</Box>
				</ListItem>
			);
		default:
			break;
	}
};
