function modal() {
	// Модальне вікно

	const btns = document.querySelectorAll("[data-modal]"),
		closeBtn = document.querySelector("[data-close]"),
		modal = document.querySelector(".modal");
	//
	function openModal() {
		modal.classList.add("show", "fadeIn");
		modal.classList.remove("hide", "fadeOut");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimer);
	}
	function closeModal() {
		modal.classList.add("hide", "fadeOut");
		modal.classList.remove("show", "fadeIn");
		document.body.style.overflow = "";
	}
	//
	btns.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});
	closeBtn.addEventListener("click", () => {
		closeModal();
	});
	//
	modal.addEventListener("click", (e) => {
		const target = e.target;
		if (target === modal || e.target.getAttribute("data-close") == "") {
			closeModal();
		}
	});
	//
	document.addEventListener("keydown", (e) => {
		if (e.code == "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});
	const modalTimer = setTimeout(openModal, 50000);
	//
	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
	//
	function showStatusModal(message) {
		//
		const parentModal = document.querySelector(".modal__dialog");
		parentModal.classList.add("hide"); // закриваєм минуле модальне вікно
		openModal(); // Відкриваєм уже з новими даними
		//
		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
		 <div class="modal__content">
       <div data-close class="modal__close">×</div>
		 <div class="modal__title">${message}</div>`;

		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			parentModal.classList.add("show");
			parentModal.classList.remove("hide");
		}, 5000);
	}
}

module.exports = modal;
