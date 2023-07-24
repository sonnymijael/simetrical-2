import React from 'react'
// Components
import { Box, Typography, Button, Grid, Chip } from '@mui/material'

export default function ItemCatalog({ drink }) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        borderRadius: '5px',
        overflow: 'hidden',
        padding: '0px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: '60%',
        }}
      >
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          style={{
            width: '95%',
            height: '200px',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '5px 5px 0 0',
          }}
        />
      </Box>

      <Box sx={{ padding: '16px' }}
        display='flex'
        flexDirection='column'
        justifyContent="space-between"
      >
        <Typography variant="h6" color='primary' sx={{ marginBottom: '8px' }}>
          {drink.strDrink}
        </Typography>

        <Typography variant="body1" color='primary' sx={{ marginBottom: '16px' }}>
          <strong>Category:</strong> {drink.strCategory}
        </Typography>

        <Typography variant="body2" color='primary' sx={{ marginBottom: '16px' }}>
          <strong>Ingredients:</strong>
          <ul>
            {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => {
              const ingredient = drink[`strIngredient${index}`]
              const measurement = drink[`strMeasure${index}`]
              return (
                ingredient && (
                  <li key={index}>
                    {measurement} {ingredient}
                  </li>
                )
              )
            })}
          </ul>
        </Typography>

        <Box  sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          {drink.strTags &&
            drink.strTags.split(',').map((tag) => (
              <Chip key={tag} color='secondary' label={tag.trim()} sx={{ margin: '0 4px', backgroundColor: '#f1f1f110' }} />
            ))}
        </Box>

        <Button
          size="small"
          variant="contained"
          color="secondary"
          href={drink.strImageSource}
          target="_blank"
          fullWidth
          sx={{ backgroundColor: '#f1f1f130' }}
        >
          Read More
        </Button>
      </Box>
    </Grid>
  )
}
