import { Navbar } from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
import { DefaultLayoutContainer } from './styles'

export default function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Navbar />
      {/* this component is to insert a component depending on the route */}
      <Outlet />
    </DefaultLayoutContainer>
  )
}
