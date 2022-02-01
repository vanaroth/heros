import { Modal } from "./Modal";
import { SujetForm } from "./SujetForm";

export function AddButton({ title, showForm, add, onClick }) {
	return (
		<>
			{!showForm && (
				<div className="block" style={{ textAlign: "center" }}>
					<span
						className="button is-primary"
						onClick={onClick}
						style={{ zIndex: 0 }}>
						<i className="fi fi-plus-a"></i> {title}
					</span>
				</div>
			)}

			<Modal
				isActive={showForm}
				Component={() => <SujetForm isVisible={showForm} add={add} />}
				toggle={onClick}
			/>
		</>
	);
}
