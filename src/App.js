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

  runRace(cars, execution_result, number_attempts) {
    Console.print("");
    Console.print(MESSAGES.OUTPUT.OUTPUT_RACE);

    for (let i = 0; i < number_attempts; i++) {
      this.moveCars(cars, execution_result);
      this.printRace(cars, execution_result);
    }
  }

  moveCars(cars, execution_result) {
    cars.forEach((_, index) => {
      const random_number = MissionUtils.Random.pickNumberInRange(0, 9);
      if (random_number >= 4) execution_result[index] += 1;
    });
  }

  printRace(cars, execution_result) {
    cars.forEach((car, index) => {
      const track = "-".repeat(execution_result[index]);
      Console.print(`${car} : ${track}`);
    });
    Console.print("");
  }

  printResult(cars, execution_result) {
    const max_score = Math.max(...execution_result);
    const winners = cars.filter(
      (_, index) => execution_result[index] === max_score
    );

    Console.print(`${MESSAGES.OUTPUT.OUTPUT_WINNER}${winners.join(",")}`);
  }
}

export default App;
