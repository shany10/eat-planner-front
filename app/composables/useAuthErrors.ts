export function useAuthErrors() {
  const errors = ref<string[]>([]);
  const fieldErrors = ref<Record<string, string>>({});

  type Issue = { message?: unknown; path?: unknown };
  type ApiErrorData = {
    message?: unknown;
    issues?: unknown;
    error?: unknown;
  };

  type FetchErrorLike = {
    data?: ApiErrorData;
    message?: unknown;
  };

  function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }

  function asString(value: unknown): string | null {
    return typeof value === "string" ? value : null;
  }

  function extractIssues(value: unknown): string[] | null {
    if (!Array.isArray(value)) return null;
    const msgs = value
      .map((v: unknown) => {
        if (isObject(v)) {
          return asString((v as Issue).message) ?? JSON.stringify(v);
        }
        return String(v);
      })
      .filter(Boolean);
    return msgs.length ? msgs : null;
  }

  function extractFieldErrors(value: unknown): Record<string, string> {
    const result: Record<string, string> = {};
    if (!Array.isArray(value)) return result;

    for (const v of value) {
      if (!isObject(v)) continue;
      const msg = asString((v as Issue).message);
      if (!msg) continue;

      const path = (v as Issue).path;
      // zod: path is usually string[]
      if (
        Array.isArray(path) &&
        path.length > 0 &&
        typeof path[0] === "string"
      ) {
        const key = String(path[0]);
        // keep first message per field (usually the most relevant)
        if (!result[key]) result[key] = msg;
      }
    }

    return result;
  }

  function parseError(e: unknown) {
    fieldErrors.value = {};

    // 1) ZodError (client-side validation)
    if (isObject(e) && asString(e.name) === "ZodError") {
      const issuesRaw = (e as { issues?: unknown }).issues;
      const zodIssues = extractIssues(issuesRaw);
      fieldErrors.value = extractFieldErrors(issuesRaw);
      errors.value = zodIssues ?? ["Données invalides."];
      return;
    }

    // 2) $fetch / API errors in Nuxt (usually e.data)
    const fe = e as FetchErrorLike;
    const data = fe && typeof fe === "object" ? fe.data : undefined;

    fieldErrors.value = extractFieldErrors(data?.issues);

    const issues = extractIssues(data?.issues);
    if (issues) {
      errors.value = issues;
      return;
    }

    const directMsg = asString(data?.message) ?? asString(data?.error);
    if (directMsg) {
      errors.value = [directMsg];
      return;
    }

    // 3) Sometimes message is a JSON string of issues
    const maybeMsg = asString(fe?.message);
    if (maybeMsg) {
      try {
        const parsed = JSON.parse(maybeMsg) as unknown;
        const parsedIssues = extractIssues(parsed);
        if (parsedIssues) {
          errors.value = parsedIssues;
          return;
        }
      } catch {
        // ignore
      }

      errors.value = [maybeMsg];
      return;
    }

    errors.value = ["Une erreur est survenue."];
  }

  function clear() {
    errors.value = [];
    fieldErrors.value = {};
  }

  return { errors, fieldErrors, parseError, clear };
}
