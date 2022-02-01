import { useEffect, useState } from "react";
import moment from "moment";
import "bulma/css/bulma.min.css";
import { MenuParams } from "./MenuParams";
import { Level } from "./Level";
import { Modal } from "./Modal";

export function Sujet({
	data: {
		id = -1,
		title = "",
		history = [],
		params = { test: "" },
		created = "",
		status,
	},
	actualStatus = "",
	update,
	del,
	...rest
}) {
	moment.locale("fr");

	const [isDetails, setIsDetails] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const toggleDetails = () => {
		setIsDetails((s) => {
			if (s) setIsActive(false);
			return !s;
		});
	};
	const toggleActive = () => setIsActive((s) => !s);

	const addDone = () => {
		const oldHistory = Array.isArray(history) ? history : [];
		const newData = {
			title,
			history: [...oldHistory, { date: moment().format("YYYY-MM-DD HH:mm") }],
			params,
			created,
		};

		update(id, newData);
	};

	return (
		<div className={"message " + status} {...rest}>
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

							<i className="fi fi-plus-a" onClick={addDone}></i>
						</div>
					}
					right={
						<div className="level-right " style={{ textAlign: "right" }}>
							<MenuParams
								idSujet={id}
								del={del}
								isActive={isActive}
								toggleActive={toggleActive}
								toggleDetails={toggleDetails}
							/>
						</div>
					}
				/>
			</div>
			<Modal
				Component={() => (
					<div className="box">
						<div
							className="block "
							style={{ fontWeight: "bold", textDecoration: "underline" }}>
							{title}:
						</div>
						<div className="content">
							<ol>
								{history.map(({ date }, id) => (
									<li key={id}>{moment(date).format("DD/MM/YY HH:mm")}</li>
								))}
							</ol>
						</div>
					</div>
				)}
				isActive={isDetails}
				toggle={toggleDetails}
			/>
		</div>
	);
}
