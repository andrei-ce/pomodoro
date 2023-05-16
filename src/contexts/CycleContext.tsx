// we're trying to keep the context library agnostic.
// if we do need a library, make sure it's not used in other parts of the application

import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  startingMinutes: number
}

interface CycleStateInterface {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsPassed: number
  updateSecondsPassed: (s: number) => void
  createNewCycle: (data: CreateCycleData) => void
  stopActiveCycle: () => void
  markActiveCycleAsDone: () => void
}

export const CycleContext = createContext({} as CycleStateInterface)

interface CycleContextProviderProps {
  children: ReactNode
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    // this is an argument that the reducer receives to restore state when initialized
    // initialState is inferred from the second argument
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateAsJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateAsJSON)
  }, [cyclesState])

  function updateSecondsPassed(s: number) {
    setSecondsPassed(s)
  }

  function createNewCycle(data: any) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      startingMinutes: data.startingMinutes,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setSecondsPassed(0) // otherwise we will reuse the secondsPassed from the previous task, if there was one
  }

  function markActiveCycleAsDone() {
    dispatch(finishCurrentCycleAction())
  }

  function stopActiveCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        secondsPassed,
        markActiveCycleAsDone,
        updateSecondsPassed,
        createNewCycle,
        stopActiveCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
