/* =========================================================
   PAPAVERI ROSSI
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.getElementById("siteHeader");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       TRAILER PRINCIPALE
       
       IMPORTANTE:
       Inserisci qui il vero URL del trailer quando lo hai.
    ===================================================== */

    const MAIN_TRAILER_URL = "";

    const trailerButton =
        document.getElementById("mainTrailerButton");

    const trailerMessage =
        document.getElementById("trailerMessage");


    if (trailerButton) {

        trailerButton.addEventListener("click", function () {

            if (MAIN_TRAILER_URL.trim() !== "") {

                window.open(
                    MAIN_TRAILER_URL,
                    "_blank",
                    "noopener,noreferrer"
                );

            } else {

                if (trailerMessage) {

                    trailerMessage.textContent =
                        "Il trailer sarà disponibile a breve.";

                }

            }

        });

    }


    /* =====================================================
       INTERVISTE FACEBOOK
    ===================================================== */

    const videoButtons =
        document.querySelectorAll(".load-facebook-video");


    videoButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const videoUrl =
                button.getAttribute("data-video");

            if (!videoUrl) return;


            const videoContainer =
                button.closest(".interview-video");

            if (!videoContainer) return;


            /*
             * Evitiamo di creare due iframe
             * nello stesso riquadro.
             */

            if (videoContainer.querySelector("iframe")) {
                return;
            }


            const iframe =
                document.createElement("iframe");


            iframe.src =
                "https://www.facebook.com/plugins/video.php" +
                "?href=" +
                encodeURIComponent(videoUrl) +
                "&show_text=false" +
                "&autoplay=true";


            iframe.setAttribute(
                "allow",
                "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            );

            iframe.setAttribute(
                "allowfullscreen",
                "true"
            );

            iframe.setAttribute(
                "title",
                "Video intervista Papaveri Rossi"
            );


            const placeholder =
                videoContainer.querySelector(".video-placeholder");

            if (placeholder) {
                placeholder.style.display = "none";
            }

            button.style.display = "none";

            videoContainer.appendChild(iframe);

        });

    });


    /* =====================================================
       SCROLL MORBIDO
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       CONTROLLO IMMAGINI
       
       Se un'immagine non viene trovata, mostriamo
       comunque un fondo leggibile invece di rompere
       la pagina.
    ===================================================== */

    document.querySelectorAll("img").forEach(function (image) {

        image.addEventListener("error", function () {

            image.classList.add("image-error");

            console.warn(
                "Immagine non trovata:",
                image.getAttribute("src")
            );

        });

    });


    /* =====================================================
       FINE
    ===================================================== */

});
