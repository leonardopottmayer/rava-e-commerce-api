export class UserDefaultRegisterDataDto {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
  }
}
