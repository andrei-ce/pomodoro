import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// no efault exports:
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartButton,
  TaskInput,
} from './styles'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, { message: 'Please define the task name' }),
  minutesSet: zod
    .number()
    .min(5, { message: 'Please set a min of 5 minutes' })
    .max(60, { message: 'Set a min of 1 hour' }),
})

// 1) interfaces are generally to define objects, types are to infer
// 2) whwnever Iwant to refer to a JS variable in a TS functionality, use topeof
type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: { task: '', minutesSet: 0 },
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitButtonDisabled = !task

  // destructure formState from useForm to use it below:
  // console.log(formState.errors)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I&apos;ll work on</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Give a name to your task"
            // this register function will return other functions like onChange, etc.
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Project 155" />
            <option value="Project 20" />
            <option value="Project C" />
            <option value="Task A" />
          </datalist>

          <label htmlFor="minutesSet">for</label>
          <MinutesInput
            type="number"
            step={5}
            min={5}
            max={60}
            id="minutesSet"
            placeholder="00"
            {...register('minutesSet', {
              required: true,
              valueAsNumber: true,
            })}
          />

          <span>minutes</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartButton disabled={isSubmitButtonDisabled} type="submit">
          <Play size={24} />
          Start
        </StartButton>
      </form>
    </HomeContainer>
  )
}
