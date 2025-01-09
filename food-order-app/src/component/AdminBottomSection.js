import { Box, Typography, Card, Container , CardContent, CardMedia, Button, Grid } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
const AdminBottomSection = ({ foods, onDeleteFood }) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Element is in view, trigger animation
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the container is in view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ padding: '50px 20px', textAlign: 'center', backgroundColor:'peachpuff' }}>
      <Container
        ref={containerRef}
        sx={{
          backgroundColor: 'white',
          width: '50%',
          borderRadius: '10px',
          padding: '10px',
          opacity: isInView ? 1 : 0, // Fade in when in view
          transform: isInView ? 'translateY(0)' : 'translateY(20px)', // Slide up when in view
          transition: 'opacity 1s, transform 1s', // Smooth transition
        }}
      >
        <Typography
          variant="h4"
          sx={{
            paddingBottom: '0px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '800',
            letterSpacing: '2px',
          }}
          gutterBottom
        >
          AVAILABLE FOODS
        </Typography>
      </Container>

      <Grid container spacing={4} sx={{ marginTop: '40px' }}>
        {foods.map((food, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={food.imageUrl} // Displaying the correct image
                alt={food.name}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontFamily: 'Inter, sans-serif', letterSpacing: '1px' }} gutterBottom>
                  {food.name}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }} color="textSecondary">
                  {food.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                  {food.price}
                </Typography>
                <Button variant="contained" color="secondary" sx={{
                    marginTop: '10px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    backgroundColor: '#02bb00',
                    '&:hover': {
                      backgroundColor: '#88c800', // Darker shade for the hover effect
                      transform: 'scale(1.05)', // Slightly increase size
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                    },
                  }} onClick={() => onDeleteFood(food.id)}>
                  DELETE
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminBottomSection;
