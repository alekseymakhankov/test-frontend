export const getImageSize = (
  realWidth: number,
  realHeight: number,
  width?: number,
  height?: number,
  squareMode?: boolean,
  ) => {
  if (squareMode) {
    if (height) {
      return { height, width: height };
    }
    if (width) {
      return { width, height: width };
    }
    return {
      width: realWidth,
      height: realWidth,
    };
  }

  if (width && height) {
    return { width, height };
  }

  if (width) {
    return {
      width,
      height: width * realHeight / realWidth,
    };
  }
  if (height) {
    return {
      height,
      width: height * realWidth / realHeight,
    };
  }
  return { width: realWidth, height: realHeight };
};
