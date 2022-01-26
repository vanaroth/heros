export function InputAdd({ setData, data, onChange, add }) {
	return (
		<div className="control columns is-mobile">
			<div className="column ">
				<input
					className="input"
					type="text"
					placeholder="Text input"
					value={data}
					onChange={onChange}
				/>
			</div>
			<div
				className="column is-one-quarter

">
				<button
					className="button is-primary"
					onClick={(e) => {
						e.preventDefault();
						add({ title: data, params: {}, history: [] });
						setData("");
					}}>
					<i className="fi fi-plus-a"></i>
				</button>
			</div>
		</div>
	);
}
