let attempt = 3;
function submit(e) {
    function clearRedBorder(e) {
        e.target.style.borderColor = "";
        e.target.onfocus = null;
    }
    function setRedBorder(field) {
        field.style.borderColor = "red";
        field.onfocus = clearRedBorder;
    }

    if(attempt == 0) {
        alert("Регистрация заблокирована");
        return;
    }
    let dataCorrect = true;
    let form = e.target.form;
    let fields = form.querySelectorAll("input[type=text]");
    for(let field of fields) {
        if(!field.value.trim().length) {
            dataCorrect = false;
            setRedBorder(field);
        }
    }
    let nameReg = /^[A-ZА-Я][A-Za-zА-Яа-я]+$/;
    for(let i = 0; i < 2; i++) {
        if(!nameReg.test(fields[i].value.trim())) {
            dataCorrect = false;
            setRedBorder(fields[i]);
        }
    }
    let creditCardReg = /^4[0-9]{12}(?:[0-9]{3})?$|^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    if(fields[3].value.trim().length && !creditCardReg.test(fields[3].value.trim())) {
        dataCorrect = false;
        setRedBorder(fields[3]);
        alert("Неправильный номер карты.\nОсталось попыток: " + --attempt);

    }
    let phoneReg = /^(?:\+?\d{1,2}0)?0?\d{9}$/;
    if(!phoneReg.test(fields[4].value.trim())) {
        dataCorrect = false;
        setRedBorder(fields[4]);
    }
    let mailReg = /^[\.\-_A-Za-z0-9]+?@[\.\-A-Za-z0-9]+?\.[A-Za-z0-9]{2,6}$/;
    if(!mailReg.test(fields[5].value.trim())) {
        dataCorrect = false;
        setRedBorder(fields[5]);
    }
    if(!dataCorrect) e.preventDefault();
}

let sbmtBtns = document.querySelectorAll("input[type=submit]");
sbmtBtns[0].onclick = submit;
let rstBtn = document.querySelector("input[type=reset]");
rstBtn.onclick = function(e) {
    let form = e.target.form;
    let fields = form.querySelectorAll("input[type=text]");
    for(let field of fields) {
        field.style.borderColor = "";
        field.onfocus = null;
    }
};

function applyRegExp(e) {
    e.preventDefault();
    let form = e.target.form;
    let string = form.string.value;
    let pattern = form.pattern.value;
    if(!pattern.length) return;
    let regExp = new RegExp(pattern, 'g');
    let res = "",
        word = "";
    do {
        word = regExp.exec(string);
        if(word !== null) {
            res += `<li>${word[0]}</li>\n`
        }
    } while(word !== null);
    function replacer(match, p1, offset, string) {
        return "!" + p1 + "!";
    }
    let list = form.querySelector("ol");
    list.innerHTML = res;
    form.string.value = string.replace(/\ba([^a]*)a\b/g, replacer);
}

sbmtBtns[1].onclick = applyRegExp;
let pttrnField = document.getElementsByName("pattern")[0];
pttrnField.value = "\\ba([^a])*a\\b";
pttrnField.placeholder = "\\ba([^a])*a\\b";
let textField = document.getElementsByName("string")[0];
textField.value = "aba accca azzza wwwwa";
textField.placeholder = "aba accca azzza wwwwa"

// aba accca azzza wwwwa
// \ba[^a]*a\b