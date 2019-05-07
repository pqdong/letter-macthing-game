import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setStatistic } from '../modules/statistic'
import { getStatisticsFromLocalStorage } from '../utils'
import StatisticsDumb from '../components/Statistics'

class Statistics extends PureComponent {
  componentDidMount() {
    const statistics = getStatisticsFromLocalStorage()

    if (typeof statistics === 'object') {
      const { dispatch } = this.props

      dispatch(setStatistic(statistics))
    }
  }

  render() {
    return <StatisticsDumb {...this.props} />
  }
}

export default connect(state => state.statistic)(Statistics)
