import { onSnake } from "./snake.js";
import { getCurrentFoodPosition as getFoodPosition } from "./food.js";
let score = 0;
export function update() {
    var currentFoodPosition = getFoodPosition()
    if (onSnake(currentFoodPosition)) {
        score++;
    }
    return score;
}