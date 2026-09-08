const navbar = document.getElementById("navbar");

function updateNavbar() {

    if (navbar) {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    }

}

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();



/* =========================================================
   MENU MOBILE
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainMenu =
    document.getElementById("mainMenu");


if (menuToggle && mainMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            mainMenu.classList.toggle(
                "active"
            );

        }
    );


    mainMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

}



/* =========================================================
   ANIMAZIONI SCROLL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });

} else {

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}



/* =========================================================
   PARALLASSE HERO
   ========================================================= */

const heroBackground =
    document.querySelector(
        ".hero-background"
    );


function updateHeroParallax() {

    if (
        !heroBackground ||
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    heroBackground.style.transform =
        `scale(1.05) translateY(${Math.min(
            window.scrollY * 0.12,
            120
        )}px)`;

}


window.addEventListener(
    "scroll",
    updateHeroParallax,
    { passive: true }
);

updateHeroParallax();



/* =========================================================
   SCROLL MORBIDO
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const id =
                link.getAttribute(
                    "href"
                );


            if (
                !id ||
                id === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    id
                );


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }
    );

});



/* =========================================================
   TRAILER PRINCIPALE YOUTUBE
   ========================================================= */

const trailer =
    document.getElementById(
        "trailer"
    );


const trailerPlay =
    document.getElementById(
        "trailerPlay"
    );


function startMainTrailer() {

    if (
        !trailer ||
        !trailerPlay ||
        trailer.dataset.started === "true"
    ) {

        return;

    }


    trailer.dataset.started =
        "true";


    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.src =
        "https://www.youtube.com/embed/izSO8sYtEiI?autoplay=1&rel=0";


    iframe.title =
        "Papaveri Rossi - Trailer";


    iframe.frameBorder =
        "0";


    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


    iframe.allowFullscreen =
        true;


    trailer.innerHTML =
        "";


    trailer.appendChild(
        iframe
    );

}


if (trailerPlay) {

    trailerPlay.addEventListener(
        "click",
        startMainTrailer
    );

}



/* =========================================================
   INTERVISTE FACEBOOK
   =========================================================

   NON SERVE PIÙ JAVASCRIPT.

   I player Facebook sono già inseriti direttamente
   nell'HTML.

   Facebook quindi mostra immediatamente:
   - la propria thumbnail
   - il proprio pulsante Play
   - il player

   Quando l'utente clicca Play, è Facebook a gestire
   la riproduzione del video.
   ========================================================= */
