window.addEventListener("DOMContentLoaded", () => {
	class CookieConsent {
		constructor({ popup, btnConfirm, btnCnacel, activeClass = "" } = {}) {
			this.popup = document.querySelector(popup);
			this.btnConfirm = document.querySelector(btnConfirm);
			this.btnCancel = document.querySelector(btnCnacel);
			this.activeClass = activeClass;
			this.consentPropertyType = "site_consent";
		}
		getItem = (key) => {
			const cookies = document.cookie
				.split(";")
				.map((cookie) => cookie.split("="))
				.reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
			return cookies[key];
		};

		setItem = (key, value) => {
			document.cookie = `${key}=${value}`;
		};

		hasConsented = () => {
			return this.getItem(this.consentPropertyType) === "true" ? true : false;
		};

		changeStatus = (prop) => {
			this.setItem(this.consentPropertyType, prop);
			if (this.hasConsented()) {
				myScripts();
			}
		};

		bindTriggers = () => {
			this.btnConfirm.addEventListener("click", () => {
				this.hideStatus(true);
			});

			this.btnCancel.addEventListener("click", () => {
				this.hideStatus(false);
			});
		};

		hideStatus = (status) => {
			this.changeStatus(status);
			this.popup.classList.remove(this.activeClass);
		};

		init = () => {
			try {
				if (this.hasConsented()) {
					myScripts();
				} else {
					this.popup.classList.add(this.activeClass);
				}
				this.bindTriggers();
			} catch (e) {
				console.log("Не передані усі дані");
			}
		};
	}
	//
	new CookieConsent({
		popup: ".popup",
		btnConfirm: "[data-allow]",
		btnCnacel: "[data-cancel]",
		activeClass: "popup_active",
	}).init();

	function myScripts() {
		// Код який виконуєтся при пітверджені
		console.log("Loading...");
	}
});

// const cookieStorage = {
// 	getItem: (key) => {
// 		const cookies = document.cookie
// 			.split(";")
// 			.map((cookie) => cookie.split("="))
// 			.reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
// 		return cookies[key];
// 	},
// 	setItem: (key, value) => {
// 		document.cookie = `${key}=${value};expires=Sun, 16 March 2024 06:23:41 GMT`;
// 	},
// };

// const storageType = cookieStorage;
// const consentPropertyType = "site_consent";

// const hasConsented = () => (storageType.getItem(consentPropertyType) === "true" ? true : false);
// const toggleStorage = (value) => storageType.setItem(consentPropertyType, value);

// const popup = document.querySelector(".popup"),
// 	btnAllow = popup.querySelector("[data-allow]"),
// 	btnCancel = popup.querySelector("[data-cencel]");

// if (hasConsented()) {
// 	console.log("Loading...");
// } else {
// 	popup.classList.add("popup_active");
// }

// btnAllow.addEventListener("click", () => {
// 	toggleStorage(true);
// 	popup.classList.remove("popup_active");
// 	console.log("Loading...");
// });

// btnCancel.addEventListener("click", () => {
// 	toggleStorage(false);
// 	popup.classList.remove("popup_active");
// });
