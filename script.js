const navbar = document.getElementById("navbar");

function updateNavbar() {
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();


const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");

if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", () => {
        mainMenu.classList.toggle("active");
    });

    mainMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainMenu.classList.remove("active");
        });
    });
}


const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
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


const heroBackground =
    document.querySelector(".hero-background");


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


document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const id =
            link.getAttribute("href");

        if (!id || id === "#") {
            return;
        }

        const target =
            document.querySelector(id);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// =====================================================
// TRAILER PRINCIPALE YOUTUBE
// =====================================================

const trailer =
    document.getElementById("trailer");

const trailerPlay =
    document.getElementById("trailerPlay");


function startMainTrailer() {

    if (
        !trailer ||
        !trailerPlay ||
        trailer.dataset.started === "true"
    ) {
        return;
    }

    trailer.dataset.started = "true";

    const iframe =
        document.createElement("iframe");

    iframe.src =
        "https://www.youtube.com/embed/izSO8sYtEiI?autoplay=1&rel=0";

    iframe.title =
        "Papaveri Rossi - Trailer";

    iframe.frameBorder = "0";

    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen = true;

    trailer.innerHTML = "";

    trailer.appendChild(iframe);
}


if (trailerPlay) {
    trailerPlay.addEventListener(
        "click",
        startMainTrailer
    );
}


// =====================================================
// INTERVISTE FACEBOOK
// ANTEPRIMA VISIBILE SUBITO
// PLAYER CARICATO SOLO AL CLICK
// =====================================================

const interviewTrailers =
    document.querySelectorAll(
        ".interview-trailer"
    );


function loadFacebookVideo(wrapper) {

    if (!wrapper) {
        return;
    }

    const videoUrl =
        wrapper.getAttribute(
            "data-video-url"
        );

    if (!videoUrl) {
        return;
    }


    // Evita di creare il player due volte
    if (
        wrapper.querySelector(
            ".facebook-video-player"
        )
    ) {
        return;
    }


    // Crea il player Facebook
    const iframe =
        document.createElement("iframe");


    iframe.className =
        "facebook-video-player";


    iframe.src =
        "https://www.facebook.com/plugins/video.php?href=" +
        encodeURIComponent(videoUrl) +
        "&show_text=false&autoplay=true";


    iframe.title =
        "Video intervista - Papaveri Rossi";


    iframe.frameBorder = "0";


    iframe.setAttribute(
        "scrolling",
        "no"
    );


    iframe.allow =
        "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";


    iframe.allowFullscreen = true;


    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.display = "block";
    iframe.style.border = "0";
    iframe.style.pointerEvents = "auto";


    // Rimuove l'anteprima dopo il click
    const poster =
        wrapper.querySelector(
            ".interview-poster"
        );

    if (poster) {
        poster.remove();
    }


    // Rimuove il pulsante ANTEPRIMA
    const playButton =
        wrapper.querySelector(
            ".interview-play"
        );

    if (playButton) {
        playButton.remove();
    }


    // Inserisce il player Facebook
    wrapper.appendChild(iframe);
}


// =====================================================
// CLICK SU ANTEPRIMA
// =====================================================

interviewTrailers.forEach(wrapper => {

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

            loadFacebookVideo(wrapper);

        }
    );

});
