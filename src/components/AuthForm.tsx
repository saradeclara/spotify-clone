import { spotifyGreen } from "@/styles/colors";
import { AuthFormProps } from "@/types";
import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	ListItem,
	Text,
	UnorderedList,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import capitalise from "../../lib/capitalise";
import { auth } from "../../lib/mutation";
import logo from "../assets/logo-codetunes.png";
import Image from "next/image";
import Head from "next/head";

const AuthForm = ({
	formData,
	mode,
	action,
	defaultForm,
	toastMessages,
}: AuthFormProps) => {
	const [form, updateForm] = useState(defaultForm);
	const [passwordVisible, togglePasswordVisible] = useState(false);
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const isError = false;

	const handleInputChange = (e: FormEvent<HTMLInputElement>, key: string) => {
		switch (key) {
			case "email":
				updateForm({ ...form, email: e.currentTarget.value });
				break;
			case "password":
				updateForm({ ...form, password: e.currentTarget.value });
				break;
			case "firstName":
				updateForm({ ...form, firstName: e.currentTarget.value });
				break;
			case "lastName":
				updateForm({ ...form, lastName: e.currentTarget.value });
				break;
			case "username":
				updateForm({ ...form, username: e.currentTarget.value });
			default:
				break;
		}
	};

	const handleTogglePasswordVisible = () => {
		togglePasswordVisible(!passwordVisible);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setIsLoading(true);

		const response = await auth(mode, form);
		setIsLoading(false);
		router.push("/");

		if (response) {
			if (!response.error) {
				toast({
					title: toastMessages.success,
					status: "success",
					duration: 5000,
					position: "top-right",
					isClosable: true,
				});
			} else {
				toast({
					title: toastMessages.failure,
					status: "error",
					duration: 5000,
					position: "top-right",
					isClosable: true,
				});
			}
		}
	};

	const emailElement = React.useRef<HTMLInputElement>(null);
	const passwordElement = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const newEmail = emailElement.current?.value;
		const newPassword = passwordElement.current?.value;

		if (newEmail && newPassword) {
			updateForm({
				...form,
				email: newEmail !== form.email ? newEmail : form.email,
				password: newPassword !== form.password ? newPassword : form.password,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [emailElement, passwordElement]);

	return (
		<Box
			sx={{
				height: mode === "signin" ? "100&" : "",
				width: "100vw",
				bg: "black",
				color: "white",
			}}
		>
			<Head>
				<title>CodeTunes - A Spotify Clone by Sara De Clara</title>
			</Head>
			<Box
				sx={{ display: "flex", justifyContent: "center", padding: "30px 0px" }}
			>
				<Image
					style={{ borderRadius: "200px", border: "5px solid white" }}
					alt="SpotiClone"
					height={350}
					src={logo}
				/>
			</Box>
			{mode === "signin" ? (
				<Box
					sx={{
						background: "darkgray",
						width: "30%",
						margin: "0 auto",
						borderRadius: "15px",
						padding: "20px 0px",
						color: "black",
					}}
				>
					<Box>
						<Text
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								marginBottom: "10px",
							}}
						>
							Use these credentials to access the portal:
						</Text>
						<UnorderedList sx={{ textAlign: "center", listStyleType: "none" }}>
							<ListItem>
								<Text fontWeight="bold">Email</Text>
								<Text>admin@admin.com</Text>
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Password</Text>
								<Text>admin123</Text>
							</ListItem>
						</UnorderedList>
					</Box>
				</Box>
			) : null}

			<Flex
				direction="column"
				justify="center"
				align="center"
				sx={{ width: "50%", margin: "0 auto" }}
			>
				<Box width="100%">
					{formData.map(
						({ type, defaultValue, key, label, isRequired }, index, array) => {
							return (
								<FormControl
									key={index}
									isRequired={isRequired}
									sx={
										index !== array.length
											? { marginBottom: "20px" }
											: undefined
									}
									isInvalid={isError}
								>
									<FormLabel sx={{ fontSize: "small", fontWeight: "bold" }}>
										{label}
									</FormLabel>
									<InputGroup>
										<Input
											ref={key === "email" ? emailElement : passwordElement}
											type={passwordVisible ? "text" : type}
											defaultValue={defaultValue}
											onChange={(e) => handleInputChange(e, key)}
										/>
										{type === "password" ? (
											<InputRightElement onClick={handleTogglePasswordVisible}>
												{passwordVisible ? <RiEyeLine /> : <RiEyeOffLine />}
											</InputRightElement>
										) : null}
									</InputGroup>
								</FormControl>
							);
						}
					)}
				</Box>
				<Button
					isLoading={isLoading}
					onClick={handleSubmit}
					sx={{
						background: spotifyGreen,
						fontWeight: "bold",
						color: "black",
						width: "100%",
						borderRadius: "50px",
						margin: "30px 0px",
					}}
				>
					{capitalise(action)}
				</Button>
				<Divider color="gray" margin="40px 0px" />
				{mode === "signin" ? (
					<Box marginTop="10px" marginBottom="30px">
						<Text sx={{ color: "gray", display: "inline", marginRight: "5px" }}>
							Don&apos;t have an account?
						</Text>
						<Link href="/signup">Sign up for CodeTunes</Link>
					</Box>
				) : (
					<Box margin="10px 0px">
						<Text sx={{ color: "gray", display: "inline", marginRight: "5px" }}>
							Have an account?
						</Text>
						<Link href="/signin">Login</Link>
					</Box>
				)}
			</Flex>
		</Box>
	);
};

export default AuthForm;
