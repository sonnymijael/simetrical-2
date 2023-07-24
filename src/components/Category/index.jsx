import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Drink from '../../components/Drink'
import { getRandomDrinks, makeRequest } from '../../helpers';

export default function Category ({ name }) {
  const [drinks, setDrinks] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { drinks } } = await makeRequest(`filter.php?c=${name}`, 'get', {})
        setDrinks(getRandomDrinks(drinks, 4))
      } catch (error) {
        console.error(error);
      }
    } 
    fetchData()
  }, [name])

  if (drinks === null) return  <Grid
  item 
  xs={12} 
  sm={6} 
  md={6} display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Grid>

  return <Grid 
    item 
    xs={12} 
    sm={6} 
    md={6} 
    sx={{
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      backgroundColor: '#282828', 
      borderRadius: '5px',
      padding: 2,
      marginBottom: 2,
    }}
  >
    <Typography variant="h5" sx={{ color: '#f5f5f5', textAlign: 'center', marginBottom: 2 }}>
      {name}
    </Typography>
    <Grid container spacing={2}>
      {drinks.map(drink => <Drink drink={drink} />)}
    </Grid>
  </Grid>
}
