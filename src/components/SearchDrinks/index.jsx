import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const results = await searchDrinks(searchTerm);
    setResults(results);
  };

  return (
    <Box>
      <form onSubmit={handleSearchSubmit}>
        <TextField 
          label="Search for a drink" 
          value={searchTerm}
          onChange={handleSearchChange} 
        />
        <Button type="submit">Search</Button>
      </form>
      <List>
        {results.map((drink, index) => (
          <ListItem key={index}>
            <ListItemText primary={drink.name} secondary={drink.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

async function searchDrinks(searchTerm) {
  // Aquí deberías realizar la búsqueda en tu base de datos o API de bebidas
  // Este es un ejemplo ficticio
  const allDrinks = [
    { name: 'Drink 1', description: 'Description 1' },
    { name: 'Drink 2', description: 'Description 2' },
    // ... más bebidas
  ];
  return allDrinks.filter(drink => drink.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

export default SearchForm;
