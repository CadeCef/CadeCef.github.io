// portfolioJS.js
// portfolioJS.js
document.addEventListener("DOMContentLoaded", () => {
    const sidebarImg = document.querySelector(".sidebar-img");
    if (sidebarImg) {
        sidebarImg.addEventListener("click", myFunction);
    }
});

function myFunction(event) {
    const x = event.clientX;
    const y = event.clientY;

    const img = document.createElement('img');
    img.src = "images.png";

    img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.width = '200px';
    img.style.height = '200px';
    img.style.zIndex = '9999';
    img.draggable = false;

    document.body.appendChild(img);
}