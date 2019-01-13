export const classnames = (classes: {[key: string]: boolean}) => {
  return Object.keys(classes)
    .filter(key => !!classes[key])
    .reduce((acc, key) => acc ? `${acc} ${key}` : key, '');
};
