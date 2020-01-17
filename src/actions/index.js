import axios from "axios";

export const fetchFx = (day, month, year) => async dispatch => {
  const res = await axios.get(
    `https://api.exchangeratesapi.io/history?start_at=${2019}-${7}-${day}&end_at=${year}-${month}-${day}&symbols=USD,JPY,KRW&base=THB`
  );

  dispatch({ type: "FETCH_FX", payload: res.data });
};
