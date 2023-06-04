import { Link, Typography } from "@mui/material";

export const Footer = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Created by '}
      <Link color="inherit" href="https://twitter.com/dangerworm/">
        Drew Morgan
      </Link>
    </Typography>
  );
}