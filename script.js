import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    getSnakeHead,
    snakeIntersects

} from './snake.js'
import {
    update as updateFood,
    draw as drawFood,
    getCurrentScore
} from './food.js'

import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')
const scoreBoard = document.getElementById('score-board')

function main(currentTime) {
    if (gameOver) {
        if (confirm("You died. Press ok to Restart.")) {
            window.location = '/home.html'
        }
        return

    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime;

    update()
    draw()
}
window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    isGameOver()
}

function draw() {
    gameBoard.innerHTML = ''
    scoreBoard.innerHTML = getCurrentScore();
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function isGameOver() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersects()
}