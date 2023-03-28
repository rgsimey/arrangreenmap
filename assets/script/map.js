window.onload = function() {
    var map = document.getElementById("map");
    var currentScale = 1.0;
    var zoomFactor = 1.2;
    var touchStartDistance = 0;
    var touchStartScale = 1.0;

    map.addEventListener("mousewheel", function(e) {
    var delta = e.wheelDelta ? e.wheelDelta : -e.detail;
    var newScale = currentScale;
    if (delta > 0) {
        newScale *= zoomFactor;
    } else {
        newScale /= zoomFactor;
    }
    map.setAttribute("transform", "scale(" + newScale + ")");
    currentScale = newScale;
    });

    map.addEventListener("touchstart", function(e) {
    if (e.touches.length == 2) {
        var touch1 = e.touches[0];
        var touch2 = e.touches[1];
        touchStartDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2));
        touchStartScale = currentScale;
    }
    });

    map.addEventListener("touchmove", function(e) {
    if (e.touches.length == 2) {
        var touch1 = e.touches[0];
        var touch2 = e.touches[1];
        var touchDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2));
        var newScale = (touchDistance / touchStartDistance) * touchStartScale;
        map.setAttribute("transform", "scale(" + newScale + ")");
        currentScale = newScale;
    }
    });

    var zoomInButton = document.getElementById("zoom-in");
    zoomInButton.addEventListener("click", function() {
    var newScale = currentScale * zoomFactor;
    map.setAttribute("transform", "scale(" + newScale + ")");
    currentScale = newScale;
    });

    var zoomOutButton = document.getElementById("zoom-out");
    zoomOutButton.addEventListener("click", function() {
    var newScale = currentScale / zoomFactor;
    map.setAttribute("transform", "scale(" + newScale + ")");
    currentScale = newScale;
    });
};
