import { Box, Typography, Button } from '@mui/material';

const AdminTopSection = ({ onAddFood }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: '#bc3c04',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: '800', color: 'white' }}>Admin View: Dashboard</Typography>
      <Button variant="contained" color="primary" sx={{ backgroundColor: '#02bb00' }} onClick={onAddFood}>
        ADD FOOD ITEM
      </Button>
    </Box>
  );
};

export default AdminTopSection;
