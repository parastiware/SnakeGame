import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5
const snakeBody = [{ x: 11, y: 11 }, ]
let newSegments = 0;
let headDirection = { x: 0, y: 0 }
export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    // store current movement direction for rendering head orientation
    if (inputDirection.x !== 0 || inputDirection.y !== 0) headDirection = { ...inputDirection }
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] }
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach((segment, index) => {
        if (index === 0) {
            const snakeHead = document.createElement('div')
            snakeHead.style.gridRowStart = segment.y
            snakeHead.style.gridColumnStart = segment.x
            snakeHead.classList.add('snakehead')
            // add direction class for styling eyes/tongue
            if (headDirection.x === 1) snakeHead.classList.add('dir-right')
            else if (headDirection.x === -1) snakeHead.classList.add('dir-left')
            else if (headDirection.y === -1) snakeHead.classList.add('dir-up')
            else if (headDirection.y === 1) snakeHead.classList.add('dir-down')

            // add eyes and tongue elements for consistent rendering
            const eyeL = document.createElement('span')
            eyeL.className = 'eye left'
            const eyeR = document.createElement('span')
            eyeR.className = 'eye right'
            const tongue = document.createElement('span')
            tongue.className = 'tongue'
            snakeHead.appendChild(eyeL)
            snakeHead.appendChild(eyeR)
            snakeHead.appendChild(tongue)
            gameBoard.appendChild(snakeHead)
        } else {
            const snakeElement = document.createElement('div')
            snakeElement.style.gridRowStart = segment.y
            snakeElement.style.gridColumnStart = segment.x
            snakeElement.classList.add('snake')
            gameBoard.appendChild(snakeElement)
        }
    })
}

export function expandSnake(amount) {
    newSegments += amount
}
export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0
}
export function getSnakeHead() {

    return snakeBody[0]
}

export function snakeIntersects() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}