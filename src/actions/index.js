import axios from "axios";

export const fetchFx = (day, month, year) => async dispatch => {
  const res = await axios.get(
    `https://api.exchangeratesapi.io/history?start_at=${year}-${month -
      6}-${day}&end_at=${year}-${month}-${day}&symbols=USD,JPY,KRW&base=THB`
  );

  dispatch({ type: "FETCH_FX", payload: res.data });
};
