import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		console.log("in _document.js");
		return (
			<Html>
				<Head>
					<title>Héros ! du quotidien</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width,maximum-scale=1.0,user-scalable=0"
					/>
					<meta charSet="utf-8" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="mobile-web-app-capable" content="yes" />
					<link rel="manifest" href="/manifest.json" />
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/fontisto@v3.0.4/css/fontisto/fontisto.min.css"
					/>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0,maximum-scale=1.0"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
