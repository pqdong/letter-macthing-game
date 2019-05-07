import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import Card from './Card'
import { LEVELS } from '../constants'

export default class DeskDumb extends PureComponent {
  handleCardClick = (isCardVisibled, isEliminated, index) => {
    const { visibledCards, onCardClick } = this.props

    if (!isCardVisibled && !isEliminated && visibledCards.length < 2) {
      return onCardClick(index)
    }

    return null
  }

  renderCardByState = (col, letter, index) => {
    const { visibledCards, eliminatedCards } = this.props
    const isCardVisibled = visibledCards.indexOf(index) > -1
    const isCardEliminated = eliminatedCards.indexOf(index) > -1

    return (
      <Col key={letter + index} span={col}>
        <Card
          index={index}
          isVisibled={isCardVisibled}
          isEliminated={isCardEliminated}
          content={letter}
          onClick={this.handleCardClick}
        />
      </Col>
    )
  }

  render() {
    const { level, grid } = this.props
    const levelObject = LEVELS[level]
    const totalCols = Math.round(grid.length / levelObject.cols)
    const col = 24 / totalCols

    return (
      <Row gutter={2} type="flex">
        {grid.map((letter, index) => this.renderCardByState(col, letter, index))}
      </Row>
    )
  }
}
