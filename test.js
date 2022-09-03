const newsArrStr = [
  {
    total_view: 127,
    title: "9 Things to do in Colorado this Labor Day weekend",
  },
  {
    total_view: 125,
    title: "Up Late with Ben Harvey: Why Troy Mercanti needs",
  },
  {
    total_view: 100,
    title: "California to phase out sales of gas-powered cars",
  },
];

// const newArr = JSON.parse(newsArrStr);
// console.log(newArr[0]);

const sortedArr = newsArrStr.sort((a, b) => {
  return b.total_view - a.total_view;
});

console.log(sortedArr);
