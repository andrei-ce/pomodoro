import { FormContainer, MinutesInput, TaskInput } from './styles'

import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../contexts/CycleContext'

export function CycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I&apos;ll work on</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Give a name to your task"
        disabled={!!activeCycle}
        // this register function will return other functions like onChange, etc.
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Project 155" />
        <option value="Project 20" />
        <option value="Project C" />
        <option value="Task A" />
      </datalist>

      <label htmlFor="startingMinutes">for</label>
      <MinutesInput
        type="number"
        step={5}
        min={5}
        max={60}
        id="startingMinutes"
        placeholder="00"
        disabled={!!activeCycle}
        {...register('startingMinutes', {
          valueAsNumber: true,
        })}
      />

      <span>minutes</span>
    </FormContainer>
  )
}
