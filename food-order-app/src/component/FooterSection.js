import { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import itemsContext from '../folder/items-context'; // Import the context

const FooterSection = () => {
  const itemCtx = useContext(itemsContext); // Access context

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bc3c04', // Light gray background
        padding: '16px', // Padding around the footer
        boxShadow: 1, // Optional: shadow for depth
        position: 'static', // Fix footer to the bottom
      }}
    >
      <Typography color='white'>
        Debug Mode:
      </Typography>
      <Typography variant="body1" color='white' sx={{ marginRight: '0px' }}>
        Switch to {itemCtx.switchPage ? 'Admin' : 'User'}
      </Typography>
      <Button variant="contained" color="primary" onClick={itemCtx.togglePage}>
        Toggle
      </Button>
    </Box>
  );
};

export default FooterSection;
