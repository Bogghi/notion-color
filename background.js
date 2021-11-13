let S = {
    'lightColSelector': {
        "gray": `*[style="color: rgb(120, 119, 116); fill: rgb(145, 145, 142);"]`,
        "brown": `*[style="color: rgb(159, 107, 83); fill: rgb(187, 132, 108);"]`,
        "orange": `*[style="color: rgb(217, 115, 13); fill: rgb(215, 129, 58);"]`,
        "yellow": `*[style="color: rgb(203, 145, 47); fill: rgb(203, 148, 51);"]`,
        "green": `*[style="color: rgb(68, 131, 97); fill: rgb(108, 155, 125);"]`,
        "blue": `*[style="color: rgb(51, 126, 169); fill: rgb(91, 151, 189);"]`,
        "purple": `*[style="color: rgb(144, 101, 176); fill: rgb(167, 130, 195);"]`,
        "pink": `*[style="color: rgb(193, 76, 138); fill: rgb(205, 116, 159);"]`,
        "red": `*[style="color: rgb(212, 76, 71); fill: rgb(225, 111, 100);"]`
    },
    'darkColorSelector': {
        "gray": `*[style="color: rgb(159, 164, 169); fill: rgb(189, 195, 199);"]`,
        "brown": `*[style="color: rgb(212, 150, 117); fill: rgb(230, 186, 165);"]`,
        "orange": `*[style="color: rgb(217, 133, 56); fill: rgb(245, 182, 104);"]`,
        "yellow": `*[style="color: rgb(201, 145, 38); fill: rgb(233, 200, 135);"]`,
        "green": `*[style="color: rgb(113, 178, 131); fill: rgb(160, 206, 169);"]`,
        "blue": `*[style="color: rgb(102, 170, 218); fill: rgb(150, 200, 238);"]`,
        "purple": `*[style="color: rgb(176, 152, 217); fill: rgb(204, 186, 231);"]`,
        "pink": `*[style="color: rgb(223, 132, 209); fill: rgb(239, 173, 228);"]`,
        "red": `*[style="color: rgb(234, 135, 140); fill: rgb(242, 178, 179);"]`
    }      
}

chrome.tabs.onActivated.addListener(tab => { setColor(tab.tabId) });
chrome.tabs.onUpdated.addListener(tab => setColor(tab));


chrome.browserAction.onClicked.addListener(()=>{
    chrome.runtime.openOptionsPage();
});

var setColor = tabId => {
    chrome.tabs.get(tabId, current_tab_info => {
        if(/^https:\/\/www\.notion/.test(current_tab_info.url)){

            for (const k in S) {
                if (Object.hasOwnProperty.call(S, k)) {
                    const e = S[k];
                    applySelector(e);
                }
            }

        }
    });
}

var applySelector = (A)=>{
    for (const k in A) {
        if (Object.hasOwnProperty.call(A, k)) {
            const sel = A[k];
            let color, css;
            
            chrome.storage.sync.get(k, res => {
                color = res[k];
                
                css = `${sel} { color: ${color} !important }`;
                chrome.tabs.insertCSS(null, {code: css});
            })
            
            
        }
    }
}