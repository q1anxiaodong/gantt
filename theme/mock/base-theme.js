export default {
  name: "custom-theme",
  parsers: [
    (option, token) => {
      console.log("111");
    },
    (option, chart, optionToken) => {
      option.series[0].itemStyle = {
        color: "green",
      };
    },
    (option, chart, optionToken) => {
      console.log("333");
    },
  ],
  token: {
    color: "red",
  },
};
