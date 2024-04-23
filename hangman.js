const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['application', 'programming', 'interface', 'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd']
const wrongLetters = []

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>
    `).join('')}
`
    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You Won!'
        popup.style.display = 'flex'
    }
}

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 ** e.keyCode <=90) {
        const letter = e.key

        if (selectedWord.includes(letter))
        {
            if( !icorrectLetters.includes(letter)) {
                correctLetters.push(letter)
            }
        }
    }
})

displayWord()