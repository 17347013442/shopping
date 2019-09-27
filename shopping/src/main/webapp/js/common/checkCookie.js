setInterval(checkCookie, 3000);
function checkCookie() {
    var tooken = $.cookie("accessToken");
    if (!tooken) {
        window.location.href = $.url.webUrl + "web/sale/login/login.html?returnUrl=" + window.location.href;
    }
}
