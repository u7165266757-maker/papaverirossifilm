const navbar = document.getElementById("navbar");
function updateNavbar() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");

if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", () => mainMenu.classList.toggle("active"));
    mainMenu.querySelectorAll("a").forEach(link =>
        link.addEventListener("click", () => mainMenu.classList.remove("active"))
    );
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

const heroBackground = document.querySelector(".hero-background");

function updateHeroParallax() {
    if (
        !heroBackground ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    heroBackground.style.transform =
        `scale(1.05) translateY(${Math.min(window.scrollY * 0.12, 120)}px)`;
}

window.addEventListener("scroll", updateHeroParallax, { passive: true });
updateHeroParallax();

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const id = link.getAttribute("href");

        if (!id || id === "#") return;

        const target = document.querySelector(id);

        if (!target) return;

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

const trailer = document.getElementById("trailer");
const trailerPlay = document.getElementById("trailerPlay");

function startMainTrailer() {
    if (
        !trailer ||
        !trailerPlay ||
        trailer.dataset.started === "true"
    ) return;

    trailer.dataset.started = "true";

    const iframe = document.createElement("iframe");

    iframe.src =
        "https://www.youtube.com/embed/izSO8sYtEiI?autoplay=1&rel=0";

    iframe.title = "Papaveri Rossi - Trailer";
    iframe.frameBorder = "0";

    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen = true;

    trailer.innerHTML = "";
    trailer.appendChild(iframe);
}

if (trailerPlay) {
    trailerPlay.addEventListener("click", startMainTrailer);
}


// =====================================================
// INTERVISTE FACEBOOK
// ANTEPRIMA VISIBILE AUTOMATICAMENTE
// =====================================================

const interviewTrailers =
    document.querySelectorAll(".interview-trailer");


function createFacebookPlayer(wrapper, autoplay = false) {

    if (!wrapper) return;

    const videoUrl =
        wrapper.getAttribute("data-video-url");

    const poster =
        wrapper.querySelector(".interview-poster");

    if (
        !videoUrl ||
        !poster ||
        poster.querySelector("iframe")
    ) return;

    const iframe =
        document.createElement("iframe");

    iframe.src =
        `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&autoplay=${autoplay ? "true" : "false"}`;

    iframe.title =
        "Video intervista - Papaveri Rossi";

    iframe.frameBorder = "0";

    iframe.setAttribute("scrolling", "no");

    iframe.allow =
        "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";

    iframe.allowFullscreen = true;

    iframe.style.pointerEvents =
        autoplay ? "auto" : "none";

    poster.insertBefore(
        iframe,
        poster.firstChild
    );
}


function startInterviewVideo(wrapper) {

    if (
        !wrapper ||
        wrapper.dataset.started === "true"
    ) return;

    const videoUrl =
        wrapper.getAttribute("data-video-url");

    const poster =
        wrapper.querySelector(".interview-poster");

    if (!videoUrl || !poster) return;

    let iframe =
        poster.querySelector("iframe");

    if (!iframe) {
        createFacebookPlayer(wrapper, false);
        iframe = poster.querySelector("iframe");
    }

    if (!iframe) return;

    wrapper.dataset.started = "true";

    iframe.src =
        `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&autoplay=true`;

    iframe.style.pointerEvents = "auto";

    const button =
        poster.querySelector(".interview-play");

    if (button) {
        button.style.display = "none";
    }
}


// =====================================================
// CARICAMENTO AUTOMATICO DELLE ANTEPRIME
// =====================================================

interviewTrailers.forEach(wrapper => {

    // Carica subito il player Facebook
    // senza richiedere il click su "ANTEPRIMA".
    createFacebookPlayer(wrapper, false);

    const poster =
        wrapper.querySelector(".interview-poster");

    if (poster) {

        const img =
            poster.querySelector("img");

        const button =
            poster.querySelector(".interview-play");

        // Nasconde hero.jpg
        // lasciando visibile l'anteprima Facebook.
        if (img) {
            img.style.display = "none";
        }

        // Nasconde il pulsante ANTEPRIMA.
        if (button) {
            button.style.display = "none";
        }
    }
});
