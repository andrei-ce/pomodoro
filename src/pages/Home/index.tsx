import { Play } from '@phosphor-icons/react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartButton,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I&apos;ll work on</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Give a name to your task"
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

        <StartButton disabled type="submit">
          <Play size={24} />
          Start
        </StartButton>
      </form>
    </HomeContainer>
  )
}
