import { Children } from "react";

export function ActionBar({ children }) {
	return (
		<div
			className="box"
			style={{
				position: "fixed",
				bottom: 0,
				textAlign: "center",
				width: "100%",
				zIndex: 0,
				height: "10vh",
			}}>
			{children}
		</div>
	);
}
