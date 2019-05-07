import React from 'react'
import styles from './Header.module.css'

export default ({ children }) => {
  return (
    <header className={styles.header}>{children}</header>
  )
}
