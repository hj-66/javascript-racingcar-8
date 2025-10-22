import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const [cars, executionResult] = await this.getCarsInput();
    const numberAttempts = await this.getNumberInput();
  }

  async getCarsInput() {
    const cars = await Console.readLineAsync('');
    const splitCars = cars.split(',');
    let executionResult = [];
    splitCars.forEach((splitCar) => {
      executionResult.push({ [splitCar]: 0 });
    });
    return [splitCars, executionResult];
  }

  async getNumberInput() {
    const numberAttempts = await Console.readLineAsync('');
    return numberAttempts;
  }
}

export default App;
