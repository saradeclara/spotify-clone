import { ScrollPositionContext } from "@/context/ScrollPositionContext";
import { UserColorContext } from "@/context/UserColorContext";
import {
	Avatar,
	Box,
	Icon,
	ListItem,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
	UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useContext } from "react";
import {
	IoChevronBackCircleSharp,
	IoChevronForwardCircleSharp,
} from "react-icons/io5";

const Navbar = ({
	user,
	sidebarMargin,
	currentHistoryPos,
	updateHistoryPos,
}: {
	user: any;
	sidebarMargin: string;
	currentHistoryPos: { current: number; len: number };
	updateHistoryPos: Dispatch<SetStateAction<{ current: number; len: number }>>;
}) => {
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

	const { r, g, b } = useContext(UserColorContext);
	const { scrollPosition } = useContext(ScrollPositionContext);

	// perceived brightness of RGB color
	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	const textColor = luma > 40 ? "black" : "white";
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
					color={
						currentHistoryPos.current !== 0
							? "rgba(0,0,0,1)"
							: "rgba(0,0,0,0.6)"
					}
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
					color={
						currentHistoryPos.current !== currentHistoryPos.len - 1
							? "rgba(0,0,0,1)"
							: "rgba(0,0,0,0.6)"
					}
					boxSize="9"
					as={IoChevronForwardCircleSharp}
				/>
			</Box>
			<Box
				sx={{
					fontSize: "20px",
					fontWeight: "bold",
					width: "100%",
					color: textColor,
					opacity: scrollPosition > 400 ? "100%" : "0%",
					marginLeft: "10px",
					transition: "all .4s",
				}}
			>
				{user.firstName} {user.lastName}
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
