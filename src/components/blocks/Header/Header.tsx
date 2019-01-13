import * as React from 'react';
import { withRouter } from 'react-router';
import { ICommonComponentProps, IComponentState } from './types';
import { LANDING_PAGE_ENDPOINT } from '~constants';
import './style.scss';

class Header extends React.Component<ICommonComponentProps, IComponentState> {
  headerWrapper: React.RefObject<HTMLDivElement> = React.createRef();

  handleScrollChange = () => {
    const { current } = this.headerWrapper;
    if (current) {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        current.classList.add('small');
      } else {
        current.classList.remove('small');
      }
    }
  }

  handleChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onSetFilterValue) {
      this.props.onSetFilterValue(event.target.value);
    }
  }

  handleIconClick = () => {
    this.props.history.push(LANDING_PAGE_ENDPOINT);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollChange);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollChange);
  }

  renderRightHeaderSide = () => {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <div>{currentUser.name}</div>
      );
    }

    return (
      <input
        className="search-input"
        placeholder="Search..."
        onChange={this.handleChangeSearchInput}
      />
    );
  }

  render() {
    return (
      <div id="header" className="header-wrapper" ref={this.headerWrapper}>
        <div className="title" onClick={this.handleIconClick}>
          <div className="logo"/>
          <div>Network</div>
        </div>
        {this.renderRightHeaderSide()}
      </div>
    );
  }
}

export default withRouter(Header);
