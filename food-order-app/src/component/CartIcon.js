import { useContext } from 'react';
import itemsContext from '../folder/items-context';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartIcon = ({ onClick }) => {
  const itemCtx = useContext(itemsContext);

  return (
    <IconButton onClick={onClick} color="inherit">
      <Badge badgeContent={itemCtx.totalQuantity} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
