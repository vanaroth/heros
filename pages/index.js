import { useEffect, useState } from "react";
import moment from "moment";
import "bulma/css/bulma.min.css";
import { ListeSujets } from "../components/ListeSujet";
import { Sujet } from "../components/Sujet";
import { bulmaIsActive } from "../functions/bulmaIsActive";

export default function Home() {
	moment.locale("fr");
	useEffect(() => bulmaIsActive(), []);
	return (
		<div className="container" style={{ overflow: "hidden" }}>
			<section
				className="block hero is-small is-primary"
				style={{
					position: "fixed",
					top: 0,
					zIndex: "auto",
					left: 0,
					right: 0,
				}}>
				<div className="hero-body" style={{ textAlign: "center" }}>
					<p className="title">Héros du quotidien</p>
				</div>
			</section>
			<ListeSujets />
		</div>
	);
}

function getData(title) {
	try {
		const sujetData = localStorage.getItem(title);
		const formatedData = JSON.parse(sujetData);

		return formatedData || [];
	} catch (e) {
		console.log("Erreur get data");

		return [];
	}
}

function setData(title, data) {
	try {
		const formatedData = JSON.stringify(data);
		localStorage.setItem(title, formatedData);
	} catch (e) {
		console.log("Erreur set data");
	}
}

function TriLingeSale() {
	moment.locale("fr");
	const title = "Tri Linge sale";
	const [newData, setNewData] = useState([]);
	const [actualStatus, setActualStatus] = useState("");

	const addNewDate = () => {
		console.log("Add new data", newData);
		//création de la nouvelle entrée
		const entry = {
			date: moment().format("YYYY-MM-DD"),
		};
		save(entry);
		setActualStatus(status());
	};

	const save = (entry) => {
		//mise à jour hook
		setNewData([...newData, entry]);
		//maj localStorage
		setData(title, [...newData, entry]);
	};

	const status = () => {
		const data = getData(title);
		console.log("status", data);
		setNewData(data);

		if (data !== false && Array.isArray(data) && data.length > 0) {
			const now = moment();
			const last = moment(data[data.length - 1].date);
			const limitWarning = moment().subtract(1, "days");
			const limitDanger = moment().subtract(2, "days");

			if (moment(last).isBetween(limitWarning, now)) {
				return "success";
			} else if (moment(last).isBetween(limitDanger, limitWarning)) {
				return "warning";
			} else if (moment(last).isBefore(limitDanger)) {
				return "danger";
			}
		}
	};

	useEffect(() => setActualStatus(status()), []);
	return (
		<Sujet
			title={title}
			actualStatus={actualStatus}
			statusMethod={status}
			addNewSession={() => addNewDate()}
		/>
	);
}
