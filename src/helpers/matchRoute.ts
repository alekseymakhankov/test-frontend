import { normalizeString } from './normalizeString';

export const matchRoute = (source: string, target: string, exact?: boolean) => {
  if (exact) {
    return normalizeString(source) === normalizeString(target);
  }
  return normalizeString(source).includes(normalizeString(target));
};
