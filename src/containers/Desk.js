import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setVisibleCard } from '../modules/game'
import DeskDumb from '../components/Desk'

class Desk extends PureComponent {
  handleCardClick = (index) => {
    const { dispatch } = this.props

    dispatch(setVisibleCard(index))
  }

  render() {
    const { isPlaying } = this.props

    if (isPlaying) {
      return <DeskDumb {...this.props} onCardClick={this.handleCardClick} />
    }

    return null
  }
}

export default connect(state => state.game)(Desk)
