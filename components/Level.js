export function Level({ left, right }) {
	return (
		<div className="level is-mobile">
			<div className="level-left">{left}</div>
			<div className="level-right">{right}</div>
		</div>
	);
}
