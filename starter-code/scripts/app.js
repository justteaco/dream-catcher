function init() {

  //  DOM VARIABLES

  const grid = document.querySelector('.grid')

  let squares = []



  // TIMER, START BUTTON, SCORE

  const startBtn = document.querySelector('.start')

  // const scoreDisplay = document.querySelector('.score')

  const stopBtn = document.querySelector('.stop')



  // GAME VARIABLES

  const width = 11

  const snake = [2, 1, 0]

  let timerId = null

  let direction = null

  let speed = 350

  let score = 0

  let gameInPlay = false

  let apple = null

  

  // FUNCTIONS

  function makeGrid() {
    Array(width * width).join('.').split('.').forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })
  }

  function addSnake() {
    snake.map(item => squares[item].classList.add('snake'))
  }

  function removeSnake() {
    snake.map(item => squares[item].classList.remove('snake'))
  }

  function addFood() {
    apple = Math.floor(Math.random() * (width * width))
    squares[apple].classList.add('food')
    console.log(`location of apple is ${apple}`)
  }

  function eatFood() {
    if (snake[0] === apple) {
      console.log('eat food')
      removeFood()
      snake.unshift(snake[0] + 1)
      addFood()
      score++
      speed -= 30
      console.log(`score is now ${score}`)
      console.log(`speed is now ${speed}`)
      document.querySelector('.score').innerHTML = score
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
        console.log('player shouldnt move')
    }
    console.log(direction)
    snakeMove()
  }

  function snakeMove() {
    if (direction === 'right' && snake[0] % width < width - 1) {
      removeSnake()
      snake.pop()
      snake.unshift(snake[0] + 1)
      addSnake()
    } else if (direction === 'right' && snake[0] % width >= width - 1) {
      console.log('you died')
      killGame()
    }

    if (direction === 'left' && snake[0] % width > 0) {
      removeSnake()
      snake.pop()
      snake.unshift(snake[0] - 1)
      addSnake()
    } else if (direction === 'left' && snake[0] % width <= 0) {
      console.log('you died')
      killGame()
    }

    if (direction === 'down' && snake[0] + width < width * width) {
      removeSnake()
      snake.pop()
      snake.unshift(snake[0] + width)
      addSnake()
    } else if (direction === 'down' && snake[0] + width >= width * width) {
      console.log('you died')
      killGame()
    }

    if (direction === 'up' && snake[0] - width >= 0) {
      removeSnake()
      snake.pop()
      snake.unshift(snake[0] - width)
      addSnake()
    } else if (direction === 'up' && snake[0] - width < 0) {
      console.log('you died')
      killGame()
    }

    console.log(`Head of snake is at ${snake[0]}`)
    console.log(snake)
    eatFood()

  }

  function killGame() {
    clearInterval(timerId)
    removeSnake()
    removeFood()
    grid.innerHTML = ''
    reset()
  }

  function reset() {
    squares = []
    timerId = null
    direction = null
    speed = 350
    score = 0
    gameInPlay = false
    apple = null
  }

  function startGame() {
    startBtn.innerHTML = 'Resume'
    startBtn.addEventListener('click', unPause)
    if (!gameInPlay) {
      gameInPlay = true
      timerId = setInterval(snakeMove, speed)
      makeGrid()
      addFood()
      addSnake()
      addEventListener('keydown', handleKeyDown)
    }
  }

  function stopGame() {
    clearInterval(timerId)
  }

  function unPause() {
    timerId = setInterval(snakeMove, speed)
  }



  // EVENT HANDLERS

  startBtn.addEventListener('click', startGame)
  stopBtn.addEventListener('click', stopGame)


}
window.addEventListener('DOMContentLoaded', init)