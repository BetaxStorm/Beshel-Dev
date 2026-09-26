"use strict";

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("main-navigation");

function setMenuOpen(isOpen) {
	if (!menuToggle || !navigation) return;

	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
	menuToggle.classList.toggle("is-open", isOpen);
	navigation.classList.toggle("is-open", isOpen);
}

if (menuToggle && navigation) {
	menuToggle.addEventListener("click", () => {
		setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
	});

	navigation.addEventListener("click", (event) => {
		if (event.target.closest("a")) setMenuOpen(false);
	});

	document.addEventListener("click", (event) => {
		if (
			menuToggle.getAttribute("aria-expanded") === "true" &&
			!navigation.contains(event.target) &&
			!menuToggle.contains(event.target)
		) {
			setMenuOpen(false);
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
			setMenuOpen(false);
			menuToggle.focus();
		}
	});

	window.addEventListener("resize", () => {
		if (window.innerWidth > 840) setMenuOpen(false);
	});
}

const revealItems = document.querySelectorAll(
	"#somos-Beshel-Dev, #nuestros-programas .carta, #caracteristicas, #contactanos, #RedesSociales"
);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
	revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealItems.forEach((item) => {
		item.classList.add("js-reveal");
		revealObserver.observe(item);
	});
}
