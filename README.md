# javascript-racingcar-precourse
---
<br>

## 기능 정리

### 입력받기
1. `let cars = Console.readLineAsync()`을 이용하여 자동차 입력받기
2. `let numberAttempts = Console.readLineAsync()` 를 이용하여 시도할 횟수 입력받기
3. `const splitCars = split(',')`을 이용하여 자동차 이름 구분
4. 새로운 배열 `executionResult` 생성 후 각각 값을 `0`으로 저장해놓기

### 경주 진행
1. `cars.forEach((car, index) => )`를 이용하여 자동차 배열을 순회한다.
2. 각 자동차마다 `MissionUtils.Random.pickNumberInRange(0, 9);` 를 이용하여 주사위를 `numberAttempts` 횟수만큼 굴리기
3. 무작위 값이 4이상 나온 횟수만큼 `executionResult`의 해당 자동차 `index`값에 `+1` 추가

### 과정 출력
1. `실행 결과` 출력
2. 각 자동차별로 한번의 주사위 굴리기가 끝날때 마다, `repeat`를 이용하여 `${자동차 이름} : '-'.repeat(executionResult[index])` 출력

### 결과 출력
1. `executionResult`에서 값이 가장 큰 index들(중복 가능)을 조회 후 `splitCars`와 비교하여 최종 우승자 선별 및 출력

### Error 검출
- **자동차 이름**  
  1. ,가 아닌 다른 기호가 있을 경우, Error 처리 
  2. 자동차 이름이 5글자가 넘을 경우, Error 처리
  3. 자동차 이름이 공백이거나 빈 문자열일 경우, Error 처리
  4. 자동차 이름이 중복될 경우, Error 처리
  5. 자동차 이름에 공백이 포함될 경우, Error 처리

- **시도 횟수**  
  1. 시도 횟수가 0이나 음수일 경우, Error 처리
  2. 시도 횟수가 숫자가 아닌 경우, Error 처리

<br>

## 구조 정리

### MVC 패턴 기반 구조
- **Model**  
  `Car.js`: 자동차의 이름과 이동 거리 관리  
  `Race.js`: 전체 자동차 목록과 경기 진행 로직 담당

- **View**  
  `GameView.js`: 사용자 입력 및 출력 메시지 관리 (Console)

- **Controller**  
  `GameController.js`: 게임 전체 흐름 제어 (입력 → 실행 → 결과 출력)

- **Utils**  
  `validation.js`: 이름, 시도 횟수 검증  
  `constants.js`: 메시지 텍스트, 설정값 관리


### 객체 지향 구조
- 각 기능을 Class로 만들어 정리
- 각 함수가 한 가지 일만 하도록 만들기