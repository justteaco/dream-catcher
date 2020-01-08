function init() {
  //  dom variables
  const grid = document.querySelector('.grid')
  const squares = []
  // const wall = []
  //timer, start button , score
  const startBtn = document.querySelector('.start')
  // const timerDisplay = document.querySelector('.timer')
  // const scoreDisplay = document.querySelector('.score')
  
  const stopBtn = document.querySelector('.stop')
  // game variables
  const width = 11
  const snake = [2, 1, 0]
  let direction = null
  const speed = 200
  console.log(snake[0])
  
  // let timeRemaining = 5
  
  let intervalId = null
  let score = 0
  let gameInPlay = false
  let running = null 
  let wall = null 
  let speedy = null 



  // build the grid first! 

  // loop as many times as width times the width to fill the grid
  function createGrid() {
    Array(width * width).join('.').split('.').forEach(() => {
      // create 
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })
  }
  

  function startGame() {
    if (!running) {
      createGrid()
      addFood()
      addSnake()
      speedy = 400

      intervalId = setInterval(snakeMove, speed)
      console.log('still running')
      running = true 
    } else {
      running = false 
    }  
    
  }
  startGame()
  console.log(squares)

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
      clearInterval(intervalId)
      speedy = speedy - 10
      intervalId = setInterval(snakeMove, speedy)
      addFood()

      score += 1
      console.log(`score is now ${score}`)
      document.querySelector('.score').innerHTML = score
      // console.log('my score is going up')
    }

  }
  // places player at the starting position when grid has finished building

  //directions
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

   
  
    function moveRight() {
      removeSnake()
      // if snake hits a wall
      snake.pop()
      console.log(snake, 'pre-unshift')
      snake.unshift(snake[0] + 1)
      addSnake()
      
    }

    function moveLeft() {
      removeSnake()
      snake.pop()
      snake.unshift(snake[0] - 1)
      addSnake()
        
    }

    function moveUp(){
      removeSnake()
      // if snake hits a wall
      snake.pop()
      snake.unshift(snake[0] - width)
      addSnake()
        
    }

    function moveDown() {
      removeSnake()
      // if snake hits a wall
      snake.pop()
      snake.unshift(snake[0] + width)
      addSnake()
        
    }
    //wall array 
    //in order to make it stop add intervals condtions
    //then add to each function
    //create wall array 
    //classlist.wall clear interval 

    let timerId = null

    // is it the first time the player 'plays'?
    if (!gameInPlay) {
      gameInPlay = true
      // timerId = setInterval(snakeMove, speed)
    } else {
      clearInterval(timerId)
    }
  }
  
  function collision() {
    for (var i = 1; i < squares.length; i++)
      if (snake[0] === snake[i]) {
        endGame()
      }
  }
  

  function endGame() {
    if (!wall) {
      gameInPlay = false 
      clearInterval()
      snake[0,1,2]
      direction = 'right'
      score = 0 
      document.querySelector('.score')
      alert('game over')
    }

  }
  
  // event handlers
  window.addEventListener('keydown', handleKeyDown)
  // window.addEventListener('keydown', snakeMove)
}

window.addEventListener('DOMContentLoaded', init)


// if the player presses a key for the first time 
// then start the interval
// and start moving
// if it's not the first time
// then clear the previous intervals







