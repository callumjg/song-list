import React from "react";
import RowControls from "./RowControls";

class Row extends React.Component {
	state = { isControlPanelActive: false };

	componentDidMount() {
		this.row.addEventListener("click", this.handleRowClick);
		document.addEventListener("click", this.handleDocumentClick);
	}

	componentWillUnmount() {
		this.row.removeEventListener("click", this.handleRowClick);
		document.removeEventListener("click", this.handleDocumentClick);
	}

	setControlPanelIsActive = (bool = !this.state.isControlPanelActive) => {
		this.setState({ isControlPanelActive: bool });
	};
	handleRowClick = e => {
		this.setControlPanelIsActive();
	};
	handleDocumentClick = e => {
		if (!this.row.contains(e.target)) {
			this.setControlPanelIsActive(false);
		}
	};

	renderRowControls = () => {
		if (!this.props.controls) return null;
		return (
			<RowControls
				isActive={this.state.isControlPanelActive}
				closeControls={() => this.setState({ isControlPanelActive: false })}
			>
				{this.props.controls}
			</RowControls>
		);
	};

	render() {
		return (
			<div
				className={`my-row${this.props.darker ? " darker" : ""}${
					this.props.noHover ? " no-hover" : ""
				}${this.props.controls ? " cursor-pointer" : ""}`}
				onClick={() => (this.props.onClick ? this.props.onClick() : null)}
				ref={ref => (this.row = ref)}
			>
				{this.props.children}
				{this.renderRowControls()}
			</div>
		);
	}
}

export default Row;
