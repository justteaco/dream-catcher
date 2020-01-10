function init() {

  //  DOM VARIABLES

  const grid = document.querySelector('.grid')

  const instructions = document.querySelector('.instructions')

  const startBtn = document.querySelector('.start')

  const audio = document.querySelector('#audio')

  const scoreDisplay = document.querySelector('.score')
  
  let squares = []



  // GAME VARIABLES

  const width = 11

  let snake = [2, 1]

  let direction = 'right'

  let speed = 600

  let score = 0

  let gameInPlay = false

  let apple = null

  let snakeStartVal = 1

  let timerId = null

  

  // FUNCTIONS

  function makeGrid() {
    instructions.style.display = 'none'
    Array(width * width).join('.').split('.').forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
      console.log(squares)
    })
  }

  function addSnake() {
    snake.map(item => squares[item].classList.add('snake'))
    squares[snake[0]].classList.add('head')
    console.log(`ADD SNAKE array: ${snake}`)
    snake.unshift()
    snake.splice(snakeStartVal)
    console.log(`ADD SNAKE apple eat ct = ${snakeStartVal}`)
  }

  function removeSnake() {
    squares.forEach(square => square.classList.remove('snake'))
    squares[snake[0]].classList.remove('head')
  }

  function addFood() {
    apple = Math.floor(Math.random() * (width * width))
    squares[apple].classList.add('food')
    if (squares[apple].classList.contains('snake')) {
      console.log('apple on snake')
      removeFood()
      addFood()
      console.log(`location of apple is ${apple}`)
    }
  }

  function eatFood() {
    if (snake[0] === apple) {
      snakeStartVal++
      score++
      speed -= 30
      removeFood()
      addFood()
      clearInterval(timerId)
      timerId = setInterval(snakeMove, speed)
      scoreDisplay.innerHTML = score
      audio.play()
      console.log(`EF apples eaten = ${snakeStartVal}`)
      console.log('eat food')
      console.log(`score is now ${score}`)
      console.log(`speed is now ${speed}`)
    }
  }

  function removeFood() {
    squares[apple].classList.remove('food')
  }

  function handleKeyDown(e) {
    
    switch (e.keyCode) {
      case 39: if (direction !== 'left') direction = 'right'
        break
      case 37: if (direction !== 'right') direction = 'left'
        break
      case 40: if (direction !== 'up') direction = 'down'
        break
      case 38: if (direction !== 'down') direction = 'up'
        break

      default:
        e.preventDefault()
        console.log('player shouldnt move')
    }
    console.log(direction)
  }

  function snakeMove() {
    console.log(`SM apples eaten ct = ${snakeStartVal}`)
    if (direction === 'right' && snake[0] % width < width - 1) {
      removeSnake()
      snake.unshift(snake[0] + 1)
      addSnake()
    } else if (direction === 'right' && snake[0] % width >= width - 1) {
      console.log('you died')
      killGame()
    }

    if (direction === 'left' && snake[0] % width > 0) {
      removeSnake()
      snake.unshift(snake[0] - 1)
      addSnake()
    } else if (direction === 'left' && snake[0] % width <= 0) {
      console.log('you died')
      killGame()
    }

    if (direction === 'down' && snake[0] + width < width * width) {
      removeSnake()
      snake.unshift(snake[0] + width)
      addSnake()
    } else if (direction === 'down' && snake[0] + width >= width * width) {
      console.log('you died')
      killGame()
    }

    if (direction === 'up' && snake[0] - width >= 0) {
      removeSnake()
      snake.unshift(snake[0] - width)
      addSnake()
    } else if (direction === 'up' && snake[0] - width < 0) {
      console.log('you died')
      killGame()
    }

    console.log(`Head of snake is at ${snake[0]}`)
    console.log(snake)

    eatFood()
    collision()
    console.log(`movement speed = ${speed}`)

  }

  function collision() {
    for (let i = 1; i < squares.length; i++)
      if (snake[0] === snake[i]) {
        killGame()
      }
  }

  function reset() {
    squares = []
    speed = 600
    score = 0
    gameInPlay = false
    apple = null
    snake = [2, 1]
    direction = 'right'
    snakeStartVal = 1
    scoreDisplay.innerHTML = ''
    clearInterval(timerId)
  }

  function killGame() {
    removeSnake()
    removeFood()
    grid.innerHTML = ''
    alert('still want to manifest?')
    reset()
    gameInPlay = false
    console.log(clearInterval)
    startGame()
  }

  function startGame() {
    if (!gameInPlay) {
      gameInPlay = true
      speed = 600
      timerId = setInterval(snakeMove, speed)
      makeGrid()
      addFood()
      addSnake()
      addEventListener('keydown', handleKeyDown)
      console.log(`startGame snake array = ${snake}`)
      console.log(`apples eaten ct = ${snakeStartVal}`)
      // score = score - score
    }
  }
    
  



  // EVENT HANDLERS

  startBtn.addEventListener('click', startGame)

}
window.addEventListener('DOMContentLoaded', init)