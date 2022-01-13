setTimeout(init,5000);
let isKetAuto = false;
function observe(target, options){
    let observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const ketAuto = document.getElementsByClassName('css-o6eaa5 aled')[0]
            if(mutation.type === "childList" && ketAuto === undefined) {
                isKetAuto = false;
                init();
            }
            if(mutation.type === 'characterData' && isKetAuto) {
                updatePrice();
            }
        });
    });
    observer.observe(target, options);
}

function init() {
    const orderForm = document?.getElementsByName('orderForm');
    const divBtn = orderForm[0]?.getElementsByClassName('css-4cffwv')[1];
    const buyLong = divBtn?.getElementsByTagName('button')[0];
    const buyShort = divBtn?.getElementsByTagName('button')[1];

    if(buyLong && buyShort !== undefined) {
        buyLong.textContent = "Acheter";
        buyShort.textContent = "Vendre";
    }
    const ketAuto = generateBtn('Kétauto', "css-o6eaa5 aled");

    divBtn?.insertBefore(ketAuto, buyLong);

    ketAuto.addEventListener('click', event => {
        event.preventDefault();
        if (!isKetAuto) {
            isKetAuto = true;
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            svg.setAttribute("viewBox", "0 0 512 512");
            path.setAttribute('d', "M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z");
            path.setAttribute("fill", "currentColor");
            svg.appendChild(path);
            svg.classList.add("theLoop");
            ketAuto.textContent = '';
            ketAuto.appendChild(svg);
            updatePrice();
        } else {
            isKetAuto = false;
            ketAuto?.firstElementChild.remove();
            ketAuto.textContent = 'Kétauto';
        }
    });

    observe(document.body, { childList: true });
    if (document.forms[0] !== undefined) {
        observe(document.forms[0], { childList: true });
    }
}

/**
 *
 */
function updatePrice() {
    let currentPrice;
    let target;

    const form = document.forms[0];
    const inputPrice = form.firstElementChild.getElementsByTagName('input')[0];

    /**
     * IF SWITCH OR SUBHEADER
     */
    const subHeader = document.getElementsByName('subheader')[0];
    const switchHead = document.getElementsByName('switch')[0];
    if(subHeader !== undefined) {
        target = subHeader?.getElementsByClassName('draggableHandle')[0];
        currentPrice = target.textContent;
        observe(target, {characterData: true, attributes: false, childList: false, subtree: true});

    } else if(switchHead !== undefined) {
        target = switchHead?.getElementsByClassName('showPrice')[0];
        currentPrice = target.textContent;
        observe(target, {characterData: true, attributes: false, childList: false, subtree: true});
    }
    updateValue(inputPrice, currentPrice);
}

/**
 * Create a new HTMLButtonElement
 * @param value - Value of the button to be generated
 * @param style - className of the button
 * @return {HTMLButtonElement}
 */
function generateBtn(value, style) {
    const newButton = document.createElement('button');
    const content = document.createTextNode(value);

    newButton.className = style;
    newButton.appendChild(content);

    return newButton;
}

/**
 * Remove the old value attribute and setup a new value
 * @param input - The input field that you want update
 * @param currentPrice - The new value of the input field
 */
function updateValue(input, currentPrice) {
    if(input !== undefined) {
        input?.removeAttribute('value');
        input?.setAttribute('value', currentPrice.replaceAll(',', ''));
        input.value = currentPrice.replaceAll(',', '');
    }
}