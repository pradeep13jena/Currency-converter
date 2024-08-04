URL = 'https://latest.currency-api.pages.dev/v1/currencies/'
const dropdowns = document.querySelectorAll(".selectDiv select")
const btn = document.querySelector('#btn')
const selectFrom = document.querySelector('#selectFrom')
const selectTo = document.querySelector('#selectTo')
const para = document.getElementById('finalOutput')
const input = document.querySelector('#amtInput')

for (const dropdown of dropdowns) {
    for (const currCode in countryList) {
        let newOPtion = document.createElement('option')
        newOPtion.innerText = currCode
        newOPtion.value = currCode
        if (dropdown.id === 'selectFrom' && currCode === 'USD') {
            newOPtion.selected = true
        } else if(dropdown.id === 'selectTo' && currCode === 'INR'){
            newOPtion.selected = true
        }
        dropdown.append(newOPtion)
    }

    dropdown.addEventListener('change', (evnt) => {
        updateFlag(evnt.target)
        
    })
}

const updateFlag = (element) => {
    let flagCountry = element.value
    let countryCode = countryList[flagCountry]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src = newSrc

    updateRate()
}

let updateRate = async () => {
    para.innerText = 1
    let amt = document.querySelector('input')
    let amtValue = amt.value
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1
    }
    let baseCurr = selectFrom.value.toLowerCase()
    let toCurr = selectTo.value.toLowerCase()
    newURL = `${URL}/${baseCurr}.json`
    let response = await fetch (newURL)
    let data = await response.json()
    let dataToPull = data[baseCurr][toCurr]
    
    let finalOutput = amtValue * dataToPull
    para.innerText = `${amtValue} ${baseCurr} = ${finalOutput.toFixed(2)} ${toCurr}`
    
    
}

input.addEventListener('input', (evt) => {
    evt.preventDefault()
    updateRate()
})

window.addEventListener('load', () => {
    updateRate()
})