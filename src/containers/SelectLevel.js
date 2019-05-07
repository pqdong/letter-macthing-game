import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { Select, Button } from 'antd'
import values from 'lodash/values'
import { LEVELS } from '../constants'
import { setLevel, initializeGrid } from '../modules/game'
import { initializeGrid as initGrid } from '../utils'

const SelectOption = Select.Option

class SelectLevel extends PureComponent {
  handleChange = (value) => {
    const { dispatch } = this.props

    dispatch(setLevel(value))
  }

  handleStart = () => {
    const { level, dispatch } = this.props

    initGrid(level, grid => dispatch(initializeGrid(grid)))
  }

  render() {
    const { level, grid, isPlaying } = this.props
    const levels = values(LEVELS)
    const disabled = grid.length > 0 || isPlaying

    return (
      <Fragment>
        <Select
          value={level}
          dropdownMatchSelectWidth={false}
          disabled={disabled}
          onChange={this.handleChange}
        >
          <SelectOption value="">Select level</SelectOption>
          {levels.map(level => (
            <SelectOption
              key={level.value}
              value={level.value}
            >
              {level.label}
            </SelectOption>
          ))}
        </Select>

        <Button
          type="primary"
          className="margin-left"
          disabled={!level || disabled}
          onClick={this.handleStart}
        >
          Start
        </Button>
      </Fragment>
    )
  }
}

export default connect(state => state.game)(SelectLevel)
