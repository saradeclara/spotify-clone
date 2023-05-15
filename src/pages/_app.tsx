import PlayerLayout from "@/components/PlayerLayout";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import "reset-css";

const theme = extendTheme({});

const App = ({
	Component,
	pageProps,
}: {
	Component: React.ElementType;
	pageProps: any;
}) => {
	const router = useRouter();

	const authLayout = <Component {...pageProps} />;
	const defaultLayout = (
		<PlayerLayout>
			<Component {...pageProps} />
		</PlayerLayout>
	);

	const AppLayout = (pathname: string) => {
		switch (pathname) {
			case "/signin":
				return authLayout;
			case "/signup":
				return authLayout;
			default:
				return defaultLayout;
		}
	};

	return (
		<ChakraProvider theme={theme}>{AppLayout(router.pathname)}</ChakraProvider>
	);
};

export default App;
