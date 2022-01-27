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

			update(id, newData);
			status(created, newHistory, setIs);
		}
	}, [newHistory]);

	useEffect(() => {
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
	const limitStart = moment().subtract(1, "days");

	if (history?.length || moment(created).isBefore(limitStart)) {
		if (upADanger(history)) {
			setIs("is-danger");
		} else if (upAWarining(history)) {
			setIs("is-warning");
		} else setIs("is-success");
	}
}

function upAWarining(history) {
	if (history?.length > 0) {
		const limitWarning = moment().subtract(20, "hours");
		const limitDanger = moment().subtract(40, "hours");
		const last = moment(history[history.length - 1].date);

		if (last.isBetween(limitDanger, limitWarning)) {
			return true;
		} else return false;
	}
	return true;
}

function upADanger(history) {
	if (history?.length > 0) {
		const limitDanger = moment().subtract(40, "hours");
		const last = moment(history[history.length - 1].date);

		if (last.isBefore(limitDanger)) {
			return true;
		} else return false;
	}
	return true;
}

function isBetween(date, debut, fin) {
	if (moment(date).isBetween(debut, fin)) return true;
	return false;
}
