import { expect, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { step } from "../utils/step";

export class TodosPage extends BasePage {
  readonly url = "/todos";

  private heading = this.page.getByRole("heading", { name: "My tasks" });
  private todoInput = this.page.getByTestId("todo-input");
  private addButton = this.page.getByTestId("add-button");
  private items = this.page.getByTestId("todo-item");
  private loadingText = this.page.getByText("Loading...");
  readonly emptyText = this.page.getByText("No tasks yet");

  /** Todos are fetched with a delay — wait until the list is rendered. */
  protected async waitForReady() {
    await expect(this.heading).toBeVisible();
    await expect(this.loadingText).toBeHidden({ timeout: 10_000 });
  }

  /** Exact text match, so "Milk" does not also match "Milk 2". */
  item(text: string): Locator {
    return this.items.filter({ has: this.page.getByText(text, { exact: true }) });
  }

  @step
  async addTodo(text: string) {
    await this.todoInput.fill(text);
    await this.addButton.click();
  }

  @step
  async deleteTodo(text: string) {
    await this.item(text).getByRole("button", { name: "×" }).click();
  }
}
