
var list = {
        "gray":"rgb(159, 164, 169)",
        "brown":"rgb(212, 150, 117)",
        "orange":"rgb(217, 133, 56)",
        "yellow":"rgb(201, 145, 38)",
        "green":"rgb(113, 178, 131)",
        "blue":"rgb(102, 170, 218)",
        "purple":"rgb(176, 152, 217)",
        "pink":"rgb(223, 132, 209)",
        "red":"rgb(234, 135, 140)"
    };

document.addEventListener('DOMContentLoaded', ()=>{
    let col = document.querySelectorAll('.def-col'),
        upCol = document.querySelectorAll(`[form='sub-col']`);

    for (const k in col) {
        if (Object.hasOwnProperty.call(col, k)) {
            const e = col[k];
            let color = e.getAttribute('color'),
                hex = tinycolor(list[color]).toHexString();
            
            e.value = hex;
        }
    }

    for (const k in upCol) {
        if (Object.hasOwnProperty.call(upCol, k)) {
            const e = upCol[k];
            let col = e.getAttribute('name');
            chrome.storage.sync.get(col, res => {
                let val = tinycolor(list[col]).toHexString();
                if(e.value === '#000000' && res[col] === '#000000'){
                    e.value = val;
                }else {
                    e.value = res[col];
                }
            })
        }
    }
});

let appColor = new CustomEvent('appColor')

document.addEventListener('appColor', ()=>{
    let D = {},
        valArr = document.querySelectorAll(`[form='sub-col']`);
    
    for (const k in valArr) {
        if (Object.hasOwnProperty.call(valArr, k)) {
            const es = valArr[k];
            D[es.getAttribute('name')] = es.value;
        }
    }

    chrome.storage.sync.set(D, ()=>{
        notie.alert({
            type: 'success',
            text: 'Colori aggiornati',
            position: 'top'
        })
    })
});
document.getElementById('app-col').addEventListener('click',()=>{
    document.dispatchEvent(appColor);
})

document.getElementById('res-col').addEventListener('click',()=>{
    let D = {},
        val = document.querySelectorAll(`[form='sub-col']`);
    
    for (const k in val) {
        if (Object.hasOwnProperty.call(val, k)) {
            const e = val[k];
            let type = e.getAttribute('name');
            e.value = tinycolor(list[type]).toHexString();
            document.dispatchEvent(appColor);
        }
    }
})