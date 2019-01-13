import * as React from 'react';
import LazyImage from '~components/blocks/LazyImage';

import { buildImageGrid, getScreenSize, getRealScreenWidth } from '~helpers';
import { IFetchedData, ScreenSize, IFetchedDataItem } from '~types';
import { MAX_IMAGES_GRID_WIDTH } from '~constants';
import './style.scss';

export interface IImageGridProps {
  data: IFetchedData;
  handleUserClick?: (item: IFetchedDataItem) => void;
}

class ImageGrid extends React.PureComponent<IImageGridProps> {
  getColumnCount = () => {
    const columnsCount = {
      [ScreenSize.mobile]: 1,
      [ScreenSize.tablet]: 2,
      [ScreenSize.desktop]: 3,
      [ScreenSize.large]: 4,
    };
    const screenSize = getScreenSize();
    return columnsCount[screenSize];
  }

  renderImage = (item: IFetchedDataItem, width: number) => {
    return (
      <LazyImage
        src={item.thumbnail}
        alt={item.name}
        width={width}
      />
    );
  }

  handleClick = (item: IFetchedDataItem) => () => {
    const { handleUserClick } = this.props;
    if (handleUserClick) {
      handleUserClick(item);
    }
  }

  renderGridColumn = (imageWidth: number) => (column: IFetchedDataItem) => {
    return (
      <div key={column.id} className="grid-row">
        {this.renderImage(column, imageWidth)}
        <div
          className="card-description"
          onClick={this.handleClick(column)}
        >
          {column.name}
        </div>
      </div>
    );
  }

  renderGrid = (imageWidth: number, columnsCount: number) =>
  (item: IFetchedDataItem[], index: number) => {

    const percentage = 100 / columnsCount;
    const style = {
      flexGrow: percentage,
      maxWidth: `${percentage}%`,
    };
    return (
      <div
        key={`grid-column-${index}`}
        className="grid-column"
        style={style}
      >
        {item.map(this.renderGridColumn(imageWidth))}
      </div>
    );
  }

  renderFullGrid = () => {
    const { data } = this.props;
    const columnsCount = this.getColumnCount();
    const gridData = buildImageGrid(data, columnsCount);
    const realWidth = getRealScreenWidth();
    const imageWidth = realWidth / columnsCount;
    return gridData.map(this.renderGrid(imageWidth, columnsCount));
  }

  render() {
    return (
      <div className="grid-container">
        <div
          className="grid-wrapper"
          style={{ maxWidth: `${MAX_IMAGES_GRID_WIDTH}px` }}
        >
          {this.renderFullGrid()}
        </div>
      </div>
    );
  }
}

export default ImageGrid;
