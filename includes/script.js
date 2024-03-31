function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

function scrollToProject(project) {
    setTimeout(() => {
        // window.location.href = `#${project}`;
        scrollToElement(project);
    }, 300);
};

function isOneColumnDisplay() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const breakpoint = 1024;
    return viewportWidth < breakpoint;
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

$(function(){
    $("#header").load("../includes/header.html");
    $("#footer").load("../includes/footer.html");
    $("#construction").load("../includes/construction.html");
});
