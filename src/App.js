import { Console } from '@woowacourse/mission-utils'

class App {
  async run() {
    const cars = await this.getCarsInput();
  }

  async getCarsInput() {
    const cars = await Console.readLineAsync('');
    const splitCars = cars.split(',');
    return splitCars;
  }
}

export default App;
