import ImageZoom from "./ImageZoom";
import React, { Component } from "react";

export default class ImageZoomTest extends Component {
  state = {
    isActive: false,
  };

  onClose = () => {
    this.setState({
      isActive: false,
    });
  };

  onZoom = () => {
    this.setState({
      isActive: true,
    });
  };

  render() {
    const { isActive } = this.state;
    return (
      <ImageZoom
        isActive={isActive}
        imageURL="https://media.istockphoto.com/id/1054269786/photo/small-house-and-rice-terraces-field-at-pabongpaing-village-rice-terraces-mae-jam-chiang-mai.jpg?s=612x612&w=is&k=20&c=e5rHb1m006jLAJcd7aUotZZ6c52X0YR87RSFiGgpEzI="
        onZoom={this.onZoom}
        onClose={this.onClose}
      />
    );
  }
}
