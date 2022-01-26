import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Héros du quotidien</title>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width,maximum-scale=1.0,user-scalable=0"
				/>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/fontisto@v3.0.4/css/fontisto/fontisto.min.css"
				/>
			</Head>
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
