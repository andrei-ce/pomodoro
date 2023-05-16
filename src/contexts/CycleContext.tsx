import { ReactNode, createContext, useState } from 'react'
// we're trying to keep the context library agnostic.
// if we do need a library, make sure it's not used in other parts of the application

interface Cycle {
  id: string
  task: string
  startingMinutes: number
  startDate: Date
  interruptionDate?: Date
  endDate?: Date
}

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

interface CycleContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleStateInterface)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsPassed(0) // otherwise we will reuse the secondsPassed from the previous task, if there was one
  }

  function markActiveCycleAsDone() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, endDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function stopActiveCycle() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptionDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
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
