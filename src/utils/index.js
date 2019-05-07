import shuffle from 'lodash/shuffle'
import set from 'lodash/set'
import { LEVELS, STATISTIC_LOCAL_STORAGE_KEY } from '../constants'

export function getStatisticsFromLocalStorage() {
  const statistics = localStorage.getItem(STATISTIC_LOCAL_STORAGE_KEY)

  if (statistics && typeof statistics === 'string') {
    try {
      return JSON.parse(statistics)
    } catch (error) {
      console.log(error)

      return false
    }
  }

  return {
    won: 0,
    lost: 0,
    bestTime: {
      easy: '--:--',
      normal: '--:--',
      hard: '--:--'
    }
  }
}

export function setStatisticsToLocalStorage(values = []) {
  const statistics = getStatisticsFromLocalStorage()

  values.forEach(({ path, value }) => {
    if (path) {
      set(statistics, path, value)
    }
  })

  localStorage.setItem(STATISTIC_LOCAL_STORAGE_KEY, JSON.stringify(statistics))

  return statistics
}

export function randomLetter() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26))
}

export const generateGrid = (level = {}) => {
  const { cols, rows } = level
  const total = cols * rows / 2
  const grid = []

  for (let i = 0; i < total; i++) {
    const letter = randomLetter()

    grid.push(letter)
  }

  return shuffle([...grid, ...shuffle(grid)])
}

export const initializeGrid = (level, cb) => {
  if (LEVELS[level] && cb) {
    const grid = generateGrid(LEVELS[level])

    cb(grid)
  }
}

export const setVisibledCards = (visibledCards, index) => {
  switch (visibledCards.length) {
    case 0:
      return [index]
    case 1:
      return [...visibledCards, index]
    default:
      return []
  }
}

export const checkMatchingCards = ({ grid, visibledCards, eliminatedCards }, index) => {
  let isMatch
  let nextVisibledCards = setVisibledCards(visibledCards, index)
  let nextEliminatedCards = eliminatedCards

  if (nextVisibledCards.length === 2) {
    const firstCardIndex = nextVisibledCards[0]
    const firstCard = grid[firstCardIndex]
    const secondCard = grid[index]

    if (firstCard === secondCard) {
      isMatch = true
      nextEliminatedCards = [...nextEliminatedCards, ...nextVisibledCards]
    } else {
      isMatch = false
    }
  }

  return {
    isMatch,
    visibledCards: nextVisibledCards,
    eliminatedCards: nextEliminatedCards
  }
}

export const checkGameCompleted = (grid, visibledCards, eliminatedCards) => {
  if (grid.length && eliminatedCards.length &&
      grid.length === eliminatedCards.length &&
      visibledCards.length === 0) {
    return true
  }

  return false
}

export const convertMintuesStringToSecondsNumber = (str = '') => {
  if (str) {
    const arr = str.split(':')

    return 1 * arr[0] * 60 + 1 * arr[1];
  }

  return false
}

export const seccondsToTimeString = (timeInSeconds) => {
  const pad = function(num, size) { return ('000' + num).slice(size * -1); }
  const time = parseFloat(timeInSeconds).toFixed(3)
  const minutes = Math.floor(time / 60) % 60
  const seconds = Math.floor(time - minutes * 60)

  return pad(minutes, 2) + ':' + pad(seconds, 2)
}
