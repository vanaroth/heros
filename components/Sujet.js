import { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { MenuParams } from "./MenuParams";

export function Sujet({
	id = -1,
	title,
	actualStatus = "",
	addNewSession,
	del,
	...rest
}) {
	const [is, setIs] = useState("");

	const isSuccess = () => setIs("is-success");
	const isWarning = () => setIs("is-warning");
	const isDanger = () => setIs("is-danger");

	useEffect(() => {
		console.log("Sujet id", id);
		if (actualStatus === "success") {
			isSuccess();
		} else if (actualStatus === "warning") {
			isWarning();
		} else if (actualStatus === "danger") {
			isDanger();
		}
	}, [actualStatus]);

	return (
		<div className={"message " + is} {...rest}>
			<div className="message-body">
				<div className="columns is-mobile">
					<div className="column is-four-fifths" onClick={addNewSession}>
						{title} {"  "} <i class="fi fi-plus-a" onClick={addNewSession}></i>
					</div>

					<div className="column" style={{ textAlign: "right" }}>
						<MenuParams idSujet={id} del={del} />
					</div>
				</div>
			</div>
		</div>
	);
}
