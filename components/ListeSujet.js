import { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Sujet } from "./Sujet";
import { InputAdd } from "./InputAdd";
import { Modal } from "./Modal";
import { Block } from "./bulma/Block";

export function ListeSujets() {
	const [listeSujets, setListeSujets] = useState([]);
	const [showForm, setShowForm] = useState(false);

	const add = (newItem) => {
		setListeSujets((s) => {
			const oldListe = s.liste || [];
			return {
				...s,
				liste: [...oldListe, newItem],
			};
		});
		toggleForm();
	};
	const del = (id) => {
		setListeSujets((s) => {
			const oldListe = s.liste || [];
			console.log("del paramsId:", id);
			const filteredList = oldListe.filter((_, paramsId) => id !== paramsId);
			return {
				...s,
				liste: [...filteredList],
			};
		});
	};

	const update = (id, newData) => {
		setListeSujets((s) => {
			let oldListe = s.liste || [];
			oldListe[id] = newData;

			return {
				...s,
				liste: [...oldListe],
			};
		});
	};

	const toggleForm = () => setShowForm((s) => !s);

	useEffect(() => {
		const base = getBase();
		console.log("base : ", base);
		if (base) {
			console.log("recup base");
			setListeSujets(base);
		}
	}, []);

	useEffect(() => {
		saveBase(listeSujets);
		console.log("maj base");
	}, [listeSujets]);

	return (
		<div className="content" style={{ padding: "2em" }}>
			<div className="block">
				{listeSujets?.liste &&
					Array.isArray(listeSujets.liste) &&
					listeSujets.liste.length > 0 &&
					listeSujets.liste.map((sujet, key) => (
						<Sujet key={key} id={key} data={sujet} del={del} update={update} />
					))}
				{!Array.isArray(listeSujets) ||
					(listeSujets.length === 0 && (
						<div className="message is-info">
							<div className="message-body"> Liste vide</div>
						</div>
					))}
			</div>

			{!showForm && (
				<div className="block">
					<button className="button" onClick={toggleForm}>
						<i className="fi fi-plus-a"></i> Sujet
					</button>
				</div>
			)}

			<Modal
				isActive={showForm}
				Component={() => <SujetForm isVisible={showForm} add={add} />}
			/>
		</div>
	);
}

function SujetForm({ isVisible = true, add }) {
	const [data, setData] = useState("");
	const handleChange = (e) => setData(e.target.value);
	return (
		<form className="box" style={{ display: isVisible ? "block" : "none" }}>
			<Block>
				<h3 style={{ textAlign: "center" }}>Nouveau Sujet</h3>
			</Block>
			<div className="field">
				<label className="label">Titre du Sujet</label>
				<InputAdd
					data={data}
					setData={setData}
					onChange={handleChange}
					add={add}
				/>
			</div>
		</form>
	);
}
function getBase() {
	return getData("liste_sujets");
}
function saveBase(data) {
	return setData("liste_sujets", data);
}

function getData(key) {
	console.log("getData key:", key);
	try {
		const sujetData = localStorage.getItem(key);
		const formatedData = JSON.parse(sujetData);

		return formatedData || false;
	} catch (e) {
		console.log("Erreur get data:" + key);

		return false;
	}
}

function setData(key, data) {
	try {
		const formatedData = JSON.stringify(data);
		localStorage.setItem(key, formatedData);
	} catch (e) {
		console.log("Erreur set data: " + key);
	}
}
