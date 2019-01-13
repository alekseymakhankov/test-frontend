import * as React from 'react';
import Loader from '~components/blocks/Loader';

import { getImageSize, classnames } from '~helpers';

import './style.scss';

export interface IImageSize {
  width: number;
  height: number;
}

export interface ILazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  autoWidth?: boolean;
  squareMode?: boolean;
  className?: string;
}

export interface ILazyImageState {
  loaded: boolean;
  error: boolean;
  imageSize: IImageSize;
}

class LazyImage extends React.Component<ILazyImageProps, ILazyImageState> {
  nativeImage: HTMLImageElement | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
      imageSize: { width: 200, height: 100 },
    };
  }

  componentDidMount() {
    this.nativeImage = document.createElement('img');
    this.loadImage();
  }

  componentWillUnmount() {
    this.nativeImage = null;
  }

  loadImage = () => {
    const { src } = this.props;
    if (this.nativeImage) {
      this.nativeImage.src = src;
      this.nativeImage.onload = this.onLoad;
      this.nativeImage.onerror = this.onError;
    }
  }

  onLoad = () => {
    if (this.state.loaded) {
      return;
    }
    if (this.nativeImage) {
      const { width, height } = this.nativeImage;
      this.setState(
        {
          loaded: true,
          error: false,
          imageSize: { width, height },
        },
      );
    }
  }

  onError = () => {
    this.setState({ loaded: false, error: true });
  }

  calculateImageSize = () => {
    const { width, height, squareMode } = this.props;
    const { imageSize: { width: realWidth, height: realHeight } } = this.state;
    return getImageSize(realWidth, realHeight, width, height, squareMode);
  }

  renderImage = () => {
    const { loaded } = this.state;
    const { src, alt, autoWidth, className } = this.props;

    if (!loaded) {
      return (
        <div className="image-loader">
          <Loader isLoading={true} />
        </div>
      );
    }

    const { width, height } = this.calculateImageSize();
    return (
      <img
        src={src}
        alt={alt}
        width={autoWidth ? '100%' : width}
        height={height}
        className={classnames({ 'custom-image': true, [className || '']: true })}
      />
    );
  }

  render() {
    return this.renderImage();
  }
}

export default LazyImage;
