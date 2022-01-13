setTimeout(init,5000);

const callback = function (mutationList) {
    const ketAuto = document.getElementsByClassName('css-o6eaa5 aled');

    for(let mutation of mutationList) {
        if(ketAuto[0] === undefined) {
            init();
        }
    }
}
function init() {
    const orderForm = document?.getElementsByName('orderForm');
    const divBtn = orderForm[0]?.getElementsByClassName('css-4cffwv')[1];
    const buyLong = divBtn?.getElementsByTagName('button')[0];

    const ketAuto = generateBtn('Kétauto', "css-o6eaa5 aled");
    let interval

    divBtn?.insertBefore(ketAuto, buyLong);

    ketAuto.addEventListener('click', event => {
        event.preventDefault();

        if (!interval) {
            interval = setInterval(updatePrice,10);
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svg.setAttribute("viewBox", "0 0 512 512");
            path.setAttribute('d', "M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z");
            path.setAttribute("fill", "currentColor");
            svg.appendChild(path);
            svg.classList.add("theLoop");
            ketAuto.textContent = '';
            ketAuto.appendChild(svg);

        } else {
            clearInterval(interval);
            interval = null;
            ketAuto.firstElementChild.remove();
            ketAuto.textContent = 'Kétauto';
        }
    });

    const observer = new MutationObserver(callback);
    const option = {childList: true};
    observer.observe(document.body, option);
}

function updatePrice() {

    let currentPrice;
    let inputToUpdate;

    const form = document.forms[0];
    const inputPrice = form.firstElementChild.getElementsByTagName('input')[0];

    /**
     * IF POPUP FOR LIMIT OR MARKET
     */
    const closePopup = document?.getElementsByClassName('css-1nmmmhf')[0];
    const position = document.getElementsByName('position')[0];
    let divClosePopup;
    if(closePopup !== undefined) {
        divClosePopup = closePopup.getElementsByClassName('css-gnqbje')[0];
        inputToUpdate = divClosePopup.getElementsByTagName('input')[0];

    } else if(position !== undefined) {
        inputToUpdate = position.getElementsByClassName('css-1rw9s8f')[0]?.firstElementChild;
    }

    /**
     * IF SWITCH OR SUBHEADER
     */
    const subHeader = document.getElementsByName('subheader')[0];
    const switchHead = document.getElementsByName('switch')[0];
    if(subHeader !== undefined) {
        currentPrice = subHeader?.getElementsByClassName('draggableHandle')[0].textContent;
    } else if(switchHead !== undefined) {
        currentPrice = switchHead?.getElementsByClassName('showPrice')[0].textContent;

    }

    updateValue(inputToUpdate, currentPrice);
    updateValue(inputPrice, currentPrice);

}

function generateBtn(value, style) {
    const newButton = document.createElement('button');
    const content = document.createTextNode(value);
    newButton.className = style;
    newButton.appendChild(content);
    return newButton;
}

function updateValue(input, currentPrice) {
    if(input !== undefined) {
        input?.removeAttribute('value');
        input?.setAttribute('value', currentPrice.replaceAll(',', ''));
        input.value = currentPrice.replaceAll(',', '');
    }
}