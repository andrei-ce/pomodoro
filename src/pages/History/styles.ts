import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5 rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.main`
  flex: 1;
  /* this overflow generates a scrollbar in cade content is wider than the div/main */
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    /* this border-collapse is to ignore double borders (border interception from both cells) */
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      /* line-height 160% */
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-right: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-right: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

// as const: we're telling TS that these strings will never vary
// try removing it and hovering the mouse over STATUS_COLOR

export interface StatusProps {
  // statusColor: 'yellow' | 'red' | 'green'

  // the line below avoid us having to add colors in both places
  // "typeof" is needed because TS cannot read a JS object, just its types
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    /* if there is no content it won't show!!! We add it even if blank*/
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 99px;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
