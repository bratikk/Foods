function tabs() {
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
}

module.exports = tabs;
