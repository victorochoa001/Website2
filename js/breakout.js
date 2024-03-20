rulesBtn = document.getzelementById('rules-btn')
rulesBtn = document.getzelementById('rules')
closeBtn = document.getElementById('close-btn')



rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})