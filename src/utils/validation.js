import { MESSAGES } from "./constants.js";

export const validateNameDuplication = (cars) => {
  if (new Set(cars).size !== cars.length) {
    throw new Error(MESSAGES.ERROR.ERROR_NAME_DUPLICATION + cars);
  }
};

export const validateNameLength = (carName) => {
  const carNameLength = carName.length;

  if (carNameLength > 5) {
    throw new Error(MESSAGES.ERROR.ERROR_NAME_LENGTH + carName);
  }
};

export const validateAllowedCharacter = (carName) => {
  const pattern = /^[A-Za-z]+$/;

  if (!pattern.test(carName)) {
    throw new Error(MESSAGES.ERROR.ERROR_NAME_CHARACTER + carName);
  }
};

export const validateNumberAttempts = (numberAttempts) => {
  if (isNaN(numberAttempts) || numberAttempts <= 0) {
    throw new Error(MESSAGES.ERROR.ERROR_INVALID_NUMBER + numberAttempts);
  }
};
