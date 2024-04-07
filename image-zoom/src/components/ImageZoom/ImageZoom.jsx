import React, { useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./ImageZoom.module.css";

const ImageZoom = (props) => {
  const {
    imageURL,
    zoomImageURL,
    placement,
    imageSize,
    zoomedImageSize,
    isActive,
    zoomType,
  } = props;

  let normalImageRef = useRef();
  let zoomedImageRef = useRef();

  const normalImageStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: `${imageSize.width}px ${imageSize.height}px`,
    width: `${imageSize.width}px`,
    height: `${imageSize.height}px`,
  };

  const zoomedImageStyle = {
    backgroundImage: `url(${zoomImageURL || imageURL})`,
    backgroundSize:
      zoomType === "click"
        ? `${zoomedImageSize.width}px ${zoomedImageSize.height}px`
        : `${zoomedImageSize.width * 1.5}px ${zoomedImageSize.height * 1.5}px`,
    backgroundRepeat: "no-repeat",
    width: `${zoomedImageSize.width}px`,
    height: `${zoomedImageSize.height}px`,
  };

  const openZoom = (e) => {
    if (zoomedImageRef.current) {
      moveLens(e);
    }

    const { onZoom } = props;
    onZoom && onZoom();
  };

  const closeZoom = () => {
    const { onClose } = props;
    onClose && onClose();
  };

  const getCursorPos = (e) => {
    let a,
      x = 0,
      y = 0;

    e = e || window.event;
    // @ts-ignore
    a = normalImageRef.current.getBoundingClientRect();
    // e.pageX -> horizontal position at which mouse was clicked = pageX
    // a.left -> ;
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    return { x, y };
  };

  const moveLens = (e) => {
    const viewArea = zoomedImageRef.current;
    e.preventDefault();
    const { x, y } = getCursorPos(e); 
    // @ts-ignore
    viewArea.style.backgroundPosition = `-${x}px -${y}px`;
  };

  const eventType =
    zoomType === "click"
      ? {
          onClick: isActive ? closeZoom : openZoom,
        }
      : {
          onMouseMove: openZoom,
          onMouseLeave: closeZoom,
          onTouchMove: openZoom,
          onTouchEnd: closeZoom,
          onTouchCancel: closeZoom,
        };

  return (
    <>
      <div
        className={cx(styles.normalImage, { [styles.zoomOutCursor]: isActive })}
        style={normalImageStyle}
        //@ts-ignore
        ref={normalImageRef}
        {...eventType}
      >
        {isActive && (
          <div
            className={cx(styles.zoomedImage, styles[placement])}
            style={zoomedImageStyle}
            //@ts-ignore
            ref={zoomedImageRef}
          ></div>
        )}
      </div>
    </>
  );
};

ImageZoom.propTypes = {
  imageURL: PropTypes.string.isRequired,
  zoomImageURL: PropTypes.string.isRequired,
  placement: PropTypes.oneOf([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "center",
  ]).isRequired,
  imageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  zoomedImageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  isActive: PropTypes.bool.isRequired,
  onZoom: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  zoomType: PropTypes.oneOf(["click", "hover"]).isRequired,
};

ImageZoom.defaultProps = {
  zoomImageURL: "",
  placement: "top-right",
  imageSize: {
    width: 300,
    height: 300,
  },
  zoomedImageSize: {
    width: 600,
    height: 600,
  },
  isActive: false,
  zoomType: "hover",
};

export default ImageZoom;
