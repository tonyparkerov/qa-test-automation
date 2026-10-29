import { expect, Page } from "@playwright/test";
import { step } from "../utils/step";

export abstract class BasePage {
  protected page: Page;
  abstract readonly url: string;

  constructor(page: Page) {
    this.page = page;
  }

  @step
  async open() {
    await this.page.goto(this.url);
    await this.verifyLoaded();
  }

  /** Asserts the browser is on this page (exact path match) and its content is ready. */
  @step
  async verifyLoaded() {
    await expect(this.page).toHaveURL((url) => url.pathname === this.url);
    await this.waitForReady();
  }

  /** Override to wait for page-specific content (data fetched, spinners gone, etc.). */
  protected async waitForReady() {}
}
