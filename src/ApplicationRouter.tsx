import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '~components/pages/LandingPage';
import ProfilePage from '~components/pages/ProfilePage';
import NotFoundPage from '~components/pages/NotFoundPage';
import NotificationBar from '~components/blocks/NotificationBar';

import { LANDING_PAGE_ENDPOINT, PROFILE_PAGE_ID_ENDPOINT } from '~/constants';

const ApplicationRouter = () => {
  return (
    <Router>
      <div className="application-wrapper">
        <Switch>
          <Route path={LANDING_PAGE_ENDPOINT} exact={true} component={LandingPage} />
          <Route path={PROFILE_PAGE_ID_ENDPOINT} component={ProfilePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <NotificationBar />
      </div>
    </Router>
  );
};

export default ApplicationRouter;
