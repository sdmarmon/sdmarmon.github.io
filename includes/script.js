// Function to fetch and include HTML content
function includeHTML(url, targetSelector) {
    fetch(url)
        .then(response => {
        return response.text();
        })
        .then(data => {
        document.querySelector(targetSelector).innerHTML = data;
        });
    }

  // Include the header
includeHTML("../includes/header.html", "header");

  // Include the footer
includeHTML("../includes/footer.html", "footer");