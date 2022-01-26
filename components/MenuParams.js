import { useState } from "react";

export function MenuParams({ idSujet, del }) {
	const [isActive, setIsActive] = useState(false);

	const toogleActive = () => setIsActive((s) => !s);
	return (
		<div class={"dropdown is-right " + (isActive ? "is-active" : "")}>
			<div class="dropdown-trigger">
				<button
					class="button"
					aria-haspopup="true"
					aria-controls="dropdown-menu"
					onClick={toogleActive}>
					<span class="icon is-small">
						<i className="fi fi-more-v-a"></i>
					</span>
				</button>
			</div>
			<div
				class="dropdown-menu"
				id="dropdown-menu"
				role="menu"
				style={{ textAlign: "left" }}>
				<div class="dropdown-content">
					<span class="dropdown-item">
						<i class="fi fi-eye"></i> Details
					</span>
					<span class="dropdown-item ">
						<i class="fi fi-spinner-cog"></i> Modifier params
					</span>

					<hr class="dropdown-divider" />
					<span
						onClick={() => del(idSujet)}
						class="dropdown-item"
						style={{ background: "tomato", color: "white" }}>
						<i class="fi fi-trash"></i> Supprimer
					</span>
				</div>
			</div>
		</div>
	);
}
