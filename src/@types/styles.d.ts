import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// this line is needed to infer types from degaultTheme into the new variable ThemeType
type ThemeType = typeof defaultTheme

// create new type definitions into the module 'styled-components'
// it's important to import it (line #1) because otherwise I would be re-creating (overwrite?) it
// so the lines below will add the defaultTheme interface as an extension of a theme (see DefaultTheme in @types/styled-components)
// BTW DetaultTheme is blank in @types/styled-components, so we~re creating it from scratch
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
