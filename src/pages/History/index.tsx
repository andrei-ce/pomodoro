import { useContext } from 'react'
import { CycleContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h1>My history</h1>

      <pre>{JSON.stringify(cycles, null, 3)}</pre>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="yellow">In progress</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="red">Stopped</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="green">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>1 month ago</td>
              <td>
                <Status statusColor="red">Stopped</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
