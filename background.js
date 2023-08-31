const youT = 'https://www.youtube.com';


//Qunado é inicializado a primeira vez
//chrome.runtime.onStartup.addListener(() => {        
//  chrome.action.setBadgeText({
//    text: 'OFF'
// });
//});

//Qunado é instalado a primeira vez
//chrome.runtime.onInstalled.addListener(() => {
//  chrome.action.setBadgeText({
//    text: 'OFF'
// });
//});


// Quando acessa uma página especifica
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.url.substring(0, 23) === youT) {
    // Ative automaticamente a extensão quando uma página do YouTube for acessada
    await chrome.action.setBadgeText({
      tabId: details.tabId,
      text: 'ON'
    });

    // Insire o arquivo CSS quando a extensão é ativada
    await chrome.scripting.insertCSS({
      files: ['focus-mode.css'],
      target: { tabId: details.tabId }
    });
  }
});


// Quando há o clique na extensão
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.substring(0, 23) == youT) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';
    


    // Add nome on/off
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    });

    if (nextState === 'ON') {
      // Insere css
      await chrome.scripting.insertCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id }
      });
    } else if (nextState === 'OFF') {
      // Remove css
      await chrome.scripting.removeCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id }
      });
    }
  }
  

 
});
