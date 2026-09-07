// =========================================================
// PAPAVERI ROSSI
// JAVASCRIPT PRINCIPALE
// =========================================================


// =========================================================
// PAGINA PRONTA
// =========================================================

document.documentElement.classList.remove("no-js");


// =========================================================
// ANIMAZIONI SCROLL
// =========================================================
//
// Le sezioni .reveal partono invisibili.
// Quando entrano nello schermo viene aggiunta .visible.
//
// Se IntersectionObserver non fosse disponibile,
// rendiamo comunque tutto visibile.
// =========================================================

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


// =========================================================
// NAVBAR
// =========================================================

const navbar =
    document.getElementById("navbar");


function updateNavbar() {

    if (!navbar) {
        return;
    }


    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


updateNavbar();


// =========================================================
// MENU MOBILE
// =========================================================

const menuToggle =
    document.getElementById("menuToggle");

const mainMenu =
    document.getElementById("mainMenu");


function closeMobileMenu() {

    if (!mainMenu || !menuToggle) {
        return;
    }


    mainMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


if (menuToggle && mainMenu) {


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainMenu.classList.toggle(
                    "active"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    mainMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


// =========================================================
// CHIUSURA MENU CON ESC
// =========================================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


// =========================================================
// CHIUSURA MENU QUANDO SI TORNA DESKTOP
// =========================================================

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 700) {

            closeMobileMenu();

        }

    }
);


// =========================================================
// TRAILER PRINCIPALE
// =========================================================
//
// ATTENZIONE:
//
// Qui puoi inserire l'URL del trailer vero.
//
// Esempio:
//
// const MAIN_TRAILER_URL =
//     "https://www.facebook.com/...";
// 
// Per ora il trailer principale mostra la copertina.
// =========================================================

const MAIN_TRAILER_URL = "";

const mainTrailer =
    document.querySelector(".main-trailer");


if (mainTrailer) {

    mainTrailer.addEventListener(
        "click",
        () => {

            if (!MAIN_TRAILER_URL) {

                console.info(
                    "Papaveri Rossi: inserisci l'URL del trailer nella costante MAIN_TRAILER_URL."
                );

                return;

            }


            loadFacebookVideo(
                mainTrailer,
                MAIN_TRAILER_URL,
                "Trailer - Papaveri Rossi"
            );

        }
    );

}


// =========================================================
// FUNZIONE PLAYER FACEBOOK
// =========================================================

function loadFacebookVideo(
    wrapper,
    videoUrl,
    title = "Video - Papaveri Rossi"
) {

    if (!wrapper || !videoUrl) {
        return;
    }


    // Evita duplicazioni
    if (
        wrapper.querySelector(
            ".facebook-video-player"
        )
    ) {

        return;

    }


    const iframe =
        document.createElement("iframe");


    iframe.className =
        "facebook-video-player";


    iframe.src =
        "https://www.facebook.com/plugins/video.php?href=" +
        encodeURIComponent(videoUrl) +
        "&show_text=false&autoplay=true";


    iframe.title = title;


    iframe.frameBorder = "0";


    iframe.setAttribute(
        "scrolling",
        "no"
    );


    iframe.setAttribute(
        "allowfullscreen",
        "true"
    );


    iframe.allow =
        "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";


    iframe.style.width = "100%";

    iframe.style.height = "100%";

    iframe.style.display = "block";

    iframe.style.border = "0";


    // Rimuove la copertina
    const poster =
        wrapper.querySelector(
            ".trailer-poster"
        );


    if (poster) {
        poster.remove();
    }


    wrapper.appendChild(
        iframe
    );

}


// =========================================================
// VIDEO INTERVISTE FACEBOOK
// =========================================================

const interviewTrailers =
    document.querySelectorAll(
        ".interview-trailer"
    );


interviewTrailers.forEach(
    wrapper => {

        const playButton =
            wrapper.querySelector(
                ".interview-play"
            );


        if (!playButton) {
            return;
        }


        playButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                const videoUrl =
                    wrapper.getAttribute(
                        "data-video-url"
                    );


                if (!videoUrl) {

                    console.warn(
                        "Video Facebook mancante."
                    );

                    return;

                }


                loadFacebookVideo(
                    wrapper,
                    videoUrl,
                    "Intervista - Papaveri Rossi"
                );

            }
        );

    }
);


// =========================================================
// LINK INTERNI
// =========================================================
//
// Piccolo effetto di sicurezza per i link #...
// =========================================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
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


// =========================================================
// CARICAMENTO PAGINA
// =========================================================
//
// Se una sezione è già visibile al caricamento,
// la rendiamo immediatamente visibile.
// =========================================================

window.addEventListener(
    "load",
    () => {

        revealElements.forEach(
            element => {

                const rect =
                    element.getBoundingClientRect();


                if (
                    rect.top <
                    window.innerHeight * 0.95
                ) {

                    element.classList.add(
                        "visible"
                    );

                }

            }
        );

    }
);
