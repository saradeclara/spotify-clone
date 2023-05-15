enum ModeEnum {
	signin,
	signup,
}

type formDataType = {
	type: string;
	label: string;
	defaultValue: string;
	isRequired: boolean;
};

type AuthFormProps = {
	mode: ModeEnum;
};

export type { AuthFormProps, formDataType };
