"use client";
import { menus } from "@/app/constants";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

interface MenuItem {
  title: string;
  link: string;
}
const pages = ["Shop", "Recipes", "Learn", "About", "Blog"];

function ResponsiveAppBar({ subMenus = [] }: { subMenus?: MenuItem[] }) {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickNavMenu = (menu: MenuItem) => {
    setAnchorElNav(null);

    router.push(menu.link);
  };

  return (
    <>
      <AppBar position="static" className="bg-background shadow-none">
        <Container maxWidth="lg">
          <Toolbar disableGutters className="flex flex-row items-center">
            <Box className="relative hidden w-16 self-start lg:flex">
              <Image
                loader={() => "https://picsum.photos/64/112"}
                src={"https://picsum.photos/64/112"}
                alt="logo"
                fill
                className="h-28 w-16"
              />
            </Box>

            <Box className="flex grow lg:hidden">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                className="text-primary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                className="block lg:hidden"
              >
                {menus.map((menu) => (
                  <MenuItem
                    key={menu.title}
                    onClick={() => handleClickNavMenu(menu)}
                  >
                    <Typography textAlign="center">{menu.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box className="hidden grow gap-4 lg:flex">
              {menus.map((menu) => (
                <Button
                  key={menu.title}
                  onClick={() => handleClickNavMenu(menu)}
                  className="my-2 block text-primary decoration-border decoration-2 hover:underline hover:underline-offset-4"
                >
                  {menu.title}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar position="static" className="bg-secondary shadow">
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            className="flex flex-row items-center lg:ml-20"
          >
            <Box className="flex grow gap-4">
              {subMenus.map((menu) => (
                <Button
                  key={menu.title}
                  onClick={() => handleClickNavMenu(menu)}
                  className="my-2 block text-primary decoration-border decoration-2 hover:underline hover:underline-offset-4"
                >
                  {menu.title}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
