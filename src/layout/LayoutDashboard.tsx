import { ReactNode } from "react";

import {
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { useDrawerContext } from "../contexts/DrawerContext";

interface ILayoutDashboardProps {
  children?: ReactNode;
  titulo: string;
  barraFerramentas?: React.ReactNode;
}

export const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({
  children,
  titulo,
  barraFerramentas,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {titulo}
        </Typography>
      </Box>

      {barraFerramentas && <Box>{barraFerramentas}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
