import * as React from 'react';
import { classnames } from '~helpers/classnames';
import './style.scss';

export interface ILoaderProps {
  isLoading?: boolean;
  className?: string;
}

const Loader = (props: ILoaderProps) => {
  const { isLoading, className } = props;
  if (!isLoading) {
    return (null);
  }
  const classes = classnames({
    dimmer: true,
    visible: isLoading || false,
    [className || '']: true,
  });
  return (
    <div className={classes} >
      <div className="loader" />
    </div>
  );
};

export default Loader;
