import { ScreenSize } from '~/types';
import { MAX_IMAGES_GRID_WIDTH, MEDIA_BREAKPOINTS, DEFAULT_SCROLL_WIDTH } from '~constants';

export const getRealScreenWidth = () => {
  let scrollbarWidth = DEFAULT_SCROLL_WIDTH;
  if (window.innerWidth !== document.body.clientWidth) {
    scrollbarWidth = window.innerWidth - document.body.clientWidth;
  }
  const documentWidth = window.innerWidth;
  if (documentWidth < MAX_IMAGES_GRID_WIDTH) {
    return documentWidth - scrollbarWidth;
  }
  return MAX_IMAGES_GRID_WIDTH;
};

export const matchScreenSize = (screenWidth: number) => {
  if (screenWidth <= MEDIA_BREAKPOINTS.mobile) {
    return ScreenSize.mobile;
  }
  if (screenWidth <= MEDIA_BREAKPOINTS.tablet) {
    return ScreenSize.tablet;
  }
  if (screenWidth <= MEDIA_BREAKPOINTS.desktop) {
    return ScreenSize.desktop;
  }
  return ScreenSize.large;
};

export const getScreenSize = () => {
  return matchScreenSize(getRealScreenWidth());
};
