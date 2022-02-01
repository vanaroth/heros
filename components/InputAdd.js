import moment from "moment";

export function InputAdd({ data, onChange, add }) {
	moment.locale("fr");
	return (
		<div className="control columns is-mobile">
			<div className="column ">
				<input
					className="input"
					name="title"
					type="text"
					placeholder="Text input"
					value={data}
					onChange={onChange}
				/>
			</div>
			<div
				className="column is-one-quarter

">
				<button className="button is-primary" onClick={add}>
					<i className="fi fi-plus-a"></i>
				</button>
			</div>
		</div>
	);
}
