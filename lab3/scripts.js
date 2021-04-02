document.querySelector("#mosaic > img").style.opacity = "0";

let mosaic = document.querySelector("#mosaic");
let parts = document.querySelectorAll("#mosaic > div");
let partsCount = Math.sqrt(parts.length);
let windowWidth = document.documentElement.clientWidth,
    windowHeight = document.documentElement.clientHeight;
let mosaicX = mosaic.offsetLeft,
    mosaicY = mosaic.offsetTop;
let partsWidth = parts[0].offsetWidth,
    partsHeight = parts[0].offsetHeight;

for(let i = 0; i < partsCount; i++) {
    for(let j = 0; j < partsCount; j++) {
        let index = i*partsCount + j;
        parts[index].style.backgroundPosition = `${-j * partsWidth}px ${-i * partsHeight}px`;
        parts[index].style.left = `${
                                        getRandomInt(
                                                        -1*(mosaicX >= 300 ? mosaicX - 300 : mosaicX),
                                                        -partsWidth + (windowWidth - (mosaicX + mosaic.offsetWidth) >= 300 ? mosaic.offsetWidth + 300 : mosaic.offsetWidth + (windowWidth - (mosaicX + mosaic.offsetWidth)))
                                                    )
                                    }px`;
        parts[index].style.top = `${
                                        getRandomInt(
                                                        -1*(mosaicY >= 300 ? mosaicY - 300 : mosaicY),
                                                        -partsHeight + (windowHeight - (mosaicY + mosaic.offsetHeight) >= 300 ? mosaic.offsetHeight + 300 : mosaic.offsetHeight + (windowHeight - (mosaicY + mosaic.offsetHeight)))
                                                    )
                                    }px`;
        setDragToElement(parts[index]);
    }
}

function setDragToElement(elmnt) {
    let coords = {
        x: Math.abs(+elmnt.style.backgroundPositionX.substr(0, elmnt.style.backgroundPositionX.length - 2)),
        y: Math.abs(+elmnt.style.backgroundPositionY.substr(0, elmnt.style.backgroundPositionY.length - 2)),
    };
    let offsetX = 0,
        offsetY = 0,
        x = 0,
        y = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        elmnt.style.zIndex = "2";
        x = e.clientX;
        y = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        let mosaicX = document.querySelector("#mosaic").offsetLeft,
            mosaicY = document.querySelector("#mosaic").offsetTop;
        offsetX = elmnt.offsetLeft - (x - e.clientX);
        offsetY = elmnt.offsetTop - (y - e.clientY);
        if(offsetX < -mosaicX) offsetX = -mosaicX;
        if(offsetY < -mosaicY) offsetY = -mosaicY;
        x = e.clientX;
        y = e.clientY;
        elmnt.style.top = offsetY + "px";
        elmnt.style.left = offsetX + "px";
    }

    function closeDragElement() {
        elmnt.style.zIndex = "1";
        if(Math.abs(coords.x - offsetX) <= 10 && Math.abs(coords.y - offsetY) <= 10) {
            elmnt.style.left = coords.x + "px";
            elmnt.style.top = coords.y + "px";
            elmnt.style.border = "none";
            elmnt.style.zIndex = "0";
            elmnt.onmousedown = null;
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

document.querySelector("#option > ul > li > a").onclick = function(e) {
    e.preventDefault();
}
function showOptions() {
    let menu = document.querySelector(".submenu");
    menu.classList.toggle("show");
}
document.querySelector(".topmenu").onclick = showOptions;

function toggleBackgroundImage(e) {
    e.preventDefault();
    let img = document.querySelector("#mosaic > img");
    if(img.style.opacity === "0") {
        img.style.opacity = "0.3";
    }
    else {
        img.style.opacity = "0";
    }
}
function assemblePuzzle(e) {
    e.preventDefault();

    function movePart(part, currentCoords, finalCoords, step, moveTime, moveTimeStep) {
        let timer = setInterval(move, moveTimeStep, part, currentCoords, step);
        setTimeout(stopTimer, moveTime, timer, part, finalCoords);

        function move(part, currentCoords, step) {
            currentCoords.x += step.x;
            currentCoords.y += step.y;
            part.style.left = Math.trunc(currentCoords.x) + 'px';
            part.style.top = Math.trunc(currentCoords.y) + 'px';
        }

        function stopTimer(timer, part, finalCoords) {
            clearInterval(timer);
            part.style.left = finalCoords.x + "px";
            part.style.top = finalCoords.y + "px";
            part.style.border = "none";
            part.style.zIndex = "0";
            part.onmousedown = null;
        }
    }

    let i = 0;
    for(let part of parts) {
        if(part.onmousedown === null) continue;
        let currentCoords,
            finalCoords,
            step;
        let moveTime = 500,
            moveTimeStep = 10;
        currentCoords = {
            x: +part.style.left.substr(0, part.style.left.length - 2),
            y: +part.style.top.substr(0, part.style.top.length - 2)
        }
        finalCoords = {
            x: Math.abs(+part.style.backgroundPositionX.substr(0, part.style.backgroundPositionX.length - 2)),
            y: Math.abs(+part.style.backgroundPositionY.substr(0, part.style.backgroundPositionY.length - 2)),
        };
        step = {
            x: (finalCoords.x - currentCoords.x),
            y: (finalCoords.y - currentCoords.y)
        }
        step.x /= moveTime;
        step.y /= moveTime;
        step.x *= moveTimeStep;
        step.y *= moveTimeStep;
        setTimeout(movePart, moveTime * i++, part, currentCoords, finalCoords, step, moveTime, moveTimeStep);
    }
}

let options = document.querySelectorAll(".submenu > li");
options[0].onclick = toggleBackgroundImage;
options[1].onclick = assemblePuzzle;