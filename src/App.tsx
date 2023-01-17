import { BrowserRouter } from "react-router-dom";
import { Login, MenuLateral } from "./components";
import "./components/forms/TraducoesYup";
import { AuthProvider } from "./contexts";
import { DrawerProvider } from "./contexts/DrawerContext";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </DrawerProvider>

        </Login>

      </AppThemeProvider>
    </AuthProvider>
  );
};
