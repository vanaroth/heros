import { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Sujet } from "./Sujet";
import { AddButton } from "./AddButton";
import { ActionBar } from "./ActionBar";
import { status } from "../functions/status";

export function ListeSujets() {
	const [listeSujets, setListeSujets] = useState({ list: [] });
	const [orderListeSujets, setOrderListeSujets] = useState([]);
	const [showForm, setShowForm] = useState(false);

	const add = (newItem) => {
		console.log("add", newItem);
		setListeSujets((s) => {
			const oldList = s.list || [];
			return {
				...s,
				list: [...oldList, { ...newItem }],
			};
		});
		toggleForm();
	};

	const del = (id) => {
		setListeSujets((s) => {
			const oldListe = s.list || [];
			const filteredList = oldListe.filter((_, paramsId) => {
				return id !== paramsId;
			});
			return {
				...s,
				list: [...filteredList],
			};
		});
	};

	const update = (id, newData) => {
		console.log("ID: ", id, "newData:", newData);
		setListeSujets((s) => {
			let oldList = s.list || [];
			oldList[id] = newData;

			return {
				...s,
				list: [...oldList],
			};
		});
	};

	const toggleForm = () => setShowForm((s) => !s);

	useEffect(() => {
		const base = getBase();

		if (base) {
			console.log("Base ok");
			setListeSujets(base);
		}
	}, []);

	useEffect(() => {
		console.log("listeSujets", listeSujets);
		saveBase(listeSujets);

		//add id and status
		let tempOrderList =
			listeSujets?.list?.map((item, id) => ({
				id,
				...item,
				status: status(item),
			})) || [];

		//order by statut

		for (let encours = 0; encours < tempOrderList.length; encours++) {
			let plusImportant = encours;

			console.log("	encours: ", encours);
			console.log("tempOrderList: ", [...tempOrderList]);
			for (let j = encours + 1; j < tempOrderList.length; j++) {
				console.log("		j: ", j);
				if (statusMaxImportant(tempOrderList, j, encours)) {
					plusImportant = j;
					console.log("			plusImportant: ", plusImportant);
				}
			}

			if (plusImportant !== encours) {
				let temp = tempOrderList[encours];
				tempOrderList[encours] = tempOrderList[plusImportant];
				tempOrderList[plusImportant] = temp;
				console.log("		on inverse: ", plusImportant, encours);
			}
		}
		console.log("tempOrderList: ", tempOrderList);
		setOrderListeSujets(tempOrderList);
	}, [listeSujets]);

	return (
		<>
			<div
				className="content"
				style={{
					position: "fixed",
					padding: "2em",
					top: "13vh",
					bottom: "6vh",
					overflowY: "auto",
				}}>
				<div className="notification is-info is-light has-text-centered">
					Faire les choses chaque jour pour garder l&apos;esprit <b>libre</b>
				</div>
				<div className="block">
					{orderListeSujets &&
						Array.isArray(orderListeSujets) &&
						orderListeSujets.length > 0 &&
						orderListeSujets.map((sujet, key) => (
							<Sujet key={key} data={sujet} del={del} update={update} />
						))}
					{!Array.isArray(orderListeSujets) ||
						(orderListeSujets.length === 0 && (
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
function statusMaxImportant(tab, j, encours) {
	const valJ = convertStatusToVal(tab[j].status);
	const valEncours = convertStatusToVal(tab[encours].status);
	/*console.log("			valJ: ", valJ, "valEncours", valEncours);
	if (valEncours === valJ) {
		console.log("				status égal");
		if (tab[encours].history.length > tab[j].history.length) {
			console.log(
				"						diff history encours: ",
				tab[encours].history.length,
				"						j:",
				tab[j].history.length
			);
			return true;
		}
	}*/

	return valEncours < valJ;
}
function convertStatusToVal(status) {
	if (status == "is-danger") {
		return 3;
	}
	if (status == "is-warning") {
		return 2;
	}
	if (status == "is-success") {
		return 0;
	}

	return 1;
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
