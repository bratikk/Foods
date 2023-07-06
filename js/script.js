window.addEventListener("DOMContentLoaded", () => {
	// Tabs
	const tabs = document.querySelectorAll(".tabheader__item"),
		tabsContent = document.querySelectorAll(".tabcontent"),
		tabParent = document.querySelector(".tabheader__items");

	function hideContent() {
		tabsContent.forEach((item) => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});

		tabs.forEach((tabs) => {
			tabs.classList.remove("tabheader__item_active");
		});
	}
	function showContent(i = 0) {
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
		tabs[i].classList.add("tabheader__item_active");
	}
	hideContent();
	showContent();
	tabParent.addEventListener("click", (e) => {
		const target = e.target;
		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (item == target) {
					hideContent();
					showContent(i);
				}
			});
		}
	});
	// Timer

	// endtime = deadLine
	// endtime = 1687996800000

	// Дати в мілісікундах:
	// День = 86 400 000;
	// Година = 3 600 000
	// Хвилини = 60 000
	// Секунда = 1 000

	// фОРМУЛИ
	// t = 1687996800000 - 1687014845000 = 1127116000 - це час який лишився в мілісікундах
	// days = 1126317000 / (24 * 60 * 60)  = 13
	// hours = 1126317000 / (1000 * 60 * 60) % 24 = 0
	// minutes = (1126317000 / 1000 / 60) % 60 = 52
	// seconds = (1126317000 / 1000) % 60 = 100

	// Дії
	// 1 - Функція яка вираховує усе та вертає обєкт з даними
	// 2 - Функція яка приймає два агрументи ) В середині получає усі елементи з якими працюєм, запускає setInterval з іншою функцією яка елемети запускає на сайт та викликає функцію перевірку
	const deadLine = "2024-6-1";

	function getTime(endtime) {
		const t = Math.floor(Date.parse(endtime) - Date.parse(new Date())),
			days = Math.floor(t / (24 * 60 * 60 * 1000)),
			hours = Math.floor((t / (60 * 60 * 1000)) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function verification(num) {
		return num >= 0 && num < 10 ? `0${num}` : num;
	}

	function setClock(endtime) {
		const days = document.querySelector("#days"),
			hours = document.querySelector("#hours"),
			minutes = document.querySelector("#minutes"),
			seconds = document.querySelector("#seconds"),
			timerInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTime(endtime);

			if (t.total == 0) {
				clearInterval(timerInterval);
			}

			days.innerHTML = verification(t.days);
			hours.innerHTML = verification(t.hours);
			minutes.innerHTML = verification(t.minutes);
			seconds.innerHTML = verification(t.seconds);
		}
	}

	setClock(deadLine);

	// Modal
	const openModalBtns = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");

	function openModal() {
		modal.classList.add("show", "fadeIn");
		modal.classList.remove("hide", "fadeOut");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modal.classList.remove("show", "fadeIn");
		modal.classList.add("hide", "fadeOut");
		document.body.style.overflow = "";
	}

	openModalBtns.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});
	const modalTimerId = setInterval(openModal, 50000);
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
	// Class
	class MenuCard {
		constructor(src, alt, title, description, price, selector, ...clases) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.description = description;
			this.clases = clases;
			this.parent = document.querySelector(selector);
			this.price = price;
			this.dollar = 37.2;
			this.swapper();
		}
		swapper() {
			this.price = Math.floor(this.price * this.dollar);
		}
		create() {
			const element = document.createElement("div");
			if (this.clases.length == 0) {
				this.element = "menu__item";
				element.classList.add(this.element);
			} else {
				this.clases.forEach((clasName) => element.classList.add(clasName));
			}
			this.clases.forEach((clasName) => element.classList.add(clasName));
			element.innerHTML = `
      <img src="${this.src}" alt="${this.alt}" />
      <h3 class="menu__item-subtitle">${this.title}"</h3>
      <div class="menu__item-descr">
        ${this.description}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div> `;
			this.parent.append(element);
		}
	}
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высокимкачеством!',
		6.155913978494624,
		".menu .container",
		"menu__item",
		"big"
	).create();
	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		"Меню “Премиум”",
		"В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
		14.78,
		".menu .container",
		"menu__item"
	).create();
	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		"Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
		11.56,
		".menu .container",
		"menu__item"
	).create();

	// Forms

	const forms = document.querySelectorAll("form");

	forms.forEach((form) => {
		postInfo(form);
	});

	function postInfo(form) {
		const message = {
			loading: "img/form/spinner.svg",
			success: "Дяку! Ми скоро зв'яжемось з вами 💬",
			failed: "Щось пішло не-так...",
		};

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			// ----
			const status = document.createElement("img");
			status.src = message.loading;
			status.style.cssText = `
      display: block;
      margin: 0 auto
    `;
			form.insertAdjacentElement("afterend", status);
			// ----
			const formData = new FormData(form);
			const obj = {};
			formData.forEach((value, key) => {
				obj[key] = value;
			});

			//
			fetch("server.php", {
				method: "POST",
				headers: {
					"Content-type": "aplication/json",
				},
				body: JSON.stringify(obj),
			})
				.then((date) => date.text())
				.then((date) => {
					console.log(date);
					showThanksModal(message.success);
					status.remove();
				})
				.catch(() => {
					showThanksModal(message.failed);
				})
				.finally(() => {
					form.reset();
				});
			// ----
		});
	}

	// функція спінер
	function showThanksModal(message) {
		//
		const prevModal = document.querySelector(".modal__dialog");
		prevModal.classList.add("hide");
		openModal();
		//
		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">×</div>
      <div class="modal__title">${message}</div>
    </div>
  `;

		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModal.classList.add("show");
			prevModal.classList.remove("hide");
		}, 5000);
	}
	fetch("http://localhost:3000/menu")
		.then((date) => date.json())
		.then((res) => console.log(res));
});
