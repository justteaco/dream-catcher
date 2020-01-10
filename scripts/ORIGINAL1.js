function init() {
  //  dom variables
  const grid = document.querySelector('.grid')
  const squares = []
  const wall = []
  //timer, start button , score
  const startBtn = document.querySelector('.start')
  const timerDisplay = document.querySelector('.timer')
  const scoreDisplay = document.querySelector('.score')
  const stopBtn = document.querySelector('.stop')
  // let move = null 


  // game variables
  const width = 11
  
  const snake = [2, 1, 0]
  let direction = null
  let speed = 200
  //wall array 
  console.log(snake[0])
  let timeRemaining = 5
  let intervalId = null
  let score = 0
  let gameInPlay = false



  // build the grid first! 

  // loop as many times as width times the width to fill the grid
  Array(width * width).join('.').split('.').forEach(() => {
    // create 
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)


  })

  function makeGrid() {
    Array(width * width).join('.').split('.').forEach(() => {
      // create 
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })
  }


  //add the snake at the start of the game
  function addSnake() {
    snake.map(item => squares[item].classList.add('snake'))
  }
  addSnake()

  //remove the sname at the end of game 
  function removeSnake() {
    snake.map(item => squares[item].classList.remove('snake'))
  }

  //this adds food to grid 
  function addFood() {
    const eatApple = Math.floor(Math.random() * squares.length)
    squares[eatApple].classList.add('food')
  }
  addFood()

  function eatFood() {
    if (squares[snake[0]].classList.contains('food')) {
      console.log('eat food')
      squares[snake[0]].classList.remove('food')
      snake.unshift(snake[0] + 1)
      addFood()

      score += 1
      console.log(`score is now ${score}`)
      document.querySelector('.score').innerHTML = score
      // console.log('my score is going up')
    }

  }
  function removeFood() {
    squares[snake[0]].classList.remove('food')
  }
  removeFood()
  // places player at the starting position when grid has finished building

  //directions
  // squares[playerIndex].classList.add('player')

  function handleKeyDown(e) {
    // informs direction
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

    // callback from the interval
    function snakeMove() {
      if (direction === 'right' && snake[0] % width < width - 1) {
        removeSnake()
        // if snake hits a wall
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
        // if snake hits a wall
        snake.pop()
        snake.unshift(snake[0] + width)
        addSnake()
      } else if (direction === 'down' && snake[0] + width >= width * width) {
        console.log('you died')
        killGame()
      }
      
      if (direction === 'up' && snake[0] - width >= 0) {
        removeSnake()
        // if snake hits a wall
        snake.pop()
        snake.unshift(snake[0] - width)
        addSnake()
      } else if (direction === 'up' && snake[0] - width < 0) {
        console.log('you died')  
        killGame()      
      }
      eatFood()

      function killGame() {
        removeSnake()
        // clearInterval(speedy)
        grid.innerHTML = ''
        grid.innerHTML = '<p> You lost </p>'
        
      }
    }

    // function startButton(){
    //   if (!gameInPlay){
    //     move = setInterval(snakeMove, 400)
    //   } else {
    //     clearInterval(snakeMove, 400)
    //   }
    // makeGrid()
    // }

    //write a function that clears the grid, remove the snake, remove the food, set the snake array back to snake = [2, 1, 0] and

    let timerId = null

    // is it the first time the player 'plays'?
    if (!gameInPlay) {
      gameInPlay = true
      timerId = setInterval(snakeMove, speed)
    } else {
      clearInterval(timerId)
    }




  }

  // event handlers
  startBtn.addEventListener('click', startBtn)
  window.addEventListener('keydown', handleKeyDown)
}
window.addEventListener('DOMContentLoaded', init)



// if the player presses a key for the first time 
// then start the interval
// and start moving
// if it's not the first time
// then clear the previous intervals







