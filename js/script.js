document.getElementById("scrollBtn").addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: 'start' });


        history.pushState(null, "", `#${targetId}`);
    }
});