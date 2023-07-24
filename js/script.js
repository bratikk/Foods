window.addEventListener("DOMContentLoaded", () => {
	// Tabs
	// 1 - Перемикач картинки ✅
	// 2 - Таймер ✅
	// 3 - Модальне вікно ✅
	// 4 - Клас карточки ✅
	// 5 - Форма
	// 6 - Модальне вікно з повідомленям про статус

	// Перемикач картинки

	// Получаєм усі елементи для роботи
	const tabContent = document.querySelectorAll(".tabcontent"),
		tabs = document.querySelectorAll(".tabheader__item"),
		tabsParent = document.querySelector(".tabheader__items");
	// Ховаєм для початку контент
	function hideContent() {
		tabContent.forEach(
			(tab) => {
				tab.classList.add("hide");
				tab.classList.remove("show", "fade");
			},
			tabs.forEach((item) => {
				item.classList.remove("tabheader__item_active");
			})
		);
	}
	// Показуєм самий перший контент функція слжить перемикачом
	function showContent(i = 0) {
		tabContent[i].classList.add("show", "fade");
		tabContent[i].classList.remove("hide");
		tabs[i].classList.add("tabheader__item_active");
	}
	// Викликаєм функції
	hideContent();
	showContent();
	// Делегуваня для кліку та передачі індексу кнопки
	tabsParent.addEventListener("click", (e) => {
		if (e.target && e.target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (item == e.target) {
					hideContent();
					showContent(i);
				}
			});
		}
	});

	// -----

	// Таймер
	// Час доки має іти таймер
	const deadline = "2023-7-23";

	// Робим розрахунки
	function setClock(endTime) {
		const t = Math.floor(Date.parse(endTime) - Date.parse(new Date())),
			days = Math.floor(t / (24 * 60 * 60 * 1000)),
			hours = Math.floor((t / (60 * 60 * 1000)) % 24),
			minutes = Math.floor((t / 60 / 1000) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	// Получаєм елементи і вставляєм на сайт
	function updateClock(endTime) {
		const days = document.querySelector("#days"),
			hours = document.querySelector("#hours"),
			minutes = document.querySelector("#minutes"),
			seconds = document.querySelector("#seconds"),
			timerUpdateFunction = setInterval(changeValues, 1000);

		changeValues();
		function changeValues() {
			const t = setClock(endTime);
			days.innerHTML = chechZero(t.days);
			hours.innerHTML = chechZero(t.hours);
			minutes.innerHTML = chechZero(t.minutes);
			seconds.innerHTML = chechZero(t.seconds);
		}
	}

	function chechZero(num) {
		return num >= 0 && num < 10 ? `0${num}` : num;
	}
	updateClock(deadline);

	// -----

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
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
	//

	// -----

	// Карточки

	class MenuCard {
		//
		constructor(src, alt, title, description, price, selector, ...clases) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.description = description;
			this.price = price;
			this.clases = clases;
			this.parent = document.querySelector(selector);
			this.dollar = 37.2;
			this.swapper();
		}
		//
		swapper() {
			this.price = Math.floor(this.price * this.dollar);
		}
		//
		create() {
			const element = document.createElement("div");
			//
			if (this.clases.length == 0) {
				this.element = "menu__item";
				element.classList.add(this.element);
			} else {
				this.clases.forEach((className) => element.classList.add(className));
			}
			//
			element.innerHTML = `
			 <img src="${this.src}" alt="${this.alt}" />
			 <h3 class="menu__item-subtitle">${this.title}"</h3>
			 <div class="menu__item-descr"> ${this.description} </div>
			 <div class="menu__item-divider"></div>
			 <div class="menu__item-price">
			  <div class="menu__item-cost">Цена:</div>
			  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			 </div> `;
			this.parent.append(element);
		}
	}
	//
	const getResource = async (url) => {
		const res = await fetch(url);
		//
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}
		//
		return await res.json();
	};
	//
	// getResource("http://localhost:3000/menu").then((date) => {
	// 	date.forEach(({ img, altimg, title, descr, price }) => {
	// 		new MenuCard(img, altimg, title, descr, price, ".menu .container").create();
	// 	});
	// });
	axios.get("http://localhost:3000/menu").then((data) => {
		data.data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(img, altimg, title, descr, price, ".menu .container").create();
		});
	});

	// -----

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
					console.log(date);
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

	// -----

	// Нове модальне вікно з повідомленням

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

	// Слайдер

	const slider = document.querySelector(".offer__slider"), // Весь обгортка слайдера щоб повісити позишин релатів
		slidesWrapper = document.querySelector(".offer__slider-wrapper"), // Головна обгортка для слейдеру
		slidesFiled = document.querySelector(".offer_slider-inner"), // Обгортка для всіх слайдерів
		slides = document.querySelectorAll(".offer__slide"), // Обгортка для картинок
		back = document.querySelector(".offer__slider-prev"), // Кнопка назад
		next = document.querySelector(".offer__slider-next"), // Кнопка вперед
		total = document.querySelector("#total"), // Загальна кількість картинок/слайдерів
		current = document.querySelector("#current"), // Поточний слайдер
		width = getComputedStyle(slidesWrapper).width; // Ширина слайдера
	//
	let sliderIndex = 1;
	let offset = 0;

	current.textContent = chechZero(sliderIndex);
	total.textContent = chechZero(slides.length);
	//
	slidesFiled.style.width = 100 * slides.length + "%";
	slidesFiled.style.display = "flex";
	slidesFiled.style.transition = "0.5s all";
	slidesWrapper.style.overflow = "hidden";
	slider.style.position = "relative";

	//
	next.addEventListener("click", () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesFiled.style.transform = `translateX(-${offset}px)`;

		if (sliderIndex == slides.length) {
			sliderIndex = 1;
		} else {
			sliderIndex++;
		}

		updateInfoSlide();
	});

	back.addEventListener("click", () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesFiled.style.transform = `translateX(-${offset}px)`;

		if (sliderIndex == 1) {
			sliderIndex = slides.length;
		} else {
			sliderIndex--;
		}

		updateInfoSlide();
	});
	//

	const indicators = document.createElement("ol");
	const dots = [];
	indicators.classList.add("carousel-indicators");
	indicators.style.cssText = `
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 15;
	display: flex;
	justify-content: center;
	margin-right: 15%;
	margin-left: 15%;
	list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("dot-slide-to", i + 1);
		dot.style.cssText = `box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: 0.5;
		transition: opacity 0.6s ease;`;
		indicators.append(dot);

		if (i == 0) {
			dot.style.opacity = "1";
		}

		dots.push(dot);
	}
	//

	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			const target = e.target;
			const slideTo = target.getAttribute("dot-slide-to");

			sliderIndex = slideTo;

			offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			slidesFiled.style.transform = `translateX(-${offset}px)`;

			updateInfoSlide();
		});
	});

	function updateInfoSlide() {
		current.textContent = chechZero(sliderIndex);
		//
		dots.forEach((dot) => (dot.style.opacity = "0.5"));
		dots[sliderIndex - 1].style.opacity = "1";
	}
});
