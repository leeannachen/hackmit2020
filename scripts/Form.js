import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      name: "",
      chore: "",
      weekday: ""
    };

    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const { name, chore, weekday } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChange}
        />
        <label for="chore">Chore</label>
        <input
          type="text"
          name="chore"
          id="chore"
          value={chore}
          onChange={this.handleChange}
        />
        <label for="weekday">Weekday</label>
        <input
          type="text"
          name="weekday"
          id="weekday"
          value={weekday}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
