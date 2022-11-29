import { BrowserRouter } from "react-router-dom";
import { MenuLateral } from "./components/menuLateral/MenuLateral";
import { DrawerProvider } from "./contexts/DrawerContext";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
