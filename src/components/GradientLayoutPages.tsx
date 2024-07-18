import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { feedKey } from "@/react-query/queryKeys";
import { Avatar, Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import {
	MutableRefObject,
	ReactNode,
	UIEventHandler,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { FaRegEdit } from "react-icons/fa";
import { useQueryClient } from "react-query";
import capitalise from "../../lib/capitalise";
import lumaTextColor from "../../lib/lumaTextColor";

const fac = new FastAverageColor();

type rgbColor = {
	r: number;
	g: number;
	b: number;
};

const GradientLayoutPages = ({
	id,
	children,
	image,
	roundAvatar,
	description,
	subtitle,
	title,
	isTitleEditable,
}: {
	id?: string;
	title: string;
	subtitle: string;
	description: (string | number | null | JSX.Element)[];
	children: ReactNode;
	image: string | null | undefined;
	roundAvatar: boolean;
	isTitleEditable?: boolean;
}) => {
	const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
	const [textColor, setTextColor] = useState<rgbColor>({
		r: 255,
		g: 255,
		b: 255,
	});
	const { updateScrollPosition } = useContext(ScrollPositionContext);
	const [editMode, toggleEditMode] = useState(false);
	const [isEditIconVisible, toggleEditIconVisibility] = useState(false);
	const [playlistTitle, editPlaylistTitle] = useState("");

	// const textColor = lumaTextColor(color);
	const inputRef: MutableRefObject<HTMLInputElement | null> | undefined =
		useRef(null);
	const queryClient = useQueryClient();

	/**
	 * The `handleScroll` function updates the scroll position based on the target's
	 * scrollTop value.
	 * @param e - The parameter `e` is an object that contains another object `target`, which in turn has
	 * a property `scrollTop`.
	 */
	const handleScroll = (e: Event) => {
		const target = e.target as HTMLElement;
		if (target && target.scrollTop) {
			updateScrollPosition(target.scrollTop);
		}
	};

	/**
	 * The function `handleMouseEnter` toggles the visibility of an edit icon.
	 */
	const handleMouseEnter = () => {
		toggleEditIconVisibility(!isEditIconVisible);
	};

	/**
	 * The handleClick function toggles edit mode and updates the playlist title if provided.
	 * @param {boolean} editMode - The `editMode` parameter is a boolean value that indicates whether the
	 * application is currently in edit mode or not.
	 * @param {string} [currentTitle] - The `currentTitle` parameter is a string that represents the
	 * current title of a playlist. It is optional and may not always be provided as an argument when
	 * calling the `handleClick` function.
	 */
	const handleClick = (editMode: boolean, currentTitle?: string) => {
		toggleEditMode(!editMode);
		if (currentTitle) {
			editPlaylistTitle(currentTitle);
		}
	};

	/* This `useEffect` hook is adding an event listener to the `scroll` event on the `window` object.
	When the user scrolls the window, the `handleScroll` function will be called. The `{ passive: true
	}` option is used to indicate that the event listener will not call `preventDefault()` inside the
	event handler. */
	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		editPlaylistTitle(title);
	}, []);

	/* The `useEffect` hook you provided is responsible for fetching the dominant color of an image
	asynchronously using the `FastAverageColor` library (`fac`). */
	useEffect(() => {
		if (image && typeof image === "string") {
			fac
				.getColorAsync(image)
				.then((color) => {
					const rgbColor = {
						r: color.value[0],
						g: color.value[1],
						b: color.value[2],
					};
					setColor(rgbColor);
					const newTextColor = lumaTextColor(rgbColor);
					setTextColor(newTextColor);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [image]);

	/**
	 * The function `updatingPlaylistTitle` updates a playlist title, triggers a re-fetch of data, and
	 * toggles edit mode and icon visibility.
	 * @param {string} currentTitle - The `currentTitle` parameter is a string that represents the current
	 * title of a playlist that you want to update.
	 * @param {string} feedKey - The `feedKey` parameter is a string that represents the key used to
	 * identify the specific playlist or feed that is being updated. It is used to invalidate the query
	 * associated with this feed after the playlist title has been updated.
	 * @param {boolean} editMode - The `editMode` parameter  is a boolean value that indicates whether
	 * the playlist is currently in edit mode or not. It is used to determine whether to toggle
	 * the edit mode on or off after updating the playlist title.
	 */
	const updatingPlaylistTitle = async (
		currentTitle: string,
		feedKey: string,
		editMode: boolean
	) => {
		await fetch(`/api/playlist/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: currentTitle, flag: "edit" }),
		});
		editPlaylistTitle(currentTitle);
		queryClient.invalidateQueries(feedKey);
		toggleEditMode(!editMode);
		toggleEditIconVisibility(false);
	};

	/* This `useEffect` hook is responsible for focusing on the input element referenced by
	`inputRef.current` when the `editMode` state changes to `true`. */
	useEffect(() => {
		if (editMode && inputRef && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editMode]);

	/* This `useEffect` hook is responsible for handling the functionality when a user clicks outside of a
	the input component, which is referenced by `inputRef.current`. */
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				inputRef &&
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				updatingPlaylistTitle(playlistTitle, feedKey, editMode);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [inputRef, playlistTitle]);

	/* This 'useEffect' hook in the code snippet is responsible for resetting the `playlistTitle` state 
	with the value of the `title` prop whenever the `title` prop changes. */
	useEffect(() => {
		editPlaylistTitle(title);
	}, [title]);

	return (
		<Box
			onScroll={handleScroll as unknown as UIEventHandler}
			sx={{
				height: "100%",
				overflowY: "auto",
				borderRadius: "10px",
				background: "blue",
				bgGradient: `linear(to-b, rgba(${color.r},${color.g},${color.b}) 10px, rgba(${color.r},${color.g},${color.b}) 30px, rgba(${color.r},${color.g},${color.b}) 50px, rgba(18,18,18) 700px)`,
				backgroundAttachment: "local",
			}}
		>
			<Flex
				sx={{
					bg: `rgba(${color.r},${color.g},${color.b}, .4)`,
					padding: "60px 20px 20px 20px",
					align: "end",
				}}
			>
				<Box padding="20px" sx={{ display: "flex" }}>
					<Avatar
						size="full"
						src={image ?? undefined}
						borderRadius={roundAvatar ? "full" : "none"}
						boxShadow="2xl"
						width="250px"
						height="250px"
					/>
					<Box
						sx={{
							paddingLeft: "30px",
							color: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
							display: "flex",
							alignItems: "flex-end",
						}}
					>
						<Box>
							<Heading as="h4" size="xs">
								{capitalise(subtitle)}
							</Heading>
							{isTitleEditable ? (
								editMode ? (
									<Box sx={{ border: "0px" }}>
										<Input
											ref={inputRef}
											fontSize="70px"
											height="105px"
											fontWeight="bold"
											placeholder={title}
											variant="unstyled"
											value={playlistTitle}
											background="rgba(0,0,0,.3)"
											onChange={(e) => editPlaylistTitle(e.target.value)}
										/>
									</Box>
								) : (
									<Box
										height="105px"
										onClick={() => handleClick(editMode, playlistTitle)}
									>
										<Box display="flex" height="100px">
											<Text
												onMouseEnter={() => toggleEditIconVisibility(true)}
												onMouseLeave={() => toggleEditIconVisibility(false)}
												fontSize="70px"
												fontWeight="bold"
											>
												{playlistTitle}
											</Text>
											<Box>
												{isEditIconVisible ? (
													<FaRegEdit fontSize="30px" />
												) : null}
											</Box>
										</Box>
									</Box>
								)
							) : (
								<Heading as="h1" size="4xl">
									{capitalise(title)}
								</Heading>
							)}
							{}

							<Text
								fontSize={subtitle === "Podcast" ? "xl" : "sm"}
								fontWeight={subtitle === "Podcast" ? "bold" : "normal"}
								paddingTop="40px"
								sx={{ display: "flex", alignItems: "center" }}
							>
								{description}
							</Text>
						</Box>
					</Box>
				</Box>
			</Flex>
			{children}
		</Box>
	);
};

export default GradientLayoutPages;
