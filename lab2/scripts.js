function openSubmenu(e) {
    const target = e.currentTarget;
    target.style.backgroundColor = "#50423d";
    const submenu = target.querySelector(".submenu");
    if(submenu){
        submenu.style.visibility = "visible";
    }
}
function closeSubmenu(e) {
    const target = e.currentTarget;
    target.style.backgroundColor = "transparent";
    const submenu = target.querySelector(".submenu");
    if(submenu){
        submenu.style.visibility = "hidden";
    }
}
function setSubmenuSelection(e) {
    const target = e.currentTarget;
    target.style.backgroundColor = "#c9bbae88";
}
function removeSubmenuSelection(e) {
    const target = e.currentTarget;
    target.style.backgroundColor = "transparent";
}

const topmenu = document.querySelectorAll(".topmenu > li");
for(let li of topmenu) {
    li.onmouseover = openSubmenu;
    // li.onclick = openSubmenu;
    li.onmouseout = closeSubmenu;
    const submenu = li.querySelectorAll(".submenu > li");
    for(let subLi of submenu){
        subLi.onmouseover = setSubmenuSelection;
        subLi.onmouseout = removeSubmenuSelection;
    }
}

function swapImages() {
    const imgs = document.querySelectorAll("img");
    let temp = imgs[0].src;
    imgs[0].src = imgs[1].src;
    imgs[1].src = temp;
}

document.querySelector("button").onclick = swapImages;