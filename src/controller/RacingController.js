import RacingGame from "../model/RacingGame.js";
import ConsoleView from "../view/ConsoleView.js";
import {
  validateAllowedCharacter,
  validateNameLength,
  validateNumberAttempts,
} from "../utils/validation.js";

export default class RacingController {
  constructor() {
    this.view = new ConsoleView();
  }

  async start() {
    const carNames = await this.view.readCarNames();
    carNames.forEach((name) => {
      validateAllowedCharacter(name);
      validateNameLength(name);
    });

    const attempts = await this.view.readAttemptCount();
    validateNumberAttempts(attempts);

    const game = new RacingGame(carNames);
    this.view.printRaceStart();

    for (let i = 0; i < attempts; i++) {
      game.raceOnce();
      this.view.printRaceStatus(game.cars);
    }

    const winners = game.getWinners();
    this.view.printWinners(winners);
  }
}
