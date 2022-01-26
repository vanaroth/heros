import { Modal } from "./Modal";
import { SujetForm } from "./SujetForm";

export function AddButton({ title, showForm, add, onClick }) {
	return (
		<>
			{!showForm && (
				<div className="block" style={{ textAlign: "center" }}>
					<button className="button is-primary" onClick={onClick}>
						<i className="fi fi-plus-a"></i> {title}
					</button>
				</div>
			)}

			<Modal
				isActive={showForm}
				Component={() => <SujetForm isVisible={showForm} add={add} />}
			/>
		</>
	);
}
