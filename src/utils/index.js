export const totalPrice = (data) =>
  Object.keys(data).reduce((sum, movie) => sum + data[movie].price, 0);

export const getImageURL = (title) => {
  const titleTransform = title.replace(/\s+/g, "_").toLowerCase();
  return new URL(`../assets/images/${titleTransform}.jpg`, import.meta.url)
    .href;
};

export const parseUrlQuery = (urlQuery) => {
  const searchParams = new URLSearchParams(urlQuery);
  return Object.fromEntries(searchParams);
};

export const stringifyUrlQuery = (objQuery) => {
  const searchParams = new URLSearchParams(objQuery);
  return searchParams.toString();
};
