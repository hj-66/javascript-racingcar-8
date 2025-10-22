import { Console } from '@woowacourse/mission-utils'

class App {
  async run() {
    const cars = await this.getCarsInput();
    const numberAttempts = await this.getNumberInput();
  }

  async getCarsInput() {
    const cars = await Console.readLineAsync('');
    const splitCars = cars.split(',');
    return splitCars;
  }

  async getNumberInput() {
    const numberAttempts = await Console.readLineAsync('');
    return numberAttempts;
  }
}

export default App;
