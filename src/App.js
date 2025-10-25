import { Console, MissionUtils } from "@woowacourse/mission-utils";
import { MESSAGES } from "./constants.js";
import {
  validateAllowedCharacter,
  validateNameLength,
  validateNumberAttempts,
} from "./validation.js";

class App {
  async run() {
    try {
      const [cars, executionResult] = await this.getCarsInput();
      const numberAttempts = await this.getNumberInput();
      this.runRace(cars, executionResult, numberAttempts);
      this.printResult(cars, executionResult);
    } catch (error) {
      throw error;
    }
  }

  async getCarsInput() {
    const cars = await Console.readLineAsync(MESSAGES.INPUT.INPUT_CARS);
    const splitCars = cars.split(",");
    let executionResult = [];
    splitCars.forEach((splitCar) => {
      executionResult.push(0);
      validateAllowedCharacter(splitCar);
      validateNameLength(splitCar);
    });
    return [splitCars, executionResult];
  }

  async getNumberInput() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.INPUT_ATTEMPTS);
    const numberAttempts = Number(input);
    validateNumberAttempts(numberAttempts);
    return numberAttempts;
  }

  runRace(cars, executionResult, numberAttempts) {
    Console.print("");
    Console.print(MESSAGES.OUTPUT.OUTPUT_RACE);
    for (let i = 0; i < numberAttempts; i++) {
      cars.forEach((car, index) => {
        const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
        if (randomNumber >= 4) executionResult[index] += 1;
      });
      this.printRace(cars, executionResult);
    }
  }

  printRace(cars, executionResult) {
    cars.forEach((car, index) => {
      Console.print(`${car} : ${"-".repeat(executionResult[index])}`);
    });
    Console.print("");
  }

  printResult(cars, executionResult) {
    let maxNumber = 0;
    let winners = [];
    executionResult.forEach((result, index) => {
      if (result > maxNumber) {
        winners = [];
        maxNumber = result;
      }
      if (result >= maxNumber) winners.push(cars[index]);
    });
    Console.print(MESSAGES.OUTPUT.OUTPUT_WINNER + winners.join(","));
  }
}

export default App;
