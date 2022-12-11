import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AppBarComp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: session } = useSession();

  const HandleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const HandleMenuClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Link href="/">
            <Typography sx={{ color: "white" }}>Fast E-Resoucrces</Typography>
          </Link>
          <Link href="/course">
            <Button sx={{ color: "white", display: "block", ml: 2 }}>
              Courses
            </Button>
          </Link>
          <Link href="/upload">
            <Button sx={{ color: "white", display: "block", mr: 1 }}>
              Upload
            </Button>
          </Link>
          {session?.type === "admin" ? (
            <Link href="/admin">
              <Button sx={{ color: "white", display: "block", mr: 1 }}>
                Admin
              </Button>
            </Link>
          ) : null}

          <Box>
            <IconButton size="large" onClick={HandleMenuOpen}>
              <Avatar src={session?.user.image} alt="User Picture" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={HandleMenuClose}
              onClick={HandleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {!session ? (
                <MenuItem onClick={signIn}>Login</MenuItem>
              ) : (
                <div>
                  <Typography sx={{ p: 2 }}>{session?.user.name}</Typography>
                  <Divider />
                  <Link href="/account">
                    <MenuItem sx={{ color: "black", textDecoration: "none" }}>
                      My Account
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={signOut}>Sign Out</MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
