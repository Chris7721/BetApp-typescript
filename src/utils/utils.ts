import {betSlip} from '../types/types'

export const shortenText = (text: string, startingPoint: number, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(startingPoint, maxLength)}...` : text
}

export const convertObjectToArray = (object: any): betSlip[] => {
  if (object) {
    const betArrays = []
    const keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
      // const obj:betSlip = object[keys[i]]
      betArrays.push({betId: keys[i], betAmount: object[keys[i]].betAmount, time: object[keys[i]].time, win: object[keys[i]].win, selectedMatches: object[keys[i]].selectedMatches})
    }
    return betArrays
  }
  return []
}

export const months_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
