import { closeModal, openModal } from "./modal";
import { postInfo } from "../services/services";

function form(formSelector, modalTimer) {
	// Форма відправки
	const forms = document.querySelectorAll(formSelector);
	// Перебераєм форми та надсилаєм їх у функцію
	forms.forEach((form) => {
		bindPostInfo(form);
	});

	function bindPostInfo(form) {
		// Статус повідомленя яке буде відображатись на сайті
		const statusMessage = {
			loading: "img/form/spinner.svg",
			succes: "Дяку! Ми скоро зв'яжемось з вами 💬",
			failed: "Щось пішло не так",
		};
		// Функція заготовка яка буде надсилати дані при її виклиці

		//
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			// Задаєм базове значеня загрузки при надсилані даних
			const status = document.createElement("img");
			status.src = statusMessage.loading;
			status.style.cssText = `display: block; margin: 0 auto;`;
			// Поміщаєм спінер на сайт після форми
			form.insertAdjacentElement("afterend", status);
			// Получаєм дані з форми
			const formDate = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formDate.entries()));
			//
			postInfo("http://localhost:3000/requests", json)
				.then((date) => {
					showStatusModal(statusMessage.succes);
					status.remove();
				})
				.catch(() => {
					showStatusModal(statusMessage.failed);
				})
				.finally(() => {
					form.reset();
				});
		});
	}
	//
	function showStatusModal(message) {
		//
		const parentModal = document.querySelector(".modal__dialog");
		parentModal.classList.add("hide"); // закриваєм минуле модальне вікно
		openModal(".modal", modalTimer); // Відкриваєм уже з новими даними
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
			closeModal(".modal");
		}, 5000);
	}
}
export default form;
