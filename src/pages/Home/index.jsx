import React, { useState, useEffect } from 'react'
import { Grid, TextField, Typography, Box, Stack, Button } from '@mui/material'
import { makeRequest } from '../../helpers'
import Category from '../../components/Category'
import { toast } from 'react-toastify'
import ItemCatalog from '../../components/ItemCatalog'
// 
import bg from '../../assets/bgHome.jpeg'

export default function Home () {
  const [drinkName, setDrinkName] = useState(null)
  const [drinksResponse, setDrinksResponse] = useState(null)
  const [categories, setCategories] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const { data: { drinks } } = await makeRequest('list.php?c=list', 'get', {})
      setCategories(drinks)
    }
    fetchData()
  }, [setCategories])

  const handleSearch = async () => {
    const { data: { drinks } } = await makeRequest(`search.php?s=${drinkName}`, 'get', {})
    
    if (!drinks || drinks.length === 0) {
      toast.error('Don\'t have any drinks with that name' );
    } else {
      setDrinksResponse(drinks)
    }
  }

  return <Box 
    sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      backgroundColor: '#f5f5f5'
    }}
  >
    <div className='bgImage' style={{ backgroundImage: `url('${bg}')`}}>
      <Stack
        sx={{ width: '100%', height: '100%' }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h3" sx={{ color: '#f5f5f5', textAlign: 'center' }}>
          !Search for a beverage!
        </Typography>
        <Stack
          sx={{ width: '100%' }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField size='small' label="Drink" placeholder='Search drinks' color="primary" focused
          value={drinkName}
          onChange={(e) => setDrinkName(e.target.value)}
          />
          <Button variant='contained' onClick={handleSearch}>Search</Button>
        </Stack>
      </Stack>
    </div>
    {drinksResponse && 
      <Stack
        minHeight='20vh'
        sx={{ width: '100%', height: '100%', backgroundColor: '#242424' }}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4" sx={{ padding: '1rem' ,color: '#f5f5f5' ,textAlign: 'center' }}>
          Search result(s)
        </Typography>
        <Grid container spacing={2} maxWidth={'1200px'}>
          {drinksResponse.map((drink, index) => <ItemCatalog key={index} drink={drink} />)}
        </Grid>
      </Stack>
    }
    {categories && 
      <Stack
        minHeight='100vh'
        sx={{ width: '100%', height: '100%', backgroundColor: '#242424' }}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4" sx={{ padding: '1rem' ,color: '#f5f5f5' ,textAlign: 'center' }}>
          Categories
        </Typography>
        <Grid container spacing={2} maxWidth={'1200px'}>
          {categories.map((category, index) => 
            <Category key={index} name={category.strCategory} />
          )}
        </Grid>
      </Stack>
    }
  </Box>
}