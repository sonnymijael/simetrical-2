import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Drink({ drink }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()

  return <Grid 
    item 
    xs={6}
    sm={6}
    xl={3}
    sx={{
      minHeight: '200px', 
      backgroundColor: 'transparent',
      color: '#f1f1f1', 
      borderRadius: '5px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <Box 
      component="div" 
      sx={{ 
        width: '100%', 
        height: '200px', 
        position: 'relative', 
        borderRadius: '5px'
      }}
    >
      <img 
        src={drink.strDrinkThumb} 
        alt={drink.strDrink}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',  
          borderRadius: '5px' 
        }} 
      />

      <Typography 
        variant="body1" 
        component="div"
        sx={{ 
          color: '#f1f1f1', 
          textAlign: 'start',
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          padding: '0px 10px', 
          width: '100%',
          zIndex: 50,
          visibility: !isHovered ? 'visible' : 'hidden',
          '::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex: -1,
          },
        }}
      >
        {drink.strDrink}
      </Typography>
    </Box>
    <Button 
      size='small'
      variant="contained"
      color='secondary'
      onClick={() => navigate(`/catalog/${drink.idDrink}`)}
      sx={{
        position: 'absolute',
        bottom: '10px',
        visibility: isHovered ? 'visible' : 'hidden',
      }}
    >
      Read more...
    </Button>
  </Grid>
}
