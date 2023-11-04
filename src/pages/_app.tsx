import PlayerLayout from "@/components/PlayerLayout";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import { useRouter } from "next/router";
import "reset-css";
import { store } from "../../lib/store";

const theme = extendTheme({
	fonts: {
		body: `'Roboto', sans-serif`,
	},
});

const App = ({ Component, pageProps }) => {
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
		<ChakraProvider theme={theme}>
			<StoreProvider store={store}>{AppLayout(router.pathname)}</StoreProvider>
		</ChakraProvider>
	);
};

export default App;
