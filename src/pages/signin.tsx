import AuthForm from "@/components/AuthForm";
import {
	DefaultLogin,
	FormDataType,
	ModeEnum,
	ToastMessagesType,
} from "@/types/authForm";

/* eslint-disable react/prop-types */
const Signin = (_props: any) => {
	const formData: FormDataType[] = [
		{
			type: "email",
			key: "email",
			label: "Email or username",
			defaultValue: "",
			isRequired: true,
		},
		{
			type: "password",
			key: "password",
			label: "Password",
			defaultValue: "",
			isRequired: true,
		},
	];

	const defaultForm: DefaultLogin = {
		email: "",
		password: "",
	};

	const toastMessages: ToastMessagesType = {
		success: "Login successful",
		failure: "Login failed",
	};

	return (
		<AuthForm
			formData={formData}
			mode={ModeEnum[ModeEnum.signin]}
			action="login"
			defaultForm={defaultForm}
			toastMessages={toastMessages}
		/>
	);
};

export default Signin;
