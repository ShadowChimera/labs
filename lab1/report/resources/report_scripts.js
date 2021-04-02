function openPage(e) {
    if(!document.location.href.includes(e.target.value)) {
        document.location.href = e.target.value;
    }
}

const buttons = document.querySelectorAll('#control_buttons button');

for (let i = 0; i < buttons.length; i++) {
    if(buttons[i].style.fontWeight !== "bold") {
        buttons[i].style.fontWeight = "bold";
        buttons[i].style.minWidth = `${buttons[i].offsetWidth}px`;
        buttons[i].style.fontWeight = "normal";
    }
    
    buttons[i].addEventListener('click', openPage);
}