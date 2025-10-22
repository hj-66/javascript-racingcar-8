import { Console, MissionUtils } from '@woowacourse/mission-utils';

class App {
  async run() {
    const [cars, executionResult] = await this.getCarsInput();
    const numberAttempts = await this.getNumberInput();
    this.runRace(cars, executionResult, numberAttempts);
  }

  async getCarsInput() {
    const cars = await Console.readLineAsync('');
    const splitCars = cars.split(',');
    let executionResult = [];
    splitCars.forEach((splitCar) => {
      executionResult.push(0);
    });
    return [splitCars, executionResult];
  }

  async getNumberInput() {
    const numberAttempts = await Console.readLineAsync('');
    return numberAttempts;
  }

  runRace(cars, executionResult, numberAttempts) {
    for (let i = 0; i < numberAttempts; i++) {
      cars.forEach((car, index) => {
        const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
        if (randomNumber >= 4) executionResult[index] += 1;
      })
    }
  }
}

export default App;
