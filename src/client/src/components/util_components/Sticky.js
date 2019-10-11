import React from "react";
import "./Sticky.scss";

class Sticky extends React.Component {
	state = {
		isStuck: false
	};

	constructor(props) {
		super(props);
		this.element = React.createRef();
	}
	componentDidMount() {
		this.setState({ offset: this.element.current.offsetHeight });
		document.addEventListener("scroll", e => this.handleScroll(e));
	}
	componentWillUnmount() {
		document.removeEventListener("scroll", e => this.handleScroll(e));
	}

	handleScroll(e) {
		if (window.scrollY > this.state.offset && !this.state.isStuck) {
			this.setState({ isStuck: true });
		}
		if (window.scrollY < this.state.offset && this.state.isStuck)
			this.setState({ isStuck: false });
	}

	renderOffsetElement() {
		if (this.state.isStuck)
			return <div style={{ height: this.state.offset }} />;
	}
	render() {
		return (
			<>
				<div
					className={`sticky${this.state.isStuck ? " stuck" : ""}`}
					ref={this.element}
				>
					{this.props.children}
				</div>
				{this.renderOffsetElement()}
			</>
		);
	}
}

export default Sticky;
