import React, { Component } from 'react';
import './Collapsible.scss';

interface State {
  isOpen: boolean;
}

type Props = {
  defaultOpen: boolean;
  heading: string;
};

class Collapsible extends Component<Props, State> {
  state: State = { isOpen: false };

  componentDidMount() {
    if (this.props.defaultOpen) this.setState({ isOpen: true });
  }

  getChevron = () => {
    return `ui angle icon ${this.state.isOpen ? ' up' : ' down'}`;
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
          className={`collapsible-content ${this.state.isOpen ? 'open' : ''}`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Collapsible;
