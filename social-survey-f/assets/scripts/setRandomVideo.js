var MAX_VIDEO_COUNT = 9;
var setRandomVideo = () => {
    var _a;
    const elVideo = document.querySelector(".video");
    const elVideoSrc = elVideo ? elVideo.querySelector("source") : null;
    const inc = 1;
    const storageKey = "video";
    let index = 0;
    if (window.localStorage) {
        const key = window.localStorage.getItem(storageKey);
        if (key) {
            index = +key;
        }
    }
    const videoCount = (_a = APP_CONFIG.videoCount) != null ? _a : MAX_VIDEO_COUNT;
    if (index < 0 || index >= videoCount || index >= MAX_VIDEO_COUNT) {
        index = inc;
    } else {
        index += inc;
    }
    if (elVideo && elVideoSrc) {
        elVideoSrc.setAttribute("src", `./assets/videos/video-${index}.mp4`);
        elVideo.load();
    }
    if (window.localStorage) {
        window.localStorage.setItem(storageKey, `${index}`);
    }
};
setRandomVideo();