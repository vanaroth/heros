export function Modal({ Component, isActive, toggle }) {
	return (
		<div
			className={"modal " + (isActive ? "is-active" : "")}
			style={{ padding: "1em", zIndex: 20 }}>
			<div className="modal-background"></div>
			<div className="modal-content">
				<Component />
			</div>
			<button
				className="modal-close is-large"
				aria-label="close"
				onClick={toggle}></button>
		</div>
	);
}
