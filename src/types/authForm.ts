export enum ModeEnum {
	signin,
	signup,
}

type FormDataType = {
	type: string;
	key: string;
	label: string;
	defaultValue: string;
	isRequired: boolean;
};

type DefaultLogin = {
	email: string;
	password: string;
};

type DefaultRegister = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	isAdmin: boolean;
};

type ToastMessagesType = {
	success: string;
	failure: string;
};

type AuthFormProps = {
	formData: FormDataType[];
	mode: string;
	action: string;
	defaultForm: DefaultLogin | DefaultRegister;
	toastMessages: ToastMessagesType;
};

export type {
	AuthFormProps,
	FormDataType,
	DefaultLogin,
	DefaultRegister,
	ToastMessagesType,
};
