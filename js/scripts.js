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


if (contactForm && successMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (!contactForm.checkValidity()) {
            contactForm.classList.add("was-validated");
            return;
        }

        const errorMessage = document.getElementById("submitErrorMessage");
        const formData = new FormData(contactForm);

        fetch("https://formspree.io/f/xeajrykr", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                contactForm.reset();
                contactForm.style.display = "none";
                successMessage.classList.remove("d-none");
                successMessage.style.display = "block";
                successMessage.style.visibility = "visible";
                successMessage.style.opacity = "1";
            } else {
                if (errorMessage) errorMessage.classList.remove("d-none");
            }
        })
        .catch(() => {
            if (errorMessage) errorMessage.classList.remove("d-none");
        });

    });

}