setTimeout(init, 5000);
let isKetAuto = false;

/**
 * Observe if the textContent of the current price and if the user change the body
 * @function observe
 * @param {HTMLElement} target - Target that you want observe
 * @param {Object} options - the MutationObserver options
 */
function observe(target, options) {
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const ketAuto = document.getElementsByClassName("css-o6eaa5 aled")[0];
      if (mutation.type === "childList" && ketAuto === undefined) {
        isKetAuto = false;
        initNewBtn();
      }
      if (mutation.type === "characterData" && isKetAuto) {
        updatePrice();
      }
    });
  });
  observer.observe(target, options);
}

/**
 * Initialize the observer, and call the generate button function
 * @function init
 */
function init() {
  initNewBtn();
  observe(document.body, { childList: true });

  if (document.forms[0] !== undefined) {
    observe(document.forms[0], { childList: true });
  }
  observe(updatePrice(), {
    characterData: true,
    attributes: false,
    childList: false,
    subtree: true,
  });
}

/**
 * Generate the new button, add a eventListener to him
 * @function initNewBtn
 */
function initNewBtn() {
  const ketAuto = generateBtn("Kétauto", "css-o6eaa5 aled");
  const orderForm = document?.getElementsByName("orderForm");
  const divBtn = orderForm[0]?.getElementsByClassName("css-4cffwv")[1];
  const buyLong = divBtn?.getElementsByTagName("button")[0];
  const buyShort = divBtn?.getElementsByTagName("button")[1];

  if (buyLong && buyShort !== undefined) {
    buyLong.textContent = "Acheter";
    buyShort.textContent = "Vendre";
  }

  divBtn?.insertBefore(ketAuto, buyLong);

  ketAuto.addEventListener("click", (event) => {
    event.preventDefault();
    if (!isKetAuto) {
      isKetAuto = true;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      svg.setAttribute("viewBox", "0 0 512 512");
      path.setAttribute(
        "d",
        "M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"
      );
      path.setAttribute("fill", "currentColor");
      svg.appendChild(path);
      svg.classList.add("theLoop");
      ketAuto.textContent = "";
      ketAuto.appendChild(svg);
      updatePrice();
    } else {
      isKetAuto = false;
      ketAuto?.firstElementChild.remove();
      ketAuto.textContent = "Kétauto";
    }
  });
}

/**
 * get the good currentPrice and call the updateValue function
 * @function updatePrice
 * @return {HTMLElement} target
 */
function updatePrice() {
  let target;

  const form = document.forms[0];
  const lastPriceBtn =
    form.firstElementChild.getElementsByClassName("css-y0i1k0")[0];

  /**
   * IF SWITCH OR SUBHEADER
   */
  const subHeader = document.getElementsByName("subheader")[0];
  const switchHead = document.getElementsByName("switch")[0];
  if (subHeader !== undefined) {
    target = subHeader?.getElementsByClassName("draggableHandle")[0];
    updateValue(lastPriceBtn);
    return target;
  } else if (switchHead !== undefined) {
    target = switchHead?.getElementsByClassName("showPrice")[0];
    updateValue(lastPriceBtn);
    return target;
  }
}

/**
 * Create a new HTMLButtonElement
 * @function generateBtn
 * @param {String} value - Value of the button to be generated
 * @param {String} style - className of the button
 * @return {HTMLButtonElement}
 */
function generateBtn(value, style) {
  const newButton = document.createElement("button");
  const content = document.createTextNode(value);

  newButton.className = style;
  newButton.appendChild(content);

  return newButton;
}

/**
 * Trigger the last price button
 * @function updateValue
 * @param {HTMLElement} lastPriceBtn - The button last price for update the price.
 */
function updateValue(lastPriceBtn) {
  if (lastPriceBtn) {
    lastPriceBtn.click();
  }
}
