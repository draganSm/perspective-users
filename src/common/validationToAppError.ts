import { ZodIssue } from 'zod';

export const validationToAppError = (validationErrors: ZodIssue[]) =>
  validationErrors.reduce((acc, it) => {
    const filed = it.path.join('.');
    const { message } = it;
    return { ...acc, [filed]: [...(acc[filed] || []), message] };
  }, {} as Record<string, string>);
