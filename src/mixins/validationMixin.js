// Validators imported
import {
  required,
  minLength,
  minValue,
  maxLength,
  helpers,
  email,
  numeric,
  maxValue,
} from "vuelidate/lib/validators";

// export function hesLetterValidation(value) {
//   return /^[a-zA-Z].[a-zA-Z].-....-../.test(value);
// }
// Check Turkish Citizen Number
// TC Checking Rules
// Should be 11 number.
// First number shouldn't be 0.
// Sum of 1st,3rd,5th,7th and 9th multiply by 7 and sum of 2nd,4th,6th and 8th subtract from the first calculation. This calculation divide by 10 and final result gives us the 10th number.
//Sum of first 10 digits divided by 10 gives us the 11th digit.

const checkTcNumber = (value) => {
  value = value.toString();

  let isEleven = /^[0-9]{11}$/.test(value);
  let totalX = 0;

  for (let i = 0; i < 10; i++) {
    totalX += Number(value.substr(i, 1));
  }

  let isRuleX = totalX % 10 == value.substr(10, 1);
  let totalY1 = 0;
  let totalY2 = 0;

  for (let i = 0; i < 10; i += 2) {
    totalY1 += Number(value.substr(i, 1));
  }

  for (let i = 1; i < 10; i += 2) {
    totalY2 += Number(value.substr(i, 1));
  }

  let isRuleY = (totalY1 * 7 - totalY2) % 10 == value.substr(9, 0);

  return isEleven && isRuleX && isRuleY;
};

// Hes Code Validation - First and Third character is letter, rest is digits
const hesCodeValidation = helpers.regex(
  "hesCodeValidation",
  /^[a-zA-Z].[a-zA-Z].-....-../
);

const validationMixin = {
  validations() {
    return {
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(2),
      },
      age: {
        minValue: minValue(6),
        required,
      },
      hesCode: {
        required,
        hesCodeValidation,
        minLength: minLength(12),
        maxLength: maxLength(12),
      },
      tcNumber: {
        required,
        checkTcNumber,
        numeric,
      },
      phoneNumber: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      email: {
        email,
        required,
      },
      rooms: {
        minValue: minValue(1),
      },
      cardMonth: {
        minLength: minLength(2),
        maxValue: maxValue(12),
        required,
        numeric,
      },
      cardYear: {
        minLength: minLength(2),
        minValue: minValue(20),
        required,
        numeric,
      },
      cardLength: {
        minLength: minLength(16),
        maxLength: maxLength(16),
        required,
        numeric,
      },
      cvcLength: {
        minLength: minLength(3),
        required,
        numeric,
      },
      fullName: {
        required,
        minLength: minLength(3),
      },
    };
  },
  filters: {
    capitalizeText: (value) => {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
export default validationMixin;
