window.addEventListener("DOMContentLoaded", () => {
	class CookieConsent {
		constructor({ popup, btnAllow, btnCancel, activeClass = "" } = {}) {
			this.popup = document.querySelector(popup);
			this.btnAllow = document.querySelector(btnAllow);
			this.btnCancel = document.querySelector(btnCancel);
			this.activeClass = activeClass;
			this.consentPropertyType = "site_consent";
		}
		//
		getItem = (key) => {
			const cookie = document.cookie
				.split(";")
				.map((cookie) => cookie.split("="))
				.reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
			return cookie[key];
		};
		//
		setItem = (key, value) => {
			document.cookie = `${key}=${value}`;
		};
		//
		hasConsented = () => {
			return this.getItem(this.consentPropertyType) === "true";
		};
		//
		changeStatus = (status) => {
			this.setItem(this.consentPropertyType, status);
			if (this.hasConsented()) {
				myScripts();
			}
		};
		//
		bindTriggers = () => {
			this.btnAllow.addEventListener("click", () => {
				this.hidePopup(true);
				console.log("Loading...");
			});

			this.btnCancel.addEventListener("click", () => {
				this.hidePopup(false);
			});
		};
		//
		hidePopup = (status) => {
			this.changeStatus(status);
			this.popup.classList.remove("popup_active");
		};
		//
		init = () => {
			try {
				if (this.hasConsented()) {
					myScripts();
				} else {
					this.popup.classList.add(this.activeClass);
				}
				this.bindTriggers();
			} catch (e) {
				console.log(e);
			}
		};
	}

	function myScripts() {
		console.log("Loading...");
	}

	new CookieConsent({
		popup: ".popup",
		btnAllow: "[data-allow]",
		btnCancel: "[data-cancel]",
		activeClass: "popup_active",
	}).init();
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
