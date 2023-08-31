import { LayoutContext } from "@/context/LayoutContext";
import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { SearchQueryContext } from "@/context/SearchQueryContext";
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

import { MdSearch } from "react-icons/md";
import lumaTextColor from "../../lib/lumaTextColor";

const Navbar = ({
	user,
	currentHistoryPos,
	updateHistoryPos,
}: {
	user: any;
	currentHistoryPos: { current: number; len: number };
	updateHistoryPos: Dispatch<SetStateAction<{ current: number; len: number }>>;
}) => {
	const { pathname } = useRouter();
	const [searchText, updateSearchText] = useState("");
	const router = useRouter();
	const { sidebarMargin } = useContext(LayoutContext);
	const { updateStatus } = useContext(SearchQueryContext);
	const whiteNavIcons =
		pathname.includes("search") || pathname.includes("[category]");

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
			updateStatus(true);
		}, 100);
	};

	const { r, g, b } = useContext(UserColorContext);
	const { scrollPosition } = useContext(ScrollPositionContext);

	return (
		<Box
			sx={{
				position: "absolute",
				zIndex: 1000,
				marginTop: "8px",
				borderRadius: "10px",
				width: `calc(100vw - ${sidebarMargin} - 8px)`,
				height: "60px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0px 30px 0px 20px",
				backgroundColor:
					scrollPosition > 300 ? `rgb(${r}, ${g}, ${b})` : undefined,
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
					color: lumaTextColor({ r, g, b }),
					opacity: whiteNavIcons
						? "100%"
						: scrollPosition > 400
						? "100%"
						: "0%",
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
					`${user.firstName} ${user.lastName}`
				)}
			</Box>
			<Box>
				<Tooltip label={`${user.firstName} ${user.lastName}`}>
					<Popover placement="bottom-end">
						<PopoverTrigger>
							<Avatar
								size="sm"
								sx={{ border: "5px solid black" }}
								src={user.avatarUrl}
							/>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverBody>
								<UnorderedList>
									<ListItem>
										<Link href={`/user/${user.username}`}>Profile</Link>
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
