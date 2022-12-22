import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Logo, Search, SearchIconWrapper, StyledInputBase } from './styles';
import { Container } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{
      gap: 1,
      padding: 1,
      backgroundColor: (theme)=> theme.palette.primary.main,
      color: (theme)=> theme.palette.primary.contrastText,
    }}>
      <Container fixed sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          <Logo href='/'>
            <img src="/cupcake.png" alt="Logo" width="100%" height="100%"/>
            <span>Recipe book</span>
          </Logo>
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Container>
    </Box>
  );
}
