import { test } from "@playwright/test";

type AsyncMethod<This, Args extends unknown[], Return> = (this: This, ...args: Args) => Promise<Return>;
type MethodContext<This, Args extends unknown[], Return> = ClassMethodDecoratorContext<
  This,
  AsyncMethod<This, Args, Return>
>;

/** Params and object keys matching this are shown as `***` in step names. */
const SENSITIVE = /pass(word)?|pwd|secret|token|api[-_]?key/i;
const MAX_ARG_LENGTH = 60;

/**
 * Wraps an async page-object method in `test.step` so it shows up as a named step in the report.
 * Boxed, so a failure points at the spec line that called the method.
 *
 * Named from the class, method and arguments: `addTodo("Milk")` → `TodosPage: Add todo "Milk"`.
 * Arguments named like passwords/tokens (or object keys named so) are masked as `***`.
 */
export function step<This extends object, Args extends unknown[], Return>(
  target: AsyncMethod<This, Args, Return>,
  context: MethodContext<This, Args, Return>,
): AsyncMethod<This, Args, Return> {
  const params = paramNames(target);
  const method = String(context.name);

  return function (this: This, ...args: Args) {
    const shown = args.map((arg, i) => (SENSITIVE.test(params[i] ?? "") ? "***" : format(arg)));
    const name = `${this.constructor.name}: ${[humanize(method), shown.join(", ")].filter(Boolean).join(" ")}`;
    return test.step(name, () => target.apply(this, args), { box: true });
  };
}

/** `addTodo` → `Add todo`. */
function humanize(name: string): string {
  const words = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function format(value: unknown): string {
  return truncate(stringify(value));
}

function stringify(value: unknown): string {
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "function") return value.name || "fn";
  if (value === null || typeof value !== "object") return String(value);
  if (Array.isArray(value)) return `[${value.map(stringify).join(", ")}]`;
  // Locators, Pages, etc. — a class instance is better shown by its own toString or class name.
  if (Object.getPrototypeOf(value) !== Object.prototype) {
    const str = String(value);
    return str === "[object Object]" ? value.constructor.name : str;
  }
  const entries = Object.entries(value).map(([k, v]) => `${k}: ${SENSITIVE.test(k) ? "***" : stringify(v)}`);
  return `{ ${entries.join(", ")} }`;
}

function truncate(text: string): string {
  return text.length > MAX_ARG_LENGTH ? `${text.slice(0, MAX_ARG_LENGTH - 1)}…` : text;
}

/** Reads parameter names from the method source; destructured params get "" so indexes stay aligned. */
function paramNames(fn: Function): string[] {
  const source = fn.toString().replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
  const open = source.indexOf("(");
  if (open < 0) return [];

  const params: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of source.slice(open + 1)) {
    if ("([{".includes(char)) depth++;
    if (")]}".includes(char)) {
      if (depth === 0) break;
      depth--;
    }
    if (char === "," && depth === 0) {
      params.push(current);
      current = "";
    } else current += char;
  }
  params.push(current);

  return params
    .map((p) => p.trim().replace(/^\.\.\./, "").split("=")[0].trim())
    .map((p) => (/^[A-Za-z_$][\w$]*$/.test(p) ? p : ""));
}
