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

	useEffect(() => {
		console.log("Title: ", title);
		status(created, history, setIs);
	}, [history]);

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
	console.log("retest status");
	const limitStart = moment().subtract(1, "minutes");

	if (moment(created).isBefore(limitStart)) {
		if (upADanger(history)) {
			setIs("is-danger");
		} else if (upAWarining(history)) {
			setIs("is-warning");
		} else setIs("is-success");
	}
}

function upAWarining(history) {
	console.log("upAWarining");
	if (history?.length > 0) {
		const limitWarning = moment().subtract(1, "days");
		const limitDanger = moment().subtract(2, "days");
		const last = moment(history[history.length - 1].date);
		console.log(
			"upAWarining",
			last.format("YYYY-MM-DD HH:mm:ss"),
			limitWarning.format("YYYY-MM-DD HH:mm:ss"),
			limitDanger.format("YYYY-MM-DD HH:mm:ss"),
			last.isBetween(limitWarning, limitDanger)
		);

		if (isBetween(last, limitWarning, limitDanger)) {
			console.log("upAWarining History: True");
			return true;
		} else return false;
	}
	return true;
}

function upADanger(history) {
	console.log("upADanger");
	if (history?.length > 0) {
		const limitDanger = moment().subtract(2, "days");
		const last = moment(history[history.length - 1].date);
		console.log(
			"upADanger 2",
			last.format("YYYY-MM-DD HH:mm"),
			limitDanger.format("YYYY-MM-DD HH:mm")
		);

		if (last.isBefore(limitDanger)) {
			console.log(
				"upADanger History: True",
				last.format("YYYY-MM-DD HH:mm"),
				limitDanger.format("YYYY-MM-DD HH:mm")
			);
			return true;
		} else return false;
	}
	return true;
}

function isBetween(date, debut, fin) {
	if (moment(date).isBetween(debut, fin)) return true;
	return false;
}
