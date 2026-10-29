import { test as base, expect } from '@playwright/test';
import { Application } from '../pages/Application';

type Fixtures = {
  app: Application;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    await use(new Application(page));
  },
});

export { expect };
