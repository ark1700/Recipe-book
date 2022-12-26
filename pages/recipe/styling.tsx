import { styled, alpha } from "@mui/material";

export const MainImg = styled('img')(({ theme }) => ({
  display: 'block',
  marginInline: 'auto',
  marginBottom: 3,
  width: '100%',
  maxWidth: '500px',
  aspectRatio: '124/84',
  objectFit: 'cover',
}));

export const Ingredients = styled('ul')(({ theme }) => ({
  paddingLeft: 0,
  marginBottom: 3,
  listStyle: 'none',
}));

export const Ingredient = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  'span': {
    flexShrink: 0,
  }
}));

export const IngredientDash = styled('span')(({ theme }) => ({
  flexGrow: 1,
  minWidth: '20px',
  height: '1px',
  marginInline: '10px',
  backgroundColor: alpha(theme.palette.common.black, 0.1),
}));
