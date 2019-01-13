import * as React from 'react';
import Loader from '~/components/blocks/Loader';
import Header from '~components/blocks/Header';

import { fetchData, resolveUserFriends } from '~/helpers';
import { ICommonComponentProps, IComponentState } from './types';

import './style.scss';
import { getUserById } from '~helpers/getUserById';
import {
  LANDING_PAGE_ENDPOINT,
  MAX_IMAGES_GRID_WIDTH,
  MEDIA_BREAKPOINTS,
  DEFAULT_SMALL_IMAGE_WIDTH,
  PROFILE_PAGE_ENDPOINT,
} from '~constants';
import LazyImage from '~components/blocks/LazyImage';
import { FetchedItemFieldName, IFetchedDataItem } from '~types';

const wrapperStyles = {
  maxWidth: MAX_IMAGES_GRID_WIDTH / 1.5,
};

const descriptionItems = [
  {
    id: 0,
    name: 'weight',
    description: 'Weight',
  },
  {
    id: 1,
    name: 'height',
    description: 'Height',
  },
  {
    id: 2,
    name: 'age',
    description: 'Age',
  },
  {
    id: 3,
    name: 'hair_color',
    description: 'Hair color',
    isColor: true,
  },
];

class ProfilePage extends React.Component<ICommonComponentProps, IComponentState> {
  wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props: ICommonComponentProps) {
    super(props);
    this.state = {
      imageWidth: DEFAULT_SMALL_IMAGE_WIDTH,
      user: null,
    };
  }

  static getDerivedStateFromProps(props: ICommonComponentProps, state: IComponentState) {
    const { remoteData, match: { params: { id } } } = props;
    const { user } = state;
    if (!user || (id && parseInt(id, 10) !== user.id)) {
      if (id && remoteData) {
        const existUser = getUserById(parseInt(id, 10), remoteData);
        if (existUser) {
          return { user: resolveUserFriends(existUser, remoteData) };
        }
      }
    }
    return { user };
  }

  componentDidMount() {
    this.handleRefreshData();
  }

  componentDidUpdate() {
    const { imageWidth } = this.state;
    const { current } = this.wrapperRef;
    if (current && imageWidth !== current.clientWidth) {
      this.setState({ imageWidth: current.clientWidth });
    }
  }

  componentDidCatch(error: any) {
    if (error) {
      this.props.openNotificationBar('Error', error.toString(), true);
    }
  }

  handleFriendClick = (item: IFetchedDataItem) => () => {
    this.props.onSetCurrentUser(item);
    this.props.history.push(`${PROFILE_PAGE_ENDPOINT}/${item.id}`);
  }

  handleRefreshData = () => {
    const {
      match: { params: { id } },
      history: { push },
      remoteData,
      onSetCurrentUser,
      onSetRemoteData,
      openNotificationBar,
    } = this.props;

    const { user: currentUser } = this.state;

    if (!id) {
      push(LANDING_PAGE_ENDPOINT);
      return;
    }

    if (!currentUser) {
      if (remoteData) {
        const existUser = getUserById(parseInt(id, 10), remoteData);
        if (existUser) {
          onSetCurrentUser(existUser);
        }
      } else {
        fetchData()
          .then((data) => {
            onSetRemoteData(data);
            const existUser = getUserById(parseInt(id, 10), data);
            if (existUser) {
              onSetCurrentUser(existUser);
            }
          })
          .catch(e => openNotificationBar('Error', e.message, true));
      }
    }
  }

  getImageSize = () => {
    const { imageWidth } = this.state;
    if (imageWidth < MEDIA_BREAKPOINTS.tablet) {
      return DEFAULT_SMALL_IMAGE_WIDTH;
    }
    return DEFAULT_SMALL_IMAGE_WIDTH;
  }

  renderProfile = () => {
    const { user: currentUser } = this.state;
    if (!currentUser) {
      return (null);
    }
    return (
      <div
        className="profile-wrapper"
        style={wrapperStyles}
        ref={this.wrapperRef}
      >
        <div className="user-name">{currentUser.name}</div>
        <div className="description-wrapper">
          <LazyImage
            src={currentUser.thumbnail}
            alt={currentUser.name}
            height={200}
            squareMode={true}
            className="avatar"
          />
          <div className="description-content">
            {descriptionItems.map((item) => {
              const customStyle = { color: 'inherit' };
              if (item.name === 'hair_color') {
                customStyle.color = currentUser.hair_color;
              }
              return (
                <div key={item.id} className="description-item">
                  <div className="name">{item.description}</div>
                  <div
                    className="value"
                    style={customStyle}
                  >
                    {currentUser[item.name as FetchedItemFieldName]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="friends-title">Friends</div>
        {this.renderFriendsBlock()}
      </div>
    );
  }

  renderFriendsBlock = () => {
    const { user: currentUser } = this.state;
    if (!currentUser) {
      return (null);
    }
    return (
      <div className="friends-wrapper">
        {currentUser.friends.map((friend) => {
          return (
            <div
              key={friend.id}
              className="item-wrapper"
              onClick={this.handleFriendClick(friend)}
            >
              <LazyImage
                src={friend.thumbnail}
                alt={friend.name}
                width={50}
                height={50}
                className="friend-avatar"
              />
              <div>{friend.name}</div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { remoteData, currentUser } = this.props;
    return (
      <div className="profile-page-wrapper">
        <Header currentUser={currentUser} />
        {this.renderProfile()}
        <Loader isLoading={!remoteData || !currentUser} />
      </div>
    );
  }
}

export default ProfilePage;
