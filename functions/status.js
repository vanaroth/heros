import moment from "moment";

export function status({ created, history }) {
	moment.locale("fr");

	const limitStart = moment().subtract(1, "days");

	if (history?.length || moment(created).isBefore(limitStart)) {
		if (upADanger(history, created)) {
			return "is-danger";
		} else if (upAWarining(history, created)) {
			return "is-warning";
		} else return "is-success";
	}
	return "";
}

function upAWarining(history, created) {
	const limitWarning = moment().subtract(20, "hours");
	const limitDanger = moment().subtract(40, "hours");
	let date;
	if (history?.length > 0) {
		date = moment(history[history.length - 1].date);
	} else {
		date = moment(created);
	}

	if (date.isBetween(limitDanger, limitWarning)) {
		return true;
	} else return false;
}

function upADanger(history, created) {
	const limitDanger = moment().subtract(40, "hours");
	let date;
	if (history?.length > 0) {
		date = moment(history[history.length - 1].date);
	} else {
		date = moment(created);
	}

	if (date.isBefore(limitDanger)) {
		return true;
	} else return false;
}
