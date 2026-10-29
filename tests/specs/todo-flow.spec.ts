import { test, expect } from "../fixtures";
import { validUser } from "../data/users";

test("user can log in, create and delete a task", async ({ app }) => {
  const taskText = `E2E task ${Date.now()}`;

  await app.loginPage.open();
  await app.loginPage.login(validUser.email, validUser.password);
  await app.todosPage.verifyLoaded();

  await app.todosPage.addTodo(taskText);
  await expect(app.todosPage.item(taskText)).toBeVisible();

  await app.todosPage.deleteTodo(taskText);
  await expect(app.todosPage.item(taskText)).toBeHidden();
  await expect(app.todosPage.emptyText).toBeVisible();
});
