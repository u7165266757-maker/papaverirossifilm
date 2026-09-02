/* =========================================================
   PAPAVERI ROSSI
   JAVASCRIPT PRINCIPALE
   ========================================================= */


/* =========================================================
   NAVBAR DINAMICA
   ========================================================= */

const navbar = document.getElementById("navbar");


window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================================
   MENU MOBILE
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");

const mainMenu = document.getElementById("mainMenu");


menuToggle.addEventListener("click", function () {

    mainMenu.classList.toggle("active");

});



/* =========================================================
   CHIUSURA MENU MOBILE
   ========================================================= */

const menuLinks = document.querySelectorAll(".menu a");


menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mainMenu.classList.remove("active");

    });

});



/* =========================================================
   ANIMAZIONI DURANTE LO SCROLL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =========================================================
   CHIUSURA MENU QUANDO SI CLICCA FUORI
   ========================================================= */

document.addEventListener("click", function (event) {

    const clickedInsideMenu =
        mainMenu.contains(event.target);

    const clickedButton =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedButton
    ) {

        mainMenu.classList.remove("active");

    }

});



/* =========================================================
   EFFETTO PARALLASSE LEGGERO SULLA HERO
   ========================================================= */

const heroBackground =
    document.querySelector(".hero-background");


window.addEventListener("scroll", function () {

    if (!heroBackground) {
        return;
    }


    const scrollPosition = window.scrollY;


    if (scrollPosition < 700) {

        heroBackground.style.transform =
            `scale(1.03) translateY(${scrollPosition * 0.12}px)`;

    }

});



/* =========================================================
   SCROLL MORBIDO DEI LINK INTERNI
   ========================================================= */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");


        if (targetId === "#") {

            return;

        }


        /*
         * Il pulsante HERO del trailer viene gestito
         * separatamente più sotto.
         */

        if (link.id === "heroTrailerButton") {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});



/* =========================================================
   TRAILER YOUTUBE
   =========================================================

   All'inizio viene mostrata images/hero.jpg.

   Quando si clicca il pulsante:
   - viene caricata la pagina YouTube del trailer
   - il video viene avviato automaticamente
   - l'immagine viene sostituita dal video

   Trailer:
   https://youtu.be/izSO8sYtEiI
   ========================================================= */

const trailer =
    document.getElementById("trailer");


const trailerPoster =
    document.getElementById("trailerPoster");


const trailerPlay =
    document.getElementById("trailerPlay");


let trailerStarted = false;



function startTrailer() {

    if (trailerStarted) {

        return;

    }


    if (!trailer) {

        return;

    }


    trailerStarted = true;


    const iframe =
        document.createElement("iframe");


    iframe.src =
        "https://www.youtube.com/embed/izSO8sYtEiI?autoplay=1&rel=0";


    iframe.title =
        "Trailer Papaveri Rossi";


    iframe.frameBorder = "0";


    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


    iframe.allowFullscreen = true;


    trailer.innerHTML = "";


    trailer.appendChild(iframe);

}



/* =========================================================
   PULSANTE DENTRO LA COPERTINA DEL TRAILER
   ========================================================= */

if (trailerPlay) {

    trailerPlay.addEventListener("click", function () {

        startTrailer();

    });

}



/* =========================================================
   PULSANTE "GUARDA IL TRAILER" DELLA HERO
   =========================================================

   Cliccando questo pulsante:
   1. si scende alla sezione trailer
   2. il trailer viene avviato

   ========================================================= */

const heroTrailerButton =
    document.getElementById("heroTrailerButton");


if (heroTrailerButton) {

    heroTrailerButton.addEventListener("click", function (event) {

        event.preventDefault();


        if (trailer) {

            trailer.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


            /*
             * Aspettiamo un attimo per permettere
             * allo scroll di iniziare.
             */

            setTimeout(function () {

                startTrailer();

            }, 500);

        }

    });

}



/* =========================================================
   FINE JAVASCRIPT
   ========================================================= */
