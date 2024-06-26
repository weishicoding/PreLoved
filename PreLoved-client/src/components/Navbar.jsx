import React from 'react'
import theme from '../theme'
import logo from '../assets/images/second-hand.png'
import {AppBar, Badge, Box, ImageList, ImageListItem, InputAdornment, InputBase, Toolbar, Typography, styled} from '@mui/material'
import {FavoriteBorderOutlined, Height, LocalFireDepartmentOutlined, PersonOutlineOutlined, SearchOutlined, ShoppingCartOutlined} from '@mui/icons-material'

export const Navbar = () => {
	const logoStyle = ({
		width: 100,
		height: 50
	})
  const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
      color: theme.palette.dark,
      backgroundColor: theme.palette.primary.main
    }
  }))

  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
  })

  const Search = styled('div')(({theme}) => ({
    backgroundColor: 'rgb(242, 242, 242)',
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '30%'
  }))

  const Logo = styled('div')(({theme}) => ({
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
		textAlign: "center",
  }))

  const Icons = styled(Box)(({theme}) => ({
    display: 'flex',
    gap: 25,
		width: '30%',
		justifyContent: "flex-end"
  }))

  return (
    <>
      <AppBar position="static">
        <Typography variant="h6" textAlign="center" padding="10px">
          Your favorite selection of second hand
        </Typography>
      </AppBar>
      <AppBar position="static" sx={{backgroundColor: theme.palette.primary.white, padding: '0 10px'}}>
        <StyledToolbar>
          <Search>
            <InputBase
              placeholder="Search for brand or product"
              fullWidth
              endAdornment={
                <InputAdornment position="start">
                  <SearchOutlined></SearchOutlined>
                </InputAdornment>
              }
            ></InputBase>
          </Search>
          <Logo>
              <img src={logo} style={logoStyle}></img>
          </Logo>

          <Icons>
            <StyledBadge badgeContent="new">
              <LocalFireDepartmentOutlined></LocalFireDepartmentOutlined>
            </StyledBadge>
            <StyledBadge>
              <FavoriteBorderOutlined></FavoriteBorderOutlined>
            </StyledBadge>
            <StyledBadge>
              <PersonOutlineOutlined></PersonOutlineOutlined>
            </StyledBadge>
            <StyledBadge badgeContent={4}>
              <ShoppingCartOutlined></ShoppingCartOutlined>
            </StyledBadge>
          </Icons>
        </StyledToolbar>
      </AppBar>
    </>
  )
}
