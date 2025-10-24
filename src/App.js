import { Console, MissionUtils } from '@woowacourse/mission-utils';

class App {
  async run() {
    const [cars, executionResult] = await this.getCarsInput();
    const numberAttempts = await this.getNumberInput();
    this.runRace(cars, executionResult, numberAttempts);
    this.printResult(cars, executionResult);
  }

  async getCarsInput() {
    const cars = await Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n');
    const splitCars = cars.split(',');
    let executionResult = [];
    splitCars.forEach((splitCar) => {
      executionResult.push(0);
    });
    return [splitCars, executionResult];
  }

  async getNumberInput() {
    const numberAttempts = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    return numberAttempts;
  }

  runRace(cars, executionResult, numberAttempts) {
    Console.print('');
    Console.print('실행 결과');
    for (let i = 0; i < numberAttempts; i++) {
      cars.forEach((car, index) => {
        const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
        if (randomNumber >= 4) executionResult[index] += 1;
      })
      this.printRace(cars, executionResult);
    }
  }

  printRace(cars, executionResult) {
    cars.forEach((car, index) => {
      Console.print(`${car} : ${'-'.repeat(executionResult[index])}`);
    })
    Console.print('');
  }

  printResult(cars, executionResult) {
    let maxNumber = 0;
    let winners = [];
    executionResult.forEach((result, index) => {
      if (result > maxNumber) { winners = []; maxNumber = result; }
      if (result >= maxNumber) winners.push(cars[index]);
    })
    let printValue = '';
    winners.forEach((winner, index) => {
      printValue += winner;
      if (index != winners.length - 1) printValue += ', ';
    })
    Console.print('최종 우승자 : ' + printValue);
  }
}

export default App;
