const MINUS = document.getElementById("minimize");
const CLOSE_APP = document.getElementById("close-app");
// const RESIZE = document.getElementById("resize");

MINUS.addEventListener("click", minimize);
CLOSE_APP.addEventListener("click", close_app);

function close_app () {
    app.window.close();
}

// function resize () {
//     // logic to resize
// }

function minimize () {
    app.window.minimize();
}