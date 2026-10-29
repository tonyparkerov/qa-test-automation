import type { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { TodosPage } from "./TodosPage";

/** Single entry point to every page object, sharing one browser page. */
export class Application {
  readonly loginPage: LoginPage;
  readonly todosPage: TodosPage;

  constructor(readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.todosPage = new TodosPage(page);
  }
}
