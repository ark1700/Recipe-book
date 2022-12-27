import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Logo, Profile, Search, SearchIconWrapper, StyledInputBase } from './styles';
import { Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { getSession, useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session} = useSession();
  return (
    <Box sx={{
      padding: 1,
      backgroundColor: (theme)=> theme.palette.primary.main,
      color: (theme)=> theme.palette.primary.contrastText,
    }}>
      <Container sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}>
        <Logo href='/' passHref>
          <img src="/cupcake.png" alt="Logo" width="100%" height="100%"/>
          <Typography
            variant="h6"
            noWrap
            component="span"
          >Recipe book</Typography>
        </Logo>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Profile href="/profile" passHref>
          <AccountCircleIcon color="inherit"></AccountCircleIcon>
        </Profile>
      </Container>
    </Box>
  );
}
