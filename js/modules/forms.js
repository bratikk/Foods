function form() {
	// Форма відправки
	const forms = document.querySelectorAll("form");
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
		const postInfo = async (url, date) => {
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: date,
			});
			return await res.json();
		};
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
}
module.exports = form;
