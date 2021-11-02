chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url);
        if(/^https:\/\/www\.notion/.test(current_tab_info.url)){
            chrome.tabs.executeScript(null, {file: './foreground.js'}, 
                () => console.log('i injected')
            );
        }
    });
});

chrome.browserAction.onClicked.addListener(()=>{
    chrome.runtime.openOptionsPage();
});

// first version, content script
// "content_scripts": [{
//     "matches": ["https://www.notion.so/*"],
//     "css": ["main.css"]
// }],