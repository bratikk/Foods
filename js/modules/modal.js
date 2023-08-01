function openModal(modalSelector, modalTimer) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add("show", "fadeIn");
	modal.classList.remove("hide", "fadeOut");
	document.body.style.overflow = "hidden";
	console.log(modalTimer);
	if (modalTimer) {
		clearInterval(modalTimer);
	}
}
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add("hide", "fadeOut");
	modal.classList.remove("show", "fadeIn");
	document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimer) {
	// Модальне вікно

	const btns = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);
	//

	btns.forEach((btn) => {
		btn.addEventListener("click", () => openModal(modalSelector, modalTimer));
	});
	//
	modal.addEventListener("click", (e) => {
		const target = e.target;
		if (target === modal || e.target.getAttribute("data-close") == "") {
			closeModal(modalSelector);
		}
	});
	//
	document.addEventListener("keydown", (e) => {
		if (e.code == "Escape" && modal.classList.contains("show")) {
			closeModal(modalSelector);
		}
	});
	//
	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			openModal(modalSelector, modalTimer);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
	//
}

export default modal;

export { closeModal };
export { openModal };
