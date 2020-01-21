import React from "react";
import "./Collapsible.scss";

class Collapsible extends React.Component {
  state = { isOpen: false };

  componentDidMount() {
    if (this.props.defaultOpen) this.setState({ isOpen: true });
  }

  getChevron = () => {
    return `ui angle icon ${this.state.isOpen ? " up" : " down"}`;
  };
  render() {
    return (
      <div className="collapsible">
        <div
          className="collapsible-heading"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <h5>{this.props.heading}</h5>
          <i className={this.getChevron()} />
        </div>
        <div
          className={`collapsible-content ${this.state.isOpen ? "open" : ""}`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Collapsible;
