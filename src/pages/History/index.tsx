import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>My history</h1>
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
