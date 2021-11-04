let colSelector = {
    "gray": `*[style="color: rgb(120, 119, 116); fill: rgb(145, 145, 142);"]`,
    "brown": `*[style="color: rgb(159, 107, 83); fill: rgb(187, 132, 108);"]`,
    "orange": `*[style="color: rgb(217, 115, 13); fill: rgb(215, 129, 58);"]`,
    "yellow": `*[style="color: rgb(203, 145, 47); fill: rgb(203, 148, 51);"]`,
    "green": `*[style="color: rgb(68, 131, 97); fill: rgb(108, 155, 125);"]`,
    "blue": `*[style="color: rgb(51, 126, 169); fill: rgb(91, 151, 189);"]`,
    "purple": `*[style="color: rgb(144, 101, 176); fill: rgb(167, 130, 195);"]`,
    "pink": `*[style="color: rgb(193, 76, 138); fill: rgb(205, 116, 159);"]`,
    "red": `*[style="color: rgb(212, 76, 71); fill: rgb(225, 111, 100);"]`
}

chrome.tabs.onActivated.addListener(tab => {
    let tId = tab.tabId;
    chrome.tabs.get(tId, current_tab_info => {
        if(/^https:\/\/www\.notion/.test(current_tab_info.url)){

            for (const k in colSelector) {
                if (Object.hasOwnProperty.call(colSelector, k)) {
                    const sel = colSelector[k];
                    let color, css;
                    
                    chrome.storage.sync.get(k, res => {
                        color = res[k];
                        console.log(res, k, color);
                        
                        css = `${sel} { color: ${color} !important }`;
                        console.log(css);
                        chrome.tabs.insertCSS(null, {code: css});
                    })
                    
                    
                }
            }

        }
    });
});

chrome.browserAction.onClicked.addListener(()=>{
    chrome.runtime.openOptionsPage();
});