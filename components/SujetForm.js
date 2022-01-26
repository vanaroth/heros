import { useEffect, useState } from "react";
import { Block } from "./bulma/Block";
import { InputAdd } from "./InputAdd";

export function SujetForm({ isVisible = true, add }) {
	const [data, setData] = useState("");
	const handleChange = (e) => setData(e.target.value);
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
				<InputAdd
					data={data}
					setData={setData}
					onChange={handleChange}
					add={add}
				/>
			</div>
		</form>
	);
}
