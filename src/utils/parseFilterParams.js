// If we try to filter by random bs, it will be ignored and unfiltered contacts will be returned
// think about it later
const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }

  return parsedNumber;
};

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  const parsedIsFavourite = parseBoolean(isFavourite);
  const parsedContactType = parseContactType(type);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
