import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  startingMinutes: number
  startDate: Date
  interruptionDate?: Date
  endDate?: Date
}
interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
  // secondsPassed: number
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      const { newCycle } = action.payload
      return {
        ...state,
        activeCycleId: newCycle.id,
        cycles: [...state.cycles, newCycle],
      }
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      return {
        ...state,
        activeCycleId: null,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptionDate: new Date() }
          } else {
            return cycle
          }
        }),
      }
    }
    case ActionTypes.FINISH_CURRENT_CYCLE: {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, endDate: new Date() }
          } else {
            return cycle
          }
        }),
      }
    }
    default:
      return state
  }
}
