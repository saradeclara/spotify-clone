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
import { Dispatch, SetStateAction } from "react";
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
