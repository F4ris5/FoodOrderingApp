import { Box, Typography, Card, CardContent, CardMedia, Button, Container, Grid } from '@mui/material';
import { useContext, useState, useEffect, forwardRef, useRef } from 'react';
import itemsContext from '../folder/items-context';

const UserBottomSection = forwardRef((props, ref) => {
  const itemCtx = useContext(itemsContext);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  const addToCartHandler = (food) => {
    itemCtx.addToCart(food);
  };

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
    <Box ref={ref} sx={{ padding: '50px 20px', textAlign: 'center', backgroundColor: 'peachpuff' }}>
      <Container
        ref={containerRef}
        sx={{
          backgroundColor: 'white',
          width: '50%',
          borderRadius: '10px',
          padding: '10px',
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s, transform 1s',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            paddingTop: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '800',
            letterSpacing: '2px',
          }}
          gutterBottom
        >
          AVAILABLE FOODS
        </Typography>
      </Container>

      <Grid container spacing={4} sx={{ marginTop: '20px' }}>
        {itemCtx.foods.map((food, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={food.imageUrl}
                alt={food.name}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontFamily: 'Inter, sans-serif', letterSpacing: '1px' }} gutterBottom>
                  {food.name}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }} color="textSecondary">
                  {food.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: 'Inter, sans-serif', letterSpacing: '1px' }}
                  color="textSecondary"
                >
                  {food.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: '10px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    backgroundColor: '#02bb00',
                    '&:hover': {
                      backgroundColor: '#88c800',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                  onClick={() => addToCartHandler(food)}
                >
                  ADD TO CART
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default UserBottomSection;
