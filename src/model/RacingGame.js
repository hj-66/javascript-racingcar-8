import Car from './Car.js';
import { MissionUtils } from '@woowacourse/mission-utils';

export default class RacingGame {
  constructor(carNames) {
    this.cars = carNames.map((name) => new Car(name));
  }

  raceOnce() {
    this.cars.forEach((car) => {
      const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
      car.move(randomNumber);
    });
  }

  getWinners() {
    const max = Math.max(...this.cars.map((car) => car.position));
    return this.cars
      .filter((car) => car.position === max)
      .map((car) => car.name);
  }
}
