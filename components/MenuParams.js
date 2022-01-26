import { useState } from "react";

export function MenuParams({ idSujet, del }) {
	const [isActive, setIsActive] = useState(false);

	const toogleActive = () => setIsActive((s) => !s);
	return (
		<div className={"dropdown is-right " + (isActive ? "is-active" : "")}>
			<div className="dropdown-trigger">
				<div
					aria-haspopup="true"
					aria-controls="dropdown-menu"
					onClick={toogleActive}>
					<span className="icon is-small">
						<i className="fi fi-more-v-a"></i>
					</span>
				</div>
			</div>
			<div
				className="dropdown-menu"
				id="dropdown-menu"
				role="menu"
				style={{ textAlign: "left" }}>
				<div className="dropdown-content">
					<span className="dropdown-item">
						<i className="fi fi-eye"></i> Details
					</span>
					<span className="dropdown-item ">
						<i className="fi fi-spinner-cog"></i> Modifier params
					</span>

					<hr className="dropdown-divider" />
					<span
						onClick={() => del(idSujet)}
						className="dropdown-item"
						style={{ background: "tomato", color: "white" }}>
						<i className="fi fi-trash"></i> Supprimer
					</span>
				</div>
			</div>
		</div>
	);
}
