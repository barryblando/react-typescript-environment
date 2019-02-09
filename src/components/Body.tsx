import React, { PureComponent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from '../styles/index.scss';
import buttonsStyles from '../styles/button.scss';
import body from '../styles/body.scss';

const FIRST_IMAGE_ID = 1;
const SECOND_IMAGE_ID = 2;

export class Body extends PureComponent<IBody, {}> {
  _handleClick = () => {
    const { imageToShow, switchImage } = this.props;
    if (imageToShow === FIRST_IMAGE_ID) {
      return switchImage ? switchImage(SECOND_IMAGE_ID) : {};
    }
    return switchImage ? switchImage(FIRST_IMAGE_ID) : {};
  }

  _getImage = () => {
    const { imageToShow } = this.props;

    return imageToShow;
  }

  render() {
    const imageToShow = this._getImage();

    return (
      <div className={styles.body}>
        <button type='button' onClick={this._handleClick} className={buttonsStyles.button}>
          <TransitionGroup className={body.animWrap}>
            <CSSTransition classNames='mainImage' timeout={500} key={imageToShow}>
              <img className={styles.bodyImg} src={`../assets/${imageToShow}.png`} alt='main_img' />
            </CSSTransition>
          </TransitionGroup>
        </button>
      </div>
    );
  }
}

export default Body;
