import {
	darkGrayText,
	lightGrayText,
	lightSpotifyGreen,
	spotifyGreen,
} from "@/styles/colors";
import {
	Box,
	ButtonGroup,
	Center,
	IconButton,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
} from "@chakra-ui/react";
import { ActionCreator } from "easy-peasy";
import {
	MouseEventHandler,
	MutableRefObject,
	ReactElement,
	RefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import ReactHowler from "react-howler";
import {
	AiFillPauseCircle,
	AiFillPlayCircle,
	AiFillStepForward,
	AiOutlineStepBackward,
} from "react-icons/ai";
import { BiShuffle } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { SlLoop } from "react-icons/sl";
import convertSeconds from "../../../lib/convertSeconds";
import { ExtendedSong } from "../../../lib/store";

const TrackControls = ({
	activeSongs,
	activeSong,
	setActiveSong,
}: {
	activeSongs: ExtendedSong[] | null;
	activeSong: ExtendedSong | null;
	setActiveSong: ActionCreator<ExtendedSong | null>;
}) => {
	enum NavMode {
		fwd = "fwd",
		bwd = "bwd",
		static = "static",
	}

	const [isPlaying, setIsPlaying] = useState(false);
	const [seek, setSeek] = useState(0.0);
	const [index, setIndex] = useState(-1);
	const [isSeeking, setIsSeeking] = useState(false);
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [duration, setDuration] = useState(0.0);
	const [shuffleHistory, updateShuffleHistory] = useState<number[]>([]);
	const [currentHistoryIndex, updateCurrentHistoryIndex] = useState<
		number | null
	>(null);
	const soundRef: RefObject<ReactHowler> = useRef(null);
	const indexRef: MutableRefObject<number> = useRef(index);
	const repeatRef: MutableRefObject<boolean> = useRef(repeat);

	const controls: {
		icon: React.ReactElement;
		ariaLabel: string;
		fontSize: string;
		onClick: MouseEventHandler<HTMLElement> | undefined;
		color: string;
		hover: { color?: string; fontSize?: string } | undefined;
		secondaryIcon?: ReactElement;
		isOn?: boolean;
		width?: string;
	}[] = [
		{
			icon: <BiShuffle />,
			ariaLabel: "shuffle",
			fontSize: "20px",
			onClick: activeSong ? () => setShuffle(!shuffle) : undefined,
			color: activeSong
				? shuffle
					? spotifyGreen
					: lightGrayText
				: darkGrayText,
			hover: { color: shuffle ? lightSpotifyGreen : "white" },
			secondaryIcon: <BsDot />,
			isOn: shuffle,
		},

		{
			icon: <AiOutlineStepBackward />,
			ariaLabel: "backward",
			fontSize: "20px",
			onClick: activeSong ? () => handleBackward(indexRef.current) : undefined,
			color: activeSong ? lightGrayText : darkGrayText,
			hover: { color: "white" },
		},
		{
			icon: <AiFillPlayCircle />,
			ariaLabel: "play",
			fontSize: "39px",
			width: "50px",
			onClick: activeSong ? () => setIsPlaying(!isPlaying) : undefined,
			color: activeSong ? lightGrayText : darkGrayText,
			hover: { color: lightGrayText, fontSize: activeSong ? "41px" : "39px" },
		},
		{
			icon: <AiFillPauseCircle />,
			ariaLabel: "pause",
			fontSize: "39px",
			width: "50px",
			onClick: activeSong ? () => setIsPlaying(!isPlaying) : undefined,
			color: activeSong ? lightGrayText : darkGrayText,
			hover: { color: lightGrayText, fontSize: activeSong ? "41px" : "39px" },
		},
		{
			icon: <AiFillStepForward />,
			ariaLabel: "forward",
			fontSize: "20px",
			onClick: activeSong ? () => handleForward(indexRef.current) : undefined,
			color: activeSong ? lightGrayText : darkGrayText,
			hover: { color: "white" },
		},
		{
			icon: <SlLoop />,
			ariaLabel: "loop",
			fontSize: "20px",
			onClick: activeSong ? () => setRepeat(!repeat) : undefined,
			color: activeSong
				? repeat
					? spotifyGreen
					: lightGrayText
				: darkGrayText,
			hover: { color: repeat ? lightSpotifyGreen : "white" },
			secondaryIcon: <BsDot />,
			isOn: repeat,
		},
	];

	/**
	 * function which returns a random integer between 0 and max number
	 * @param max number
	 * @returns number
	 */
	const getRandomInt = (max: number) => {
		return Math.floor(Math.random() * max);
	};

	/**
	 * function which sets new index and new current song
	 * @param arrayOfSongs
	 * @param newIndex
	 */
	const setNewActiveSong = (arrayOfSongs: ExtendedSong[], newIndex: number) => {
		setIndex(newIndex);
		setActiveSong(arrayOfSongs[newIndex]);
	};

	/**
	 * function which identifies next song to play considering any shuffle/repeat state. function sets new active song in every scenario.
	 */
	const handleForward = (currentIndex: number) => {
		if (!activeSongs) return;

		if (shuffle) {
			// shuffle on
			if (
				typeof currentHistoryIndex === "number" &&
				currentHistoryIndex + 1 <= shuffleHistory.length - 1
			) {
				const newHistoryIndex = currentHistoryIndex + 1;
				const newIndex = shuffleHistory[newHistoryIndex];
				const arrayOfSongs = activeSongs;
				setNewActiveSong(arrayOfSongs, newIndex);
				updateCurrentHistoryIndex(currentHistoryIndex + 1);
			}
		} else {
			// shuffle off
			// repeat on
			if (repeat && currentIndex === activeSongs.length - 1) {
				const newIndex = 0;
				const arrayOfSongs = activeSongs;
				setNewActiveSong(arrayOfSongs, newIndex);
			} else {
				// shuffle off
				// repeat off
				const newIndex = currentIndex + 1;
				const arrayOfSongs = activeSongs;
				setNewActiveSong(arrayOfSongs, newIndex);
			}
		}
	};

	/**
	 * function which identifies previous song to play considering any shuffle/repeat state. function sets new active song in every scenario.
	 */
	const handleBackward = (currentIndex: number) => {
		if (!activeSongs) return;
		if (shuffle) {
			// check currentHistoryIndex
			if (
				typeof currentHistoryIndex === "number" &&
				currentHistoryIndex - 1 >= 0
			) {
				const newHistoryIndex = currentHistoryIndex - 1;
				const newIndex = shuffleHistory[newHistoryIndex];
				const arrayOfSongs = activeSongs;
				setNewActiveSong(arrayOfSongs, newIndex);
				updateCurrentHistoryIndex(currentHistoryIndex - 1);
			}
		} else {
			// shuffle off
			// repeat on
			if (repeat && currentIndex === 0) {
				const newIndex = activeSongs?.length - 1;
				const arrayOfSongs = activeSongs;
				setNewActiveSong(arrayOfSongs, newIndex);
			} else {
				// shuffle off
				// repeat off
				const newIndex = currentIndex - 1;
				const arrayOfSongs = activeSongs;
				setNewActiveSong(arrayOfSongs, newIndex);
			}
		}
	};

	/**
	 * defines behaviour when song finishes (immediately plays next song, except when not appropriate)
	 * function should not skip to next track if album is finished (no repeat/shuffle or no shuffle)
	 */
	const onEnd = () => {
		if (typeof indexRef.current === "number") {
			handleForward(indexRef.current);
		}
	};

	const onSeek = (events: number[]) => {
		const seekValue = events[0];
		setSeek(seekValue);
		soundRef?.current?.seek(seekValue);
	};

	useEffect(() => {
		if (shuffle) {
			const max = activeSongs?.length;

			if (max) {
				let tempArray: number[] = [];
				for (let i = 0; i < max; i++) {
					tempArray.push(i);
				}

				tempArray = tempArray.filter((num) => num !== index);

				// reshuffle elements in tempArray to generate newShufflePlaylist array
				const newShufflePlaylist = tempArray
					.map((value) => ({
						value,
						sortKey: Math.random(),
					}))
					.sort((a, b) => a.sortKey - b.sortKey)
					.map(({ value }) => value);

				updateShuffleHistory([...shuffleHistory, index, ...newShufflePlaylist]);
				updateCurrentHistoryIndex(0);
			}
		}

		if (!shuffle) {
			updateShuffleHistory([]);
		}
	}, [shuffle]);

	useEffect(() => {
		// update duration on load
		// reset seek value when new song is loaded
		// always play new active song
		if (activeSong && activeSongs) {
			const activeSongIndex = activeSongs.findIndex(
				(el) => el.id === activeSong.id
			);
			setDuration(activeSong.duration);

			setSeek(0.0);
			setIndex(activeSongIndex);
			soundRef?.current?.seek(0.0);

			setIsPlaying(true);
		}

		if (!activeSong && seek !== 0) {
			setDuration(0);
			setSeek(0.0);
			soundRef?.current?.seek(0.0);

			setIsPlaying(false);
		}
	}, [activeSong]);

	useEffect(() => {
		let timerId: number | null = null;

		if (isPlaying && !isSeeking) {
			const f = () => {
				if (soundRef.current) {
					setSeek(soundRef.current.seek());
					timerId = requestAnimationFrame(f);
				}
			};

			timerId = requestAnimationFrame(f);
			if (typeof timerId === "number") {
				const notNullTimerId = timerId;
				return () => cancelAnimationFrame(notNullTimerId);
			}
		}
	}, [isPlaying, isSeeking]);

	useEffect(() => {
		if (!activeSongs) return;

		if (repeat && currentHistoryIndex === shuffleHistory.length - 1) {
			let tempArray: number[] = [];
			for (let i = 0; i < activeSongs?.length; i++) {
				tempArray.push(i);
			}

			// reshuffle elements in tempArray to generate newShufflePlaylist array
			const newShuffleHistory = tempArray
				.map((value) => ({
					value,
					sortKey: Math.random(),
				}))
				.sort((a, b) => a.sortKey - b.sortKey)
				.map(({ value }) => value);

			updateShuffleHistory([...shuffleHistory, ...newShuffleHistory]);
		}
	}, [currentHistoryIndex]);

	useEffect(() => {
		indexRef.current = index;
	}, [index]);

	useEffect(() => {
		repeatRef.current = repeat;
	}, [repeat]);

	return (
		<Box sx={{ width: "50%" }}>
			<Box>
				{activeSong ? (
					<ReactHowler
						ref={soundRef}
						playing={isPlaying}
						src={activeSong.url}
						onEnd={onEnd}
					/>
				) : undefined}
			</Box>
			<Center sx={{ paddingBottom: "8px" }}>
				<ButtonGroup sx={{ alignItems: "center" }}>
					{controls.map(
						({
							icon,
							ariaLabel,
							fontSize,
							onClick,
							color,
							hover,
							secondaryIcon,
							isOn,
							width,
						}) => {
							if (isPlaying && ariaLabel === "play") return null;
							if (!isPlaying && ariaLabel === "pause") return null;
							return (
								<Box>
									<IconButton
										outline="none"
										variant="link"
										_hover={activeSong ? hover : undefined}
										color={color}
										aria-label={ariaLabel}
										fontSize={fontSize}
										icon={icon}
										onClick={onClick}
										sx={{
											marginTop: secondaryIcon && isOn ? "5px" : "0px",
											width: width ?? "auto",
										}}
									/>
									{secondaryIcon && isOn ? (
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												marginTop: "-10px",
											}}
											color={spotifyGreen}
										>
											{secondaryIcon}
										</Box>
									) : undefined}
								</Box>
							);
						}
					)}
				</ButtonGroup>
			</Center>
			<Box color={lightGrayText}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box>
						<Text fontSize="xs">{convertSeconds(Math.trunc(seek))}</Text>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							padding: "0px 10px",
						}}
						width="80%"
					>
						<RangeSlider
							aria-label={["min", "max"]}
							step={0.1}
							min={0}
							max={duration ?? 0}
							id="seek-bar"
							onChange={onSeek}
							value={[seek]}
							onChangeStart={() => setIsSeeking(true)}
							onChangeEnd={() => setIsSeeking(false)}
						>
							<RangeSliderThumb index={0} />
							<RangeSliderTrack background="gray.800">
								<RangeSliderFilledTrack background={lightGrayText} />
							</RangeSliderTrack>
						</RangeSlider>
					</Box>
					<Box>
						<Text fontSize="xs">{convertSeconds(duration)}</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default TrackControls;
