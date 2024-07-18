import AuthForm from "@/components/AuthForm";
import {
	DefaultRegister,
	FormDataType,
	ModeEnum,
	ToastMessagesType,
} from "@/types/authForm";

/* eslint-disable react/prop-types */
const Signup = (props) => {
	const formData: FormDataType[] = [
		{
			type: "text",
			key: "username",
			label: "Username",
			defaultValue: "",
			isRequired: true,
		},
		{
			type: "text",
			key: "firstName",
			label: "First name",
			defaultValue: "",
			isRequired: true,
		},
		{
			type: "text",
			key: "lastName",
			label: "Last name",
			defaultValue: "",
			isRequired: true,
		},
		{
			type: "email",
			key: "email",
			label: "Email",
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

	const defaultForm: DefaultRegister = {
		username: "",
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		isAdmin: false,
	};

	const toastMessages: ToastMessagesType = {
		success: "Registration successful",
		failure: "Registration failed",
	};

	return (
		<AuthForm
			formData={formData}
			mode={ModeEnum[ModeEnum.signup]}
			action="register"
			defaultForm={defaultForm}
			toastMessages={toastMessages}
		/>
	);
};

export default Signup;
