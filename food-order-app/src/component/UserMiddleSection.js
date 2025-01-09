import { Box, Typography, Grid } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

const UserMiddleSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Element is in view, trigger animation
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ padding: '70px 20px', textAlign: 'center', backgroundColor: 'whitesmoke' }} ref={sectionRef}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Inter, sans-serif',
              opacity: isInView ? 1 : 0, // Fade in when in view
              transform: isInView ? 'translateY(0)' : 'translateY(20px)', // Slide up when in view
              transition: 'opacity 1s, transform 1s', // Smooth transition
            }}
          >
            YOU'RE GOING TO FALL IN LOVE!
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            sx={{
              marginLeft: '10px',

              width: '85%',
              padding: '30px 0px',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'left',
              lineHeight: '2',
              opacity: isInView ? 1 : 0, // Fade in when in view
              transform: isInView ? 'translateY(0)' : 'translateY(20px)', // Slide up when in view
              transition: 'opacity 1s, transform 1s', // Smooth transition
            }}
          >
            From spicy Fried Rice and savory Italian Pizza to hearty American burgers and delicate Japanese sushi, there's something for everyone. Our open kitchen allows you to watch our talented chefs at work, and our extensive drink menu features global wines and refreshing mocktails.
          </Typography> 
        </Grid>
        {/* Don’t forget to save room for dessert, where you can indulge in fusion treats like matcha tiramisu or churro ice cream sundaes. Here, every meal is a delicious adventure! */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '250px',
              backgroundColor: '#ccc',
              backgroundImage: 'url("https://iili.io/23S74Vf.jpg")', // Placeholder image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserMiddleSection;
