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
1. ,가 아닌 다른 기호가 있을 경우, Error 처리
2. 자동차 이름이 5글자가 넘을 경우, Error 처리
3. 시도 횟수가 0이나 음수일 경우, Error 처리
