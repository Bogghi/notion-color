
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
    let col = document.querySelectorAll('.def-col');

    for (const k in col) {
        if (Object.hasOwnProperty.call(col, k)) {
            const e = col[k];
            let color = e.getAttribute('color'),
                hex = tinycolor(list[color]).toHexString();
            console.log(color, list[color], hex);
            e.value = hex;
        }
    }

    document.getElementById('app-col').addEventListener('click', ()=>{
        let D = {},
            valArr = document.querySelectorAll(`[form='sub-col']`);
        
        for (const k in valArr) {
            if (Object.hasOwnProperty.call(valArr, k)) {
                const es = valArr[k];
                D[es.getAttribute('name')] = es.value;
            }
        }

        chrome.storage.local.set(D, ()=>{
            console.log('storage set to: ', D);
        })
    });
});