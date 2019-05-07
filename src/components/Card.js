import React from 'react'
import styles from './Card.module.css'

export default ({ index, isVisibled, isEliminated, content, onClick }) => (
  <div
    className={`${styles.card} ${isEliminated ? styles.hidden : ''}`}
    onClick={() => onClick(isVisibled, isEliminated, index)}
  >
    <div className={`${styles.flipContainer} ${isVisibled || isEliminated ? styles.flip : ''}`}>
      <div className={styles.flipper}>
        <div className={`${styles.cardFilpper} ${styles.front}`}>
        </div>
        <div className={`${styles.cardFilpper}  ${styles.back}`}>
          {content}
        </div>
      </div>
    </div>
  </div>
)