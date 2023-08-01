import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
	const modalTimer = setTimeout(() => openModal(".modal", modalTimer), 30000);

	calc();
	cards();
	forms("form", modalTimer);
	timer(".timer", "2024-03-24");
	modal("[data-modal]", ".modal", modalTimer);
	tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
	slider({
		container: ".offer__slider",
		slide: ".offer__slide",
		nextArrow: ".offer__slider-next",
		prevArrow: ".offer__slider-prev",
		totalCounter: "#total",
		currentCounter: "#current",
		wrapper: ".offer__slider-wrapper",
		field: ".offer_slider-inner",
	});
});
