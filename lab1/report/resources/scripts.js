function openPage(e) {
    e.preventDefault();
    document.querySelector('iframe').src = e.target.href;
}

let links = document.querySelectorAll('#sidebar a');
for(link of links) {
    link.onclick = openPage;
}