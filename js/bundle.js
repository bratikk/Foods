/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	// Calculator

	let result = document.querySelector(".calculating__result span");
	let gender, height, weight, age, ratio;

	if (localStorage.getItem("gender")) {
		gender = localStorage.getItem("gender");
	} else {
		gender = "female";
		localStorage.setItem("gender", "female");
	}

	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = 1.375;
		localStorage.setItem("ratio", 1.375);
	}
	//
	function initLocalStorage(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute("id") == localStorage.getItem("gender")) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
				elem.classList.add(activeClass);
			}
		});
	}
	initLocalStorage("#gender div", "calculating__choose-item_active");
	initLocalStorage(".calculating__choose_big div", "calculating__choose-item_active");

	//
	function calcTotal() {
		if (!gender || !height || !weight || !age || !ratio) {
			result.textContent = "___";
			return;
		}
		if (gender == "female") {
			result.textContent = Math.round(
				(447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * ratio
			);
		}
	}
	calcTotal();
	//
	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", e.target.getAttribute("data-ratio"));
				} else {
					gender = e.target.getAttribute("id");
					localStorage.setItem("gender", e.target.getAttribute("id"));
				}

				elements.forEach((elem) => elem.classList.remove(activeClass));
				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}
	getStaticInfo("#gender div", "calculating__choose-item_active");
	getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");
	//
	function getDunamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener("input", () => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid #ec0b0b";
			} else {
				input.style.border = "1px solid #54ed39";
			}

			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}

	getDunamicInfo("#height");
	getDunamicInfo("#weight");
	getDunamicInfo("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((date) => {
		date.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(img, altimg, title, descr, price, ".menu .container").create();
		});
	});

	// axios.get("http://localhost:3000/menu").then((data) => {
	// 	data.data.forEach(({ img, altimg, title, descr, price }) => {
	// 		new MenuCard(img, altimg, title, descr, price, ".menu .container").create();
	// 	});
	// });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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
			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postInfo)("http://localhost:3000/requests", json)
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
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimer); // Відкриваєм уже з новими даними
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
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
		}, 5000);
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);





/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// prettier-ignore
function slider({ container, slide , nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	// Слайдер

	const slider = document.querySelector(container), // container // Весь обгортка слайдера щоб повісити позишин релатів
		slidesWrapper = document.querySelector(wrapper), // Головна обгортка для слейдеру
		slidesFiled = document.querySelector(field), // Обгортка для всіх слайдерів
		slides = document.querySelectorAll(slide), // slide // Обгортка для картинок
		back = document.querySelector(prevArrow), // Кнопка назад
		next = document.querySelector(nextArrow), // Кнопка вперед
		total = document.querySelector(totalCounter), // Загальна кількість картинок/слайдерів
		current = document.querySelector(currentCounter), // Поточний слайдер
		width = getComputedStyle(slidesWrapper).width; // Ширина слайдера
	//
	let sliderIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${sliderIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = sliderIndex;
	}

	//
	slidesFiled.style.width = 100 * slides.length + "%";
	slidesFiled.style.display = "flex";
	slidesFiled.style.transition = "0.5s all";
	slidesWrapper.style.overflow = "hidden";
	slider.style.position = "relative";

	//
	next.addEventListener("click", () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
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
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
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

			offset = deleteNotDigits(width) * (slideTo - 1);
			slidesFiled.style.transform = `translateX(-${offset}px)`;

			updateInfoSlide();
		});
	});

	function updateInfoSlide() {
		if (slides.length < 10) {
			current.textContent = `0${sliderIndex}`;
		} else {
			current.textContent = sliderIndex;
		} //
		dots.forEach((dot) => (dot.style.opacity = "0.5"));
		dots[sliderIndex - 1].style.opacity = "1";
	}
	function deleteNotDigits(str) {
		let res = +str.replace(/\D/g, "");
		return res;
	}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	const tabs = document.querySelectorAll(tabsSelector),
		tabContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);
	// Ховаєм для початку контент
	function hideContent() {
		tabContent.forEach(
			(tab) => {
				tab.classList.add("hide");
				tab.classList.remove("show", "fade");
			},
			tabs.forEach((item) => {
				item.classList.remove(activeClass);
			})
		);
	}
	// Показуєм самий перший контент функція слжить перемикачом
	function showContent(i = 0) {
		tabContent[i].classList.add("show", "fade");
		tabContent[i].classList.remove("hide");
		tabs[i].classList.add(activeClass);
	}
	// Викликаєм функції
	hideContent();
	showContent();
	// Делегуваня для кліку та передачі індексу кнопки
	tabsParent.addEventListener("click", (e) => {
		if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (item == e.target) {
					hideContent();
					showContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
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
	function updateClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = document.querySelector("#days"),
			hours = document.querySelector("#hours"),
			minutes = document.querySelector("#minutes"),
			seconds = document.querySelector("#seconds"),
			timerUpdateFunction = setInterval(changeValues, 1000);

		changeValues();
		function changeValues() {
			const t = setClock(endTime);
			days.innerHTML = checkZero(t.days);
			hours.innerHTML = checkZero(t.hours);
			minutes.innerHTML = checkZero(t.minutes);
			seconds.innerHTML = checkZero(t.seconds);
		}
	}

	function checkZero(num) {
		return num >= 0 && num < 10 ? `0${num}` : num;
	}
	updateClock(id, deadline);

	// -----
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postInfo: () => (/* binding */ postInfo)
/* harmony export */ });
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
const getResource = async (url) => {
	const res = await fetch(url);
	//
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status ${res.status}`);
	}
	//
	return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener("DOMContentLoaded", () => {
	const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimer), 30000);

	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimer);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2024-03-24");
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimer);
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map