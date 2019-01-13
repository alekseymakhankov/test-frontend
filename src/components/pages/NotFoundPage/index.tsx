import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LANDING_PAGE_ENDPOINT } from '~constants';
import './style.scss';

const NotFoundPage = (props: RouteComponentProps) => {
  return (
    <section className="not-found-page-wrapper">
      <div className="title">Sorry, but page not found</div>
      <div
        className="link"
        onClick={() => props.history.push(LANDING_PAGE_ENDPOINT)}
      >
        To home
      </div>
    </section>
  );
};

export default withRouter(NotFoundPage);
