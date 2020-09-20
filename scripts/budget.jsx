/*import ReactDOM, { render } from "react-dom";
import React from "react";
import App from "../app";
import * as firebase from "firebase";

class Finances extends React.Component {
  constructor(props) {
    super(props);
    this.state = firebase.database.ref("budgets");

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById("root"));
*/
