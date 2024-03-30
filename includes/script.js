function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

$(function(){
    $("#header").load("../includes/header.html");
    $("#footer").load("../includes/footer.html");
    $("#construction").load("../includes/construction.html");
});