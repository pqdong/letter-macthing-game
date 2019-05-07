import React from 'react'
import styles from './Body.module.css'

export default ({ children }) => {
  return (
    <section className={styles.body}>{children}</section>
  )
}
