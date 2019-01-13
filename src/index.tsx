import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ApplicationRouter from './ApplicationRouter';
import { getStore } from '~store/configureStore';

import './registerServiceWorker';

import '~styles/index.scss';

const store = getStore();

export default class Application extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ApplicationRouter />
      </Provider>
    );
  }
}

ReactDOM.render(
  <Application />,
  (
    document.getElementById('root') ||
    (document.createElement('div'))
  ) as HTMLElement,
);
