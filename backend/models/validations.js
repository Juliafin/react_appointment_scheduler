const emailValid = [/^.+@{1}.+\.[a-zA-Z]{2,4}$/, 'The email must be valid.'];

const passwordValid = [/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$?%!/\{\}\[\]\(\)]).{6,20})/, "The password must contain at least one of each\n: 1. Capital letter \n2. Lowercase letter \n3. Special Character\n 4. Number\n And it must be between 6 and 20 characters in length"];

const appointmentMaxLength = [35, 'The length is longer than 20 characters.'];

const phoneNumberValid = [/^\d{3}-\d{3}-\d{4}$/, "Phone Number must be in the format 123-456-7890"];

module.exports =  {
  emailValid, passwordValid, appointmentMaxLength,
  phoneNumberValid
};