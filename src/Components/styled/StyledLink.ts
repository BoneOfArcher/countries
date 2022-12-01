import { styled } from "@mui/material";
import { Link } from "react-router-dom"


export const StyledLink = styled(Link)`
  text-decoration: none;

  &:active,
  &:visited {
    color: ${props => props.theme.palette.text.primary}
  }
`