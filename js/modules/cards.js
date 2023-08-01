import { getResource } from "../services/services";

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

	getResource("http://localhost:3000/menu").then((date) => {
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
export default cards;
