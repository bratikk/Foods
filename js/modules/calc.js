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
			if (
				elem.getAttribute("data-ratio") == localStorage.getItem("ratio")
			) {
				elem.classList.add(activeClass);
			}
		});
	}
	initLocalStorage("#gender div", "calculating__choose-item_active");
	initLocalStorage(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);

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
				(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) *
					ratio
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
					localStorage.setItem(
						"ratio",
						e.target.getAttribute("data-ratio")
					);
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
	getStaticInfo(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);
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

module.exports = calc;
