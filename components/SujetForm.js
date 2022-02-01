import { useEffect, useState } from "react";
import moment from "moment";
import { Block } from "./bulma/Block";
import { InputAdd } from "./InputAdd";

export function SujetForm({ isVisible = true, add }) {
	moment.locale("fr");
	const [data, setData] = useState({
		title: "",
		created: moment().format("YYYY-MM-DD HH:mm"),
	});
	const handleChange = ({ target: { name, value } }) =>
		setData((s) => ({ ...s, [name]: value }));

	const customAdd = (e) => {
		e.preventDefault();
		add({
			title: data.title,
			params: {},
			history: [],
			created: data.created,
		});
		setData("");
	};
	return (
		<form
			className="box"
			style={{ display: isVisible ? "block" : "none", textAlign: "left" }}>
			<Block>
				<h2 className="is-size-3" style={{ textAlign: "center" }}>
					Nouveau Sujet
				</h2>
			</Block>
			<div className="field">
				<label className="label">Titre du Sujet</label>
				<InputAdd data={data.title} onChange={handleChange} add={customAdd} />
			</div>
			<hr />
			<div className="field">
				<label className="label">Date creation</label>
				<input
					className="input"
					type="datetime-local"
					name="created"
					placeholder="Text input"
					value={moment(data.created).format("YYYY-MM-DDTHH:MM")}
					onChange={handleChange}
				/>
			</div>
		</form>
	);
}
