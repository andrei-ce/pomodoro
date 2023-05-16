import { useContext, useEffect } from 'react'
import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../../contexts/CycleContext'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markActiveCycleAsDone,
    secondsPassed,
    updateSecondsPassed,
  } = useContext(CycleContext)

  const startingSeconds = activeCycle ? activeCycle.startingMinutes * 60 : 0

  const currentSeconds = activeCycle ? startingSeconds - secondsPassed : 0

  const remainingMinutes = Math.floor(currentSeconds / 60)
  const remainingSeconds = currentSeconds % 60

  const minutesDisplaying = String(remainingMinutes).padStart(2, '0')
  const secondsDisplaying = String(remainingSeconds).padStart(2, '0')

  useEffect(() => {
    let activeInterval: number

    if (activeCycle) {
      activeInterval = setInterval(() => {
        // setSecondsPassed(secondsPassed + 1) --> this is not done because setInterval is not a precise method
        // so we always compare how many seconds have passed since the start date
        const secondsRemaining = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsRemaining >= startingSeconds) {
          markActiveCycleAsDone()
          updateSecondsPassed(startingSeconds)
          clearInterval(activeInterval)
        } else {
          updateSecondsPassed(secondsRemaining)
        }
      }, 1000)
    }

    return () => {
      clearInterval(activeInterval)
    }
  }, [
    activeCycle,
    startingSeconds,
    activeCycleId,
    markActiveCycleAsDone,
    updateSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesDisplaying}:${secondsDisplaying}`
    }
  }, [minutesDisplaying, secondsDisplaying, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutesDisplaying[0]}</span>
      <span>{minutesDisplaying[1]}</span>
      <Separator>:</Separator>
      <span>{secondsDisplaying[0]}</span>
      <span>{secondsDisplaying[1]}</span>
    </CountDownContainer>
  )
}
