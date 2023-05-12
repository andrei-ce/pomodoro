import { HeaderContainer } from './styles'
import logo from '../../assets/Logo.svg'
import { Scroll, Timer } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
