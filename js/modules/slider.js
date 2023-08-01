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
export default slider;
