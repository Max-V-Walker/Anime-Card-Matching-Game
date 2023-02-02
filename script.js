const playBtn = document.querySelector('#letsPlay')
const restartBtn = document.querySelector('#restart')
const difficultyForm = document.querySelector('#difficulty')
const formContainer = document.querySelector('#form-container')

const turnsContainer = document.querySelector('#turns-container')
const remainingTurns = document.querySelector('#turns')

const gameBoard = document.querySelector('.game-board')
const gameOver = document.querySelector('.game-lost')
const gameWon = document.querySelector('.game-won')

let cardArr = [
    {
        name: 'allMight',
        img: 'images/allMight.jpeg'
    },
    {
        name: 'itachiOfTheSharingan',
        img: 'images/itachiOfTheSharingan.jpeg'
    },
    {
        name: 'nagatoPain',
        img: 'images/nagatoPain.jpeg'
    },
    {
        name: 'tanjiro',
        img: 'images/tanjiro.jpeg'
    },
    {
        name: 'ultraInstinctGoku',
        img: 'images/ultraInstinctGoku.jpeg'
    },
    {
        name: 'majinVegeta',
        img: 'images/majinVegeta.jpeg'
    },
    {
        name: 'saitamaOnePunch',
        img: 'images/saitamaOnePunch.jpeg'
    },
    {
        name: 'todorokiShoto',
        img: 'images/todorokiShoto.jpeg'
    },
    {
        name: 'orochimaru',
        img: 'images/orochimaru.jpeg'
    },
    {
        name: 'gokuBlackRose',
        img: 'images/gokuBlackRose.jpeg'
    },
    {
        name: 'nezuko',
        img: 'images/nezuko.jpeg'
    },
    {
        name: 'yamiYugi',
        img: 'images/yamiYugi.jpeg'
    },
    {
        name: 'obitoTobi',
        img: 'images/obitoTobi.jpeg'
    },
    {
        name: 'kakashiGuyEating',
        img: 'images/kakashiGuyEating.jpeg'
    },
    {
        name: 'setoKaibaUltimate',
        img: 'images/setoKaibaUltimate.jpeg'
    },
    {
        name: 'obeliskTheTormentor',
        img: 'images/obeliskTheTormentor.jpeg'
    },
    {
        name: 'avatarAang',
        img: 'images/avatarAang.jpeg'
    },
    {
        name: 'uncleLuTen',
        img: 'images/uncleLuTen.jpeg'
    },
    {
        name: 'bakugouMyHero',
        img: 'images/bakugouMyHero.jpeg'
    },
    {
        name: 'narutoWomen',
        img: 'images/narutoWomen.jpeg'
    },
    {
        name: 'kisameHoshigaki',
        img: 'images/kisameHoshigaki.jpeg'
    },
    {
        name: 'avatarRoku',
        img: 'images/avatarRoku.jpeg'
    },
    {
        name: 'drunkenFistRockLee',
        img: 'images/drunkenFistRockLee.jpeg'
    },
    {
        name: 'yamiMarik',
        img: 'images/yamiMarik.jpeg'
    },
    {
        name: 'pervySage',
        img: 'images/pervySage.jpeg'
    },
    {
        name: 'messyHairAppa',
        img: 'images/messyHairAppa.jpeg'
    },
    {
        name: 'blueSpirit',
        img: 'images/blueSpirit.jpeg'
    }
]

cardArr = cardArr.sort(() => 0.5 - Math.random())

let turnsLeft
let gameCards = []
let doubleGameCards = []
let selectedCards = []
let selectedCardsId = []
let correctlyMatchedCards = []

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function selectGameSize() {
    const gameChallenge = difficultyForm.value

   if(gameChallenge === 'beginner'){
        gameCards = cardArr.slice(-6)
        turnsLeft = 10
        remainingTurns.innerHTML = `Remaining Guesses: ${turnsLeft}`

    } else if(gameChallenge === 'intermediate'){
        gameCards = cardArr.slice(-10)
        turnsLeft = 15
        remainingTurns.innerHTML = `Remaining Guesses: ${turnsLeft}`
    } else if(gameChallenge === 'difficult'){
        gameCards = cardArr.slice(-15)
        turnsLeft = 20
        remainingTurns.innerHTML = `Remaining Guesses: ${turnsLeft}`
    } else {
        location.reload()
    }

    for(let i = 0; i < gameCards.length; i++){
        doubleGameCards.push(gameCards[i])
    }

    doubleGameCards = doubleGameCards.sort(() => 0.5 - Math.random())

    return doubleGameCards
}

function loadGame(e) {
    e.preventDefault()
    selectGameSize()

    for(let i = 0; i < allSpan.length; i++){
        allSpan[i].removeAttribute('span-fun')
    }

    remainingTurns.style.display = 'block'

    for(let i = 0; i < doubleGameCards.length; i++){
        let card = document.createElement('img')
        card.setAttribute('src', 'images/downFacingCard.jpeg')
        card.setAttribute('data-id', i)
        card.setAttribute('class', 'gameImg')
        gameBoard.appendChild(card)
        card.addEventListener('click', flipCard)
    }

    gameBoard.style.display = "block"

    if(doubleGameCards.length > 20){
        gameBoard.style.maxWidth = '1500px'
    }
}

