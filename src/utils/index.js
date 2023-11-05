export const totalPrice = (data) =>
  Object.keys(data).reduce((sum, movie) => sum + data[movie].price, 0);
