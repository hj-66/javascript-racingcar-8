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
      const cars = await this.getCarsInput();
      const number_attempts = await this.getNumberInput();
      const execution_result = new Array(cars.length).fill(0);

      this.runRace(cars, execution_result, number_attempts);
      this.printResult(cars, execution_result);
    } catch (error) {
      throw error;
    }
  }

  async getCarsInput() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.INPUT_CARS);
    const cars = input.split(",").map((car) => car.trim());

    cars.forEach((car) => {
      validateAllowedCharacter(car);
      validateNameLength(car);
    });

    return cars;
  }

  async getNumberInput() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.INPUT_ATTEMPTS);
    const number_attempts = Number(input);
    validateNumberAttempts(number_attempts);
    return number_attempts;
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
