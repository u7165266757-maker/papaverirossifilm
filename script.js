// =====================================================
// INTERVISTE FACEBOOK
// ANTEPRIMA VISIBILE SUBITO
// PLAYER CARICATO SOLO AL CLICK
// =====================================================

const interviewTrailers =
    document.querySelectorAll(".interview-trailer");


function loadFacebookVideo(wrapper) {

    if (!wrapper) {
        return;
    }

    const videoUrl =
        wrapper.getAttribute("data-video-url");

    if (!videoUrl) {
        return;
    }

    /*
     * Evita di creare il player due volte.
     */
    if (wrapper.querySelector(".facebook-video-player")) {
        return;
    }


    /*
     * Creiamo il player Facebook.
     *
     * autoplay=1:
     * il video parte quando l'utente ha
     * appena cliccato ANTEPRIMA.
     */
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


    /*
     * Eliminiamo l'anteprima SOLO dopo
     * che l'utente ha cliccato.
     */
    const poster =
        wrapper.querySelector(".interview-poster");

    if (poster) {
        poster.remove();
    }


    /*
     * Eliminiamo il pulsante ANTEPRIMA.
     */
    const playButton =
        wrapper.querySelector(".interview-play");

    if (playButton) {
        playButton.remove();
    }


    /*
     * Inseriamo il player Facebook.
     */
    wrapper.appendChild(iframe);
}


// =====================================================
// CLICK SU "ANTEPRIMA"
// =====================================================

interviewTrailers.forEach(wrapper => {

    const playButton =
        wrapper.querySelector(".interview-play");


    if (!playButton) {
        return;
    }


    playButton.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        loadFacebookVideo(wrapper);

    });

});
