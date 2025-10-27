import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../utils/messages.js';

export default class ConsoleView {
  async readCarNames() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.INPUT_CARS);
    return input.split(',').map(name => name.trim());
  }

  async readAttemptCount() {
    const input = await Console.readLineAsync(MESSAGES.INPUT.INPUT_ATTEMPTS);
    return Number(input);
  }

  printRaceStart() {
    Console.print('');
    Console.print(MESSAGES.OUTPUT.OUTPUT_RACE);
  }

  printRaceStatus(cars) {
    cars.forEach(car => Console.print(`${car.name} : ${car.getTrack()}`));
    Console.print('');
  }

  printWinners(winners) {
    Console.print(`${MESSAGES.OUTPUT.OUTPUT_WINNER}${winners.join(',')}`);
  }
}