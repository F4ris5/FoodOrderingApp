import { Box, Typography, Button } from '@mui/material';

const UserTopSection = ({ scrollToBottom }) => {
  return (
    <Box
      sx={{
        height: '80vh',
        backgroundImage: 'url("https://iili.io/23SBscJ.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'black',
        backgroundColor: 'grey',
        textAlign: 'center',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '80%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          zIndex: '2',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          opacity: 0,
          transform: 'translateY(20px)',
          animation: 'fadeInUp 1s forwards 0.3s',
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(20px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        ALL-IN-ONE FUSION FOOD
      </Typography>

      <Typography
        variant="h6"
        sx={{
          zIndex: '2',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '1px',
          opacity: 0,
          transform: 'translateY(20px)',
          animation: 'fadeInUp 1s forwards 0.5s',
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(20px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        FOOD FROM AROUND THE WORLD
      </Typography>

      {/* Button to scroll down */}
      <Button
        variant="contained"
        sx={{
          zIndex: '2',
          marginTop: '20px',
          fontWeight: '700',
          backgroundColor: '#02bb00',
          '&:hover': {
            backgroundColor: '#88c800',
            transform: 'scale(1.05)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
        onClick={scrollToBottom} // Trigger scroll to bottom
      >
        Order Now
      </Button>
    </Box>
  );
};

export default UserTopSection;
