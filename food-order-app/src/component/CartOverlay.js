import React, { useContext } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import itemsContext from '../folder/items-context';

const CartOverlay = ({ onClose }) => {
  const itemCtx = useContext(itemsContext);

  const totalPrice = itemCtx.cartItems.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price.replace('$', ''));
    return acc + itemPrice * item.amount;
  }, 0);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.5)', // Dark background
        zIndex: 999, // Behind the overlay
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          bgcolor: 'background.paper',
          borderRadius: '15px',
          boxShadow: 24,
          p: 4,
          zIndex: 1000, // Above the backdrop
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: 'Inter, sans-serif', letterSpacing: '1px' }} gutterBottom>
          Your Cart
        </Typography>

        {itemCtx.cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          itemCtx.cartItems.map((item) => {
            const itemPrice = parseFloat(item.price.replace('$', ''));
            const totalItemPrice = itemPrice * item.amount;

            return (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '10px',
                }}
              >
                <Box>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: {item.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {item.amount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total: ${totalItemPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => itemCtx.removeFromCart(item.id)}
                    sx={{ marginLeft: '5px', border: '1px solid #ccc', width: '40px', height: '40px',
                      '&:hover': {
                      color: 'white',
                      backgroundColor: 'black', // Darker shade for the hover effect
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                    }, }}
                    >
                    -
                  </IconButton>
                  <IconButton
                    onClick={() => itemCtx.addToCart({ ...item, amount: 1 })}
                    sx={{ marginLeft: '5px', border: '1px solid #ccc', width: '40px', height: '40px',
                      '&:hover': {
                      color: 'white',
                      backgroundColor: 'black', // Darker shade for the hover effect
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                    }, }}
                  >
                    +
                  </IconButton>
                </Box>
              </Box>
            );
          })
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#02bb00' }} onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartOverlay;
