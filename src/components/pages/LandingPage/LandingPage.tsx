import * as React from 'react';
import Loader from '~/components/blocks/Loader';
import ImageGrid from '~/components/blocks/ImageGrid';
import Header from '~components/blocks/Header';
import { fetchData } from '~/helpers';
import { ICommonComponentProps, IComponentState } from './types';

import './style.scss';
import { IFetchedDataItem } from '~types';
import { PROFILE_PAGE_ENDPOINT } from '~constants';

class LandingPage extends React.PureComponent<ICommonComponentProps, IComponentState> {
  constructor(props: ICommonComponentProps) {
    super(props);
    this.state = {
      isDataLoading: false,
    };
  }
  componentDidMount() {
    const { remoteData, openNotificationBar } = this.props;
    if (!remoteData) {
      this.setState({ isDataLoading: true }, () => {
        fetchData()
          .then((data) => {
            this.setState({ isDataLoading: false });
            this.props.onSetRemoteData(data);
          })
          .catch((e) => {
            openNotificationBar('Error', e.message, true);
            this.setState({ isDataLoading: false });
          });
      });
    }
  }

  componentDidCatch(error: any) {
    if (error) {
      this.props.openNotificationBar('Error', error.toString(), true);
    }
  }

  handleUserClick = (item: IFetchedDataItem) => {
    this.props.onSetCurrentUser(item);
    this.props.history.push(`${PROFILE_PAGE_ENDPOINT}/${item.id}`);
  }

  renderImageGrid = () => {
    const { remoteData } = this.props;
    if (!remoteData) {
      return (null);
    }
    return (
      <ImageGrid data={remoteData} handleUserClick={this.handleUserClick} />
    );
  }

  render() {
    const { isDataLoading } = this.state;
    return (
      <div className="landing-page-wrapper">
        <Header />
        {this.renderImageGrid()}
        <Loader isLoading={isDataLoading} />
      </div>
    );
  }
}

export default LandingPage;
