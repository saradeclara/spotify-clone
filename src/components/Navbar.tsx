import { LayoutContext } from "@/context/LayoutContext";
import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { UserColorContext } from "@/context/UserColorContext";
import {
	Avatar,
	Box,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	ListItem,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
	UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
	IoChevronBackCircleSharp,
	IoChevronForwardCircleSharp,
} from "react-icons/io5";

import { NavBarHeaderContext } from "@/context/NavBarHeader";
import { MdSearch } from "react-icons/md";
import lumaTextColor from "../../lib/lumaTextColor";

const Navbar = ({
	loggedInUser,
	currentHistoryPos,
	updateHistoryPos,
}: {
	loggedInUser: any;
	currentHistoryPos: { current: number; len: number };
	updateHistoryPos: Dispatch<SetStateAction<{ current: number; len: number }>>;
}) => {
	const router = useRouter();

	const { pathname } = useRouter();
	// const reqElements = asPath.split("/").filter((el) => el !== "");
	const [searchText, updateSearchText] = useState("");
	const { sidebarMargin } = useContext(LayoutContext);
	const { header } = useContext(NavBarHeaderContext);
	const whiteNavIcons =
		pathname.includes("search") || pathname.includes("[category]");

	// const result = useNavHeader(reqElements);

	const pushPrevHistoryPos = () => {
		window.history.back();
		if (currentHistoryPos.current !== 0) {
			updateHistoryPos({
				...currentHistoryPos,
				current: currentHistoryPos.current - 1,
			});
		}
	};

	const pushNextHistoryPos = () => {
		window.history.forward();
		if (currentHistoryPos.current !== currentHistoryPos.len - 1) {
			updateHistoryPos({
				...currentHistoryPos,
				current: currentHistoryPos.current + 1,
			});
		}
	};

	const handleSearch = (e: any) => {
		updateSearchText(e.target.value);
		setTimeout(() => {
			router.push(`/search/${e.target.value}`);
		}, 100);
	};

	const { r, g, b } = useContext(UserColorContext);
	const { scrollPosition } = useContext(ScrollPositionContext);
	const lumaColor = lumaTextColor({ r, g, b });

	return (
		<Box
			sx={{
				position: "absolute",
				zIndex: 1000,
				marginTop: "8px",
				borderRadius: "10px 10px 0px 0px",
				width: `calc(100vw - ${sidebarMargin} - 8px)`,
				height: "60px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0px 30px 0px 20px",
				backgroundColor:
					scrollPosition < 300 ? "rgba(0,0,0,0)" : `rgba(${r}, ${g}, ${b}, 1)`,
				transition: "all .3s",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Icon
					onClick={pushPrevHistoryPos}
					opacity={currentHistoryPos.current !== 0 ? "100%" : "60%"}
					color={whiteNavIcons ? "white" : "black"}
					cursor={currentHistoryPos.current !== 0 ? "pointer" : "auto"}
					boxSize="9"
					as={IoChevronBackCircleSharp}
				/>
				<Icon
					onClick={pushNextHistoryPos}
					cursor={
						currentHistoryPos.current !== currentHistoryPos.len - 1
							? "pointer"
							: "auto"
					}
					opacity={
						currentHistoryPos.current !== currentHistoryPos.len - 1
							? "100%"
							: "60%"
					}
					color={whiteNavIcons ? "white" : "black"}
					boxSize="9"
					as={IoChevronForwardCircleSharp}
				/>
			</Box>
			<Box
				sx={{
					fontSize: "20px",
					fontWeight: "bold",
					width: "100%",
					// color:
					// 	scrollPosition > 400
					// 		? `rgba(${lumaColor.r}, ${lumaColor.g}, ${lumaColor.b}, 1)`
					// 		: `rgba(${lumaColor.r}, ${lumaColor.g}, ${lumaColor.b}, 0)`,
					marginLeft: "10px",
					transition: "all .4s",
				}}
			>
				{whiteNavIcons ? (
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<MdSearch fontSize="25px" color="#808080" />
						</InputLeftElement>
						<Input
							onChange={handleSearch}
							value={searchText}
							placeholder="What do you want to listen to?"
							_placeholder={{
								color: "#808080",
							}}
							sx={{
								borderRadius: "full",
								color: "#808080",
								border: "0px",
								width: "30%",
								backgroundColor: "#2b2b2b",
							}}
						/>
					</InputGroup>
				) : (
					<Box
						transition="all .3s"
						color={
							scrollPosition < 400
								? "rgba(0,0,0,0)"
								: `rgba(${lumaColor.r}, ${lumaColor.g}, ${lumaColor.b})`
						}
					>
						{header}
					</Box>
				)}
			</Box>
			<Box>
				<Tooltip label={`${loggedInUser.firstName} ${loggedInUser.lastName}`}>
					<Popover placement="bottom-end">
						<PopoverTrigger>
							<Avatar
								size="sm"
								sx={{ border: "5px solid black" }}
								src={loggedInUser.avatarUrl}
							/>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverBody>
								<UnorderedList>
									<ListItem>
										<Link href={`/user/${loggedInUser.username}`}>Profile</Link>
									</ListItem>
									<ListItem>Logout</ListItem>
								</UnorderedList>{" "}
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default Navbar;
