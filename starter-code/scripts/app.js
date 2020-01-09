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
  let snake = [3, 2, 1]
  let direction = 'right'
  let speed = 600
  let score = 0
  let gameInPlay = false
  let apple = null
  let snakeStartVal = 2
  let timerId = null

  //variables for hi-score
  //

  // let move = null 

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

    console.log(`ADD SNAKE array: ${snake}`)
    snake.unshift()
    snake.splice(snakeStartVal)

    console.log(`ADD SNAKE apple eat ct = ${snakeStartVal}`)

  }

  function removeSnake() {
    squares.forEach(square => square.classList.remove('snake'))
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
      console.log('eat food')
      removeFood()
      // snake.splice(applesEatenCount)
      // snake.unshift(snake[0] + 1)
      snakeStartVal++
      console.log(`EF apples eaten = ${snakeStartVal}`)
      addFood()
      score++
      speed -= 30
      clearInterval(timerId)
      timerId = setInterval(snakeMove, speed)
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
    // snakeMove()
  }

  function snakeMove() {
    console.log(`SM apples eaten ct = ${snakeStartVal}`)
    if (direction === 'right' && snake[0] % width < width - 1) {
      removeSnake()
      // snake.pop()
      snake.unshift(snake[0] + 1)
      // snake.splice(applesEatenCount)
      // snake.unshift()
      addSnake()
    } else if (direction === 'right' && snake[0] % width >= width - 1) {
      console.log('you died')
      killGame()
    }

    if (direction === 'left' && snake[0] % width > 0) {
      removeSnake()
      // snake.pop()
      snake.unshift(snake[0] - 1)
      // snake.splice(applesEatenCount)
      // snake.unshift()
      addSnake()
    } else if (direction === 'left' && snake[0] % width <= 0) {
      console.log('you died')
      killGame()
    }

    if (direction === 'down' && snake[0] + width < width * width) {
      removeSnake()
      // snake.pop()
      snake.unshift(snake[0] + width)
      // snake.splice(applesEatenCount)
      // snake.unshift()
      addSnake()
    } else if (direction === 'down' && snake[0] + width >= width * width) {
      console.log('you died')
      killGame()
    }

    if (direction === 'up' && snake[0] - width >= 0) {
      removeSnake()
      // snake.pop()
      snake.unshift(snake[0] - width)
      // snake.splice(applesEatenCount)
      // snake.unshift()
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

  function killGame() {
    clearInterval()
    removeSnake()
    removeFood()
    grid.innerHTML = ''
    alert('you lost')
    reset()
  }

  function reset() {
    squares = []
    speed = 350
    score = 0
    gameInPlay = false
    apple = null
    snake = [2, 1, 0]
    direction = 'right'
    clearInterval(timerId)
  }

  function startGame() {
    if (!gameInPlay) {
      gameInPlay = true
      timerId = setInterval(snakeMove, speed)
      makeGrid()
      addFood()
      addSnake()
      console.log(`startGame snake array = ${snake}`)
      addEventListener('keydown', handleKeyDown)
      console.log(`apples eaten ct = ${snakeStartVal}`)
    }
  }



  // EVENT HANDLERS

  startBtn.addEventListener('click', startGame)



}
window.addEventListener('DOMContentLoaded', init)