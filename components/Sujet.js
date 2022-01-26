import { useEffect, useState } from "react";
import moment from "moment";
import "bulma/css/bulma.min.css";
import { MenuParams } from "./MenuParams";

export function Sujet({
	id = -1,
	data: { title = "", history = [], params = { test: "" }, created = "" },
	actualStatus = "",
	update,
	del,
	...rest
}) {
	moment.locale("fr");

	const [is, setIs] = useState("");
	const [newHistory, setNewHistory] = useState(history);

	const isSuccess = () => setIs("is-success");
	const isWarning = () => setIs("is-warning");
	const isDanger = () => setIs("is-danger");

	useEffect(() => {}, [history, newHistory]);

	useEffect(() => {
		const newData = { title, hisory: newHistory, params, created };
		console.log("Sujet data", newData);

		update(id, newData);
	}, [newHistory]);

	return (
		<div className={"message " + is} {...rest}>
			<div className="message-body">
				<div className="columns is-mobile">
					<div className="column is-four-fifths">
						{title} {"  "}{" "}
						<i
							className="fi fi-plus-a"
							onClick={() =>
								setNewHistory((s) => [
									...s,
									{ date: moment().format("YYYY-MM-DD HH:mm") },
								])
							}></i>
					</div>

					<div className="column" style={{ textAlign: "right" }}>
						<MenuParams idSujet={id} del={del} />
					</div>
				</div>
			</div>
		</div>
	);
}
