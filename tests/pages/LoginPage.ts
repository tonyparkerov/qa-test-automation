import { BasePage } from "./BasePage";
import { step } from "../utils/step";

export class LoginPage extends BasePage {
  readonly url = "/";

  private emailInput = this.page.getByTestId("email-input");
  private passwordInput = this.page.getByTestId("password-input");
  private loginButton = this.page.getByTestId("login-button");

  @step
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
