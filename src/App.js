import RacingController from "./controller/RacingController.js";

class App {
  async run() {
    const controller = new RacingController();
    await controller.start();
  }
}

export default App;
