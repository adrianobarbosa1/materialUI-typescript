import {
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

export const ListItemLink: React.FC<IListItemLinkProps> = ({
  label,
  icon,
  to,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvePath = useResolvedPath(to);
  const math = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!math} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
