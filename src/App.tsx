import { BrowserRouter } from "react-router-dom"
import { AppThemeProvider } from "./contexts/ThemeContext"
import { AppRoutes } from "./routes"

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  )
}
