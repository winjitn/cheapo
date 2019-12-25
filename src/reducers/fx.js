export default function(state = [], action) {
  switch (action.type) {
    case "FETCH_FX":
      var hold = [];
      for (var i in action.payload.rates) {
        hold.push([i, action.payload.rates[i]]);
      }
      hold.sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      });
      var sorted = {};
      hold.forEach(item => {
        sorted[item[0]] = item[1];
      });
      console.log("sorted");
      return sorted;
    default:
      return state;
  }
}
