import React from 'react'
import { Row, Col } from 'antd'
import styles from './Statistics.module.css'

export default ({ won, lost, bestTime }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={2}>Won:</Col>
        <Col span={4}>{won}</Col>
      </Row>
      <Row gutter={16}>
        <Col span={2}>Lost:</Col>
        <Col span={4}>{lost}</Col>
      </Row>
      <Row gutter={16} className="margin-top">
        <Col span={2}>Best time:</Col>
        <Col span={4}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Easy</th>
                <th>Normal</th>
                <th>Hard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bestTime.easy}</td>
                <td>{bestTime.normal}</td>
                <td>{bestTime.hard}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}
