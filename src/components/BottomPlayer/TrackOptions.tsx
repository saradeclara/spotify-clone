import { lightGrayText } from "@/styles/colors";
import {
	Box,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
} from "@chakra-ui/react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import ReactHowler from "react-howler";
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";

const TrackOptions = ({
	volume,
	setVolume,
	volumeRef,
}: {
	volume: number;
	setVolume: Dispatch<SetStateAction<number>>;
	volumeRef: RefObject<ReactHowler>;
}) => {
	const [tempVolumeValue, setTempVolumeValue] = useState(0);
	const onSeek = (events: number[]) => {
		const volumeValue = events[0];
		setVolume(volumeValue);
		volumeRef?.current?.seek(volumeValue);
	};

	const toggleVolume = () => {
		if (volume !== 0) {
			setTempVolumeValue(volume);
			setVolume(0);
		} else {
			setVolume(tempVolumeValue);
			setTempVolumeValue(0);
		}
	};
	return (
		<Box
			sx={{
				width: "25%",
				padding: "0px 40px",
				display: "flex",
				justifyContent: "flex-end",
			}}
		>
			<Box
				sx={{
					display: "flex",
					width: "50%",
					justifyContent: "flex-end",
				}}
			>
				<Box
					sx={{ padding: "0px 10px", color: lightGrayText, cursor: "pointer" }}
					onClick={toggleVolume}
				>
					{volume === 0 ? <FaVolumeMute /> : <FaVolumeDown />}
				</Box>
				<RangeSlider
					aria-label={["min", "max"]}
					step={0.1}
					min={0}
					max={1}
					id="volume-bar"
					onChange={onSeek}
					value={[volume]}
				>
					<RangeSliderThumb index={0} />
					<RangeSliderTrack background="gray.800">
						<RangeSliderFilledTrack background={lightGrayText} />
					</RangeSliderTrack>
				</RangeSlider>
			</Box>
		</Box>
	);
};

export default TrackOptions;
