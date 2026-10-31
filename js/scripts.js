/*!
* Start Bootstrap - Creative v7.0.7
* Copyright 2013-2023
* Licensed under MIT
*/

// ==========================================
// GENERAL
// ==========================================

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {

        const navbarCollapsible = document.body.querySelector('#mainNav');

        if (!navbarCollapsible) {
            return;
        }

        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }

    };

    // Shrink navbar
    navbarShrink();

    // Shrink navbar when scrolled
    document.addEventListener('scroll', navbarShrink);


    // Scrollspy
    const mainNav = document.body.querySelector('#mainNav');

    if (mainNav) {

        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });

    }


    // Collapse responsive navbar
    const navbarToggler = document.body.querySelector('.navbar-toggler');

    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.map(function (responsiveNavItem) {

        responsiveNavItem.addEventListener('click', () => {

            if (
                navbarToggler &&
                window.getComputedStyle(navbarToggler).display !== 'none'
            ) {
                navbarToggler.click();
            }

        });

    });


});


// ==========================================
// NAVBAR LOGO
// ==========================================

const navbarLogo = document.querySelector("#navbarLogo");
const wiseName = document.querySelector(".wise");
const hostName = document.querySelector(".host");
const navbarLinks = document.querySelectorAll(".navbar-section-link");


function updateNavbarLogo() {

    if (!navbarLogo) {
        return;
    }

    const isMobile = window.innerWidth < 992;
    const scrolled = window.scrollY > 50;


    if (isMobile || scrolled) {

        navbarLogo.src = "assets/logo/isologo-color.svg";

        if (wiseName) {
            wiseName.style.color = "#123B5D";
        }

        if (hostName) {
            hostName.style.color = "#3A9AF4";
        }

        navbarLinks.forEach(link => {
            link.style.color = "#123B5D";
        });

    } else {

        navbarLogo.src = "assets/logo/isologo-blanco.svg";

        if (wiseName) {
            wiseName.style.color = "#ffffff";
        }

        if (hostName) {
            hostName.style.color = "#ffffff";
        }

        navbarLinks.forEach(link => {
            link.style.color = "#ffffff";
        });

    }

}


window.addEventListener("scroll", updateNavbarLogo);
window.addEventListener("resize", updateNavbarLogo);

updateNavbarLogo();


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("submitSuccessMessage");
const phoneInput = document.getElementById("phone");


// Deja solo los dígitos y quita +54, el 9 de celular, el 0 y el 15
// (ej: "+54 9 11 4873-6162" o "011 15 4873-6162" → "1148736162")
function normalizarTelefono(valor) {
    let numero = valor.replace(/\D/g, "");

    if (numero.length > 11 && numero.startsWith("54")) {
        numero = numero.slice(2);
    }

    if (numero.length === 11 && numero.startsWith("9")) {
        numero = numero.slice(1);
    }

    if (numero.startsWith("0")) {
        numero = numero.slice(1);
    }

    // 15 después del código de área (2, 3 o 4 dígitos)
    if (numero.length === 12) {
        for (const largoArea of [2, 3, 4]) {
            if (numero.substr(largoArea, 2) === "15") {
                numero = numero.slice(0, largoArea) + numero.slice(largoArea + 2);
                break;
            }
        }
    }

    return numero;
}

// Válido: 10 dígitos con código de área (11, 2xx o 3xx)
function validarTelefono() {
    const numero = normalizarTelefono(phoneInput.value);
    const esValido = /^(11\d{8}|[23]\d{9})$/.test(numero);

    phoneInput.setCustomValidity(esValido ? "" : "Teléfono inválido");

    return numero;
}

if (phoneInput) {
    phoneInput.addEventListener("input", validarTelefono);
}


if (contactForm && successMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        const telefono = phoneInput ? validarTelefono() : "";

        if (!contactForm.checkValidity()) {
            contactForm.classList.add("was-validated");
            return;
        }

        // Enviar el número limpio
        if (phoneInput) {
            phoneInput.value = telefono;
        }

        const errorMessage = document.getElementById("submitErrorMessage");
        const submitButton = document.getElementById("submitButton");
        const formData = new FormData(contactForm);

        // Evitar envíos dobles
        if (submitButton.disabled) {
            return;
        }

        const submitButtonText = submitButton.textContent;

        const mostrarError = () => {
            submitButton.disabled = false;
            submitButton.textContent = submitButtonText;
            if (errorMessage) errorMessage.classList.remove("d-none");
        };

        if (errorMessage) errorMessage.classList.add("d-none");
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        fetch("https://formspree.io/f/xeajrykr", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                contactForm.reset();
                window.location.href = "gracias.html";
            } else {
                mostrarError();
            }
        })
        .catch(mostrarError);

    });

}