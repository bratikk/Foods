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

export default tabs;
