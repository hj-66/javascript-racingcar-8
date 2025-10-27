import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  test("기능 테스트", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("예외 테스트", async () => {
    // given
    const inputs = ["pobi,javaji"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름 유효성 검사", async () => {
    // given
    const inputs = ["po!bi,woni"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름 중복 시 예외 발생", async () => {
    // given
    const inputs = ["pobi,pobi"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름이 공백이거나 빈 문자열이면 예외 발생", async () => {
    // given
    const inputs = ["pobi,,woni"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름에 공백이 포함되면 예외 발생", async () => {
    // given
    const inputs = ["po bi,woni"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("자동차 이름이 5자를 초과하면 예외 발생", async () => {
    // given
    const inputs = ["pobi,abcdef"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수 유효성 검사", async () => {
    // given
    const inputs = ["pobi,woni", "0"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수가 음수면 예외 발생", async () => {
    // given
    const inputs = ["pobi,woni", "-1"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수가 숫자가 아니면 예외 발생", async () => {
    // given
    const inputs = ["pobi,woni", "three"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  test("시도 횟수가 여러 번일 때 레이스가 정상 출력되는지 확인", async () => {
    // given
    const inputs = ["pobi,woni", "3"];
    mockQuestions(inputs);
    mockRandoms([4, 3, 4, 3, 4, 3]); // 각 라운드별 결과 제어

    // when
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();

    // then(pobi는 세 번 이동, woni는 멈춤)
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("pobi : ---"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("woni : "));
  });
});
