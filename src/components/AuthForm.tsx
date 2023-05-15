import { spotifyGreen } from "@/styles/colors";
import { AuthFormProps, formDataType } from "@/types";
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
	Text,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { auth } from "../../lib/mutation";

const AuthForm = ({ mode }: AuthFormProps) => {
	const [loginForm, updateLoginForm] = useState({ email: "", password: "" });
	const [passwordVisible, togglePasswordVisible] = useState(false);
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const isError = false;
	const defaultInput = "";

	const handleInputChange = (e: FormEvent<HTMLInputElement>, label: string) => {
		switch (label) {
			case "email":
				updateLoginForm({ ...loginForm, email: e.currentTarget.value });
				break;
			case "password":
				updateLoginForm({ ...loginForm, password: e.currentTarget.value });
				break;
			default:
				break;
		}
	};

	const handleTogglePasswordVisible = () => {
		togglePasswordVisible(!passwordVisible);
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		const response = await auth(mode, "POST", loginForm);
		if (response) {
			setIsLoading(false);
			if (response.ok) {
				router.push("/");
				toast({
					title: "Login successful",
					description: "You've successfully logged into your account.",
					status: "success",
					duration: 5000,
					position: "top-right",
					isClosable: true,
				});
			} else {
				toast({
					title: "Login failed",
					description: "We do not know this username/password combination.",
					status: "error",
					duration: 5000,
					position: "top-right",
					isClosable: true,
				});
			}
		}
	};

	const formData: formDataType[] = [
		{
			type: "email",
			label: "Email or username",
			defaultValue: "",
			isRequired: true,
		},
		{
			type: "password",
			label: "Password",
			defaultValue: "",
			isRequired: true,
		},
	];

	return (
		<Box sx={{ height: "100vh", width: "100vw", bg: "black", color: "white" }}>
			<Flex justify="center" align="center" height="100px">
				<h1>Log in to Spotify</h1>
			</Flex>
			<Flex
				direction="column"
				justify="center"
				align="center"
				height="calc(100vh - 100px)"
				sx={{ width: "50%", margin: "0 auto" }}
			>
				<Box width="100%">
					{formData.map(
						({ type, defaultValue, label, isRequired }, index, array) => {
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
											type={passwordVisible ? "text" : type}
											defaultValue={defaultValue}
											onChange={(e) => handleInputChange(e, type)}
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
					Log in
				</Button>
				<Link href="#" sx={{ textDecoration: "underline" }}>
					Forgot your password?
				</Link>
				<Divider color="gray" margin="40px 0px" />
				<Box marginTop="10px">
					<Text sx={{ color: "gray", display: "inline", marginRight: "5px" }}>
						Don't have an account?
					</Text>
					<Link>Sign up for Spotify</Link>
				</Box>
			</Flex>
		</Box>
	);
};

export default AuthForm;
