window.onload = function () {
    var SECONDS_TO_DISPLAY = 1;
    var CLASS_TO_DISPLAY = ".btn_cta";
    var attempts = 0;
    var elsHiddenList = [];
    var elsDisplayed = false;
    var elsHidden = document.querySelectorAll(CLASS_TO_DISPLAY);
    var alreadyElsDisplayed = localStorage.getItem('alreadyElsDisplayed');

    setTimeout(function () { elsHiddenList = Array.prototype.slice.call(elsHidden); }, 0);

    var showHiddenElements = function () {
        elsDisplayed = true;
        elsHiddenList.forEach((e) => e.style.display = "initial");
        localStorage.setItem('alreadyElsDisplayed', true)
    }

    var startWatchVideoProgress = function () {
        if (typeof smartplayer === 'undefined' || !(smartplayer.instances && smartplayer.instances.length)) {
            if (attempts >= 10) return;
            attempts += 1;
            return setTimeout(function () { startWatchVideoProgress() }, 1000);
        }

        smartplayer.instances[0].on('timeupdate', () => {
            if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
            if (smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY) return;
            showHiddenElements();
        })
    }

    if (alreadyElsDisplayed === 'true') {
        setTimeout(function () { showHiddenElements(); }, 100);
    } else {
        startWatchVideoProgress()
    }
}