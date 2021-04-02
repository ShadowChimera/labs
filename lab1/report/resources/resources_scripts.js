let links = document.querySelectorAll('.topmenu > li > a');
for(let i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
        e.preventDefault();
    };
}
function setEvent(elements, type) {
    for(let i = 0; i < elements.length; i++) {
        elements[i].onclick = function(e) {
            e.preventDefault();
            let frame = document.querySelector('iframe');
            frame.onerror = function() {
                alert("error");
                frame.src = "../lab1/" + e.target.innerHTML + `.${type}`;
            }
            if(type === "html")
                frame.src = "html_resources/" + e.target.innerHTML + `.${type}`;
            else
                frame.src = e.target.innerHTML + `.${type}`;
        }
    }
}
setEvent(document.querySelectorAll('.html li > a'), "txt");
setEvent(document.querySelectorAll('.css li > a'), "css");
setEvent(document.querySelectorAll('.js li > a'), "js");