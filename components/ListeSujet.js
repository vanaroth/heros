import { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Sujet } from "./Sujet";
import { InputAdd } from "./InputAdd";
import { Modal } from "./Modal";
import { Block } from "./bulma/Block";
import { AddButton } from "./AddButton";
import { ActionBar } from "./ActionBar";

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

		if (base) {
			setListeSujets(base);
		}
	}, []);

	useEffect(() => {
		saveBase(listeSujets);
	}, [listeSujets]);

	return (
		<>
			<div
				className="content"
				style={{
					padding: "2em",
					marginTop: "20vh",
					marginBottom: "20vh",
					maxHeight: "70vh",
					overflowY: "auto",
				}}>
				<div className="notification is-info is-light has-text-centered">
					Faire les choses chaque jour pour garder l&apos;esprit <b>libre</b>
				</div>
				<div className="block">
					{listeSujets?.liste &&
						Array.isArray(listeSujets.liste) &&
						listeSujets.liste.length > 0 &&
						listeSujets.liste.map((sujet, key) => (
							<Sujet
								key={key}
								id={key}
								data={sujet}
								del={del}
								update={update}
							/>
						))}
					{!Array.isArray(listeSujets) ||
						(listeSujets.length === 0 && (
							<div className="notification is-warning is-light">Liste vide</div>
						))}
				</div>
			</div>
			<ActionBar>
				<AddButton
					title="Sujet"
					onClick={toggleForm}
					showForm={showForm}
					add={add}
				/>
			</ActionBar>
		</>
	);
}

function getBase() {
	return getData("liste_sujets");
}
function saveBase(data) {
	return setData("liste_sujets", data);
}

function getData(key) {
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
