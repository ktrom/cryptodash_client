import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { t } from "i18next";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { COLORS } from "../../colors";
import { Coin, getCoins, getCoinSuggestions } from "../../Util/CoinUtil";
import { Outlet, useNavigate } from "react-router-dom";

const HomeNav = styled("div")(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "100%",
  },
}));

const StyledListItemText = styled(ListItemText)(({ color }) => ({
  color: color || "black",
}));

const StyledListItem = styled(ListItem)(( {theme} ) => ({
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "lightgrey",
  },
}));

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  // borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchListContainer = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  position: "absolute",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "100%",
  },
}));

const StyledList= styled(List)(({ theme }) => ({
  maxHeight: 300,
  overflow: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [searchBarAnchorEl, setSearchBarAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(profileMenuAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSearchBarOpen = Boolean(searchBarAnchorEl);
  const [searchText, setSearchText] = React.useState<string>("");
  const [coinList, setCoinList] = React.useState<Coin[]>([]);
  const navigate = useNavigate();

  const coinSecondaryText = (coin: Coin): string => {
    const dollarValue: number = parseFloat(coin.price);
    const valueAsString : string = dollarValue.toLocaleString(undefined, {maximumFractionDigits: 2});
    return dollarValue && valueAsString !== "0" ? `${valueAsString} USD` : "";
  }


  const handleHomeNavigate = () => {
    navigate("../home");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleSearchBarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSearchBarAnchorEl(event.currentTarget);
  };

  const handleSearchBarBlur = () => {
    setSearchBarAnchorEl(null);
    getCoins();
  };

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const navigateToProfilePage = () => {
    setProfileMenuAnchorEl(null);
    handleMobileMenuClose();

    navigate("../profile");
  };

  const handleSearchBarClose = () => {
    setSearchBarAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const coinlist = await getCoinSuggestions(searchText);
      setCoinList(coinlist);
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchText])


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={navigateToProfilePage}
    >
      <MenuItem onClick={navigateToProfilePage}>{t("profile")}</MenuItem>
      <MenuItem onClick={navigateToProfilePage}>My account</MenuItem>
    </Menu>
  );

  const appBarListId = "primary-search-bar-list";
  const appBarList = (
    <Menu
      anchorEl={searchBarAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={appBarListId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isSearchBarOpen}
      onClose={navigateToProfilePage}
    >
      <MenuItem onClick={navigateToProfilePage}>{t("profile")}</MenuItem>
      <MenuItem onClick={navigateToProfilePage}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={1} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: COLORS.darkblue }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <HomeNav onClick={handleHomeNavigate}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {t("cryptodash")}
          </Typography>
          </HomeNav>
          <SearchContainer onBlur={handleSearchBarBlur}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchText}
                onClick={handleSearchBarOpen}
                onChange={handleSearchInputChange}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {searchBarAnchorEl &&  (
              <SearchListContainer>
                {coinList.length > 0 ? (
                  <StyledList dense={false}>
                  {coinList.map((coin) => 
                    <StyledListItem key={coin.uuid}>
                      <ListItemAvatar>
                        <Avatar src={coin.iconUrl}/>
                      </ListItemAvatar>
                      <StyledListItemText
                        color={coin.color}
                        primary={coin.name}
                        secondary={coinSecondaryText(coin)}
                      />
                    </StyledListItem>,
                  )}
                </StyledList>
                ) : (
                  <ListItem key={"None"}>
                      <StyledListItemText
                        primary={"No Coins Found"}
                      />
                    </ListItem>
                )}
              </SearchListContainer>
            )}
          </SearchContainer>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    <Outlet/>
    </React.Fragment>
  );
}
