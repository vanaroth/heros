import { useEffect, useState } from "react";
import moment from "moment";
import "bulma/css/bulma.min.css";
import { MenuParams } from "./MenuParams";
import { Level } from "./Level";

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

	useEffect(() => {
		if (newHistory.length > 0) {
			const newData = { title, history: newHistory, params, created };
			console.log("Sujet data", newData);

			update(id, newData);
			status(created, newHistory, setIs);
		}
	}, [newHistory]);

	useEffect(() => status(created, history, setIs), [history]);

	return (
		<div className={"message " + is} {...rest}>
			<div className="message-body">
				<Level
					left={
						<div
							style={{
								display: "flex",
								alignItems: "center",
							}}>
							<div className="level-item">{title}</div>
							<div className=" tag is-white level-item">{history?.length}</div>

							<i
								className="fi fi-plus-a"
								onClick={() =>
									setNewHistory((s) => [
										...s,
										{ date: moment().format("YYYY-MM-DD HH:mm") },
									])
								}></i>
						</div>
					}
					right={
						<div className="level-right " style={{ textAlign: "right" }}>
							<MenuParams idSujet={id} del={del} />
						</div>
					}
				/>
			</div>
		</div>
	);
}

function status(created, history, setIs) {
	const limitStart = moment().subtract(1, "minutes");

	if (moment(created).isBefore(limitStart)) {
		if (upAWarining(history)) {
			setIs("is-warning");
		}
		if (upADanger(history)) {
			setIs("is-danger");
		}
		//setIs("is-success");
	}

	return "";
}

function upAWarining(history) {
	if (history?.length > 0) {
		const now = moment();
		const limitWarning = moment().subtract(1, "minutes");
		const limitDanger = moment().subtract(2, "minutes");
		const last = moment(history[history.length - 1].date);

		if (isBetween(last, limitWarning, limitDanger)) {
			console.log("upAWarining History: True");
			return true;
		} else false;
	}
	return true;
}

function upADanger(history) {
	if (history?.length > 0) {
		const limitDanger = moment().subtract(2, "minutes");
		const last = moment(history[history.length - 1].date);

		if (last.isBefore(limitDanger)) {
			console.log(
				"upADanger History: True",
				last.format("YYYY-MM-DD HH:mm"),
				limitDanger.format("YYYY-MM-DD HH:mm")
			);
			return true;
		} else false;
	}
	return true;
}

function isBetween(date, debut, fin) {
	if (moment(date).isBetween(debut, fin)) return true;
	return false;
}
