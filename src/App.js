import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Chartist from "chartist";

import { fetchFx } from "./actions";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    const date = new Date();
    const day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
    if (this.props.fx.length === 0) {
      this.props.fetchFx(day, month, year);
    }
    this.graph();
  }

  graph() {
    var data = { KRW: [], JPY: [], USD: [] };
    var price = { KRW: 329000, JPY: 27800, USD: 249 };
    this.price = price;

    const currency = ["KRW", "JPY", "USD"];
    this.c = data;
    var rates = this.props.fx;
    for (var date in rates) {
      for (var crny of currency) {
        data[crny].push({
          x: new Date(date),
          y: (1 / rates[date][crny]) * price[crny]
        });
      }
    }

    var chart = new Chartist.Line(
      ".ct-chart",
      {
        series: [
          {
            name: "KRW",
            data: data.KRW
          },
          {
            name: "JPY",
            data: data.JPY
          },
          {
            name: "USD",
            data: data.USD
          }
        ]
      },
      {
        axisX: {
          type: Chartist.FixedScaleAxis,
          divisor: 5,
          labelInterpolationFnc: function(value) {
            return moment(value).format("MMM D");
          }
        }
      }
    );
    document.querySelector("#lu").innerHTML = `Last updated: ${moment(
      this.c.KRW[this.c.KRW.length - 1].x
    ).format("L")}`;
    document.querySelector("#krw").innerHTML += `Korean Won: ${(
      this.c.KRW[this.c.KRW.length - 1].y / this.price.KRW
    ).toFixed(4)}`;
    document.querySelector("#jpy").innerHTML += `Japanese Yen: ${(
      this.c.JPY[this.c.JPY.length - 1].y / this.price.JPY
    ).toFixed(4)}`;
    document.querySelector("#usd").innerHTML += `US Dollar: ${(
      this.c.USD[this.c.USD.length - 1].y / this.price.USD
    ).toFixed(4)}`;
  }

  render() {
    return (
      <div className="App">
        <div className="title">Price Tracker</div>
        <div className="ct-ctn">
          <div className="ct-chart"></div>
          <button className="ui grey button" id="t">
            Airpods 6 Months Currency Adjusted Price
          </button>
          <button className="ui grey button" id="yaxis">
            Currency(THB)
          </button>
        </div>
        <div className="bottom">
          <div id="lu"></div>
          <button className="ui red button" id="krw">
            <i class="kr flag"></i>
          </button>
          <button className="ui salmon button" id="jpy">
            <i class="jp flag"></i>
          </button>
          <button className="ui yellow button" id="usd">
            <i class="us flag"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { fx: state.fx };
};

export default connect(mapStateToProps, { fetchFx })(App);
