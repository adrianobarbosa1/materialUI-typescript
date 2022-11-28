import { Routes, Route, Navigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useAppThemeContext } from "../contexts/ThemeContext"

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext()

  return (
    <Routes>
      <Route
        path="paginainicial"
        element={
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            Teste
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/paginainicial" />} />
    </Routes>
  )
}
