chrome.runtime.onInstalled.addListener(async () => {
  chrome.action.disable();
  await fetch("http://localhost:3000/api/order/add", {
    method: "post",
  })
    .then((res) => {
      chrome.notifications.create("NOTFICATION_ID", {
        type: "basic",
        iconUrl: "./assets/bitcoin.png",
        title: "Kétautomatique",
        message: "Votre historique de trade a été trouvé !",
        priority: 2,
      });
      chrome.action.enable();
    })
    .catch(() =>
      chrome.notifications.create("NOTFICATION_ID", {
        type: "basic",
        iconUrl: "./assets/bitcoin.png",
        title: "Kétautomatique",
        message:
          "Une erreur c'est produite lors de l'initialisation de votre historique... Veuillez réinstaller l'extension ou contacter le support !",
        priority: 2,
      })
    );
});
