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
export default timer;
