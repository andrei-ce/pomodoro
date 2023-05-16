import {
  HomeContainer,
  StartContDownButton,
  StopContDownButton,
} from './styles'

import { HandPalm, Play } from '@phosphor-icons/react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'

import { CycleForm } from './CycleForm'
import { CountDown } from './Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { CycleContext } from '../../contexts/CycleContext'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, { message: 'Please define the task name' }),
  startingMinutes: zod
    .number()
    .min(5, { message: 'Please set a min of 5 minutes' })
    .max(60, { message: 'Set a min of 1 hour' }),
})

// 1) interfaces are generally to define objects, types are to infer
// 2) whenever I want to refer to a JS variable in a TS functionality, use topeof
type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export function Home() {
  const { createNewCycle, stopActiveCycle, activeCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: { task: '', startingMinutes: 0 },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isStartButtonDisabled = !task
  const isStopButtonDisabled = activeCycle?.endDate !== undefined

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <CycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopContDownButton
            onClick={stopActiveCycle}
            disabled={isStopButtonDisabled}
            type="button"
          >
            <HandPalm size={24} />
            Stop
          </StopContDownButton>
        ) : (
          <StartContDownButton disabled={isStartButtonDisabled} type="submit">
            <Play size={24} />
            Start
          </StartContDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
