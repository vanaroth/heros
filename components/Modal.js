export function Modal({ Component, isActive }) {
	return (
		<div
			className={"modal " + (isActive ? "is-active" : "")}
			style={{ padding: "1em" }}>
			<div className="modal-background"></div>
			<div className="modal-content">
				<Component />
			</div>
			<button className="modal-close is-large" aria-label="close"></button>
		</div>
	);
}