function flipCard() {

    let cardId = this.getAttribute('data-id')
    selectedCards.push(doubleGameCards[cardId].name)
    selectedCardsId.push(cardId)

    this.setAttribute('id', 'gameImg')
    this.setAttribute('src', doubleGameCards[cardId].img)

    if(selectedCards.length === 2){
        setTimeout(checkForMatch, 800)
    }
}

const checkForMatch = () => {
    
    let cards = document.querySelectorAll('img')
    const cardOneId = selectedCardsId[0]
    const cardTwoId = selectedCardsId[1]

    if(selectedCards[0] === selectedCards[1]){
        cards[cardOneId].removeAttribute('class')
        cards[cardTwoId].removeAttribute('class')

        cards[cardOneId].src = 'images/emptySpaceHolder.jpeg'
        cards[cardOneId].style.border = 'none'
        cards[cardTwoId].src = 'images/emptySpaceHolder.jpeg'
        cards[cardTwoId].style.border = 'none'

        correctlyMatchedCards.push(selectedCards)

        cards[cardOneId].removeEventListener("click", flipCard); 
        cards[cardTwoId].removeEventListener("click", flipCard);
    } else {
        cards[cardOneId].removeAttribute('id')
        cards[cardOneId].src = 'images/downFacingCard.jpeg'
        cards[cardTwoId].removeAttribute('id')
        cards[cardTwoId].src = 'images/downFacingCard.jpeg'
    }

    guessesLeft()

    selectedCards = []
    selectedCardsId = []

}

function guessesLeft() {

    if(selectedCards[0] !== selectedCards[1]){
        turnsLeft = turnsLeft - 1
        remainingTurns.innerHTML = `Remaining Guesses: ${turnsLeft}`
    }

    if(turnsLeft === 0){
        gameOver.style.display = 'block'
        setInterval(() => {
            gameOver.classList.toggle('end-game-banner')
        }, 400)
        gameBoard.style.display = 'none'
    } else if((turnsLeft > 0) && (gameCards.length === correctlyMatchedCards.length)){
        gameWon.style.display = 'block'
        setInterval(() => {
            gameWon.classList.toggle('end-game-banner')
        }, 400)
        gameBoard.style.display = 'none'
    }
    
    gameStarted = false
    playBtn.removeEventListener('click', selectGameSize)
    playBtn.removeEventListener('click', loadGame)
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Event Listeners

playBtn.addEventListener('click', selectGameSize)
playBtn.addEventListener('click', loadGame)

restartBtn.addEventListener('click', () => {
    location.reload()
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// CSS Functionality 

const difficultyContainer = document.querySelector('#difficulty-form')
const buttonsContainer = document.querySelector('#buttons-container')
const buttons = document.querySelectorAll('button')
const selectGameIntro = document.querySelector('#select-game')

function cssAdjustment(){
    if(gameBoard.style.display === 'block'){

        turnsContainer.style.display = 'inline-block'
        remainingTurns.style.display = 'inline-block'

        buttonsContainer.style.marginLeft = "0"

        selectGameIntro.innerHTML = 'Select Game Size:'
        selectGameIntro.removeAttribute('id')

        formContainer.style.marginTop = '0'
        formContainer.style.marginBottom = '.5rem'
        formContainer.style.marginRight = '0'
        formContainer.style.display = 'inline-block'
        
        formContainer.style.textAlign = 'left'
        formContainer.style.width = '20%'
        formContainer.style.maxWidth = '350px'
        formContainer.style.minWidth = '300px'
        formContainer.style.marginLeft = '3px'
        formContainer.style.padding = '1rem'
        formContainer.style.height = '4.8rem'

        difficultyForm.style.marginBottom = '-50px'
    }
}

// CSS Animations
const allSpan = document.querySelectorAll('span')
const landscapeChanges = document.querySelectorAll('.landscape-h3')

for(let i = 0; i < allSpan.length; i++){
    window.addEventListener('load', () => {
        setInterval(() => {
            allSpan[i].classList.toggle('span-fun')
        }, 400)
    })
}

for(let i = 1; i < allSpan.length; i+=2){
    window.addEventListener('load', () => {
        setInterval(() => {
            allSpan[i].classList.toggle('span-fun2')
        }, 400)
    })
}

for(let i = 0; i < allSpan.length; i+=2){
    window.addEventListener('load', () => {
        setTimeout(() => {
            setInterval(() => {
                allSpan[i].classList.toggle('span-fun2')
            }, 400)
        },400)
    })
}

window.addEventListener('load', () => {
    for(let i = 0; i < landscapeChanges.length; i++){
        setInterval(() => {
            landscapeChanges[i].classList.toggle('change')
        }, 500)
    }
})

playBtn.addEventListener('click', cssAdjustment)

window.addEventListener('load', () => {
    formContainer.style.transform = 'rotate(360deg)'
})

