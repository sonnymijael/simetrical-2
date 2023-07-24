import React, { useState, useEffect } from "react"
import { Grid, CircularProgress, Card, CardContent, Typography, CardMedia, Box, Alert, Button, List, ListItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { makeRequest } from "../../helpers"

export default function Catalog () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [drink, setDrink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: {drinks} } = await makeRequest(`lookup.php?i=${id}`, 'get', {})
        if (drinks) {
          setDrink(drinks[0])
          setError(false)
        } else {
          setError(true)
        }
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, setError, setLoading, setDrink])

  const handleNext = () => {
    const nextId = Number(id) + 1
    navigate(`/catalog/${nextId}`)
  }

  const handlePrev = () => {
    const prevId = Number(id) - 1
    navigate(`/catalog/${prevId}`)
  }
  const goBack = () => navigate(-1)

  if (loading) return <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
    <CircularProgress />
  </Grid>
  

  if (error) return  <Grid container display='flex' direction='column' justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
  <Alert severity="error">The drink could not be found.</Alert>
  <Box display="flex" justifyContent="space-between" mt={2}>
    <Button variant="contained" color="primary" onClick={goBack}>Go Back</Button>
  </Box>
</Grid>

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#282828'
      }}
    >
      <Grid container justifyContent="center" item xs={12} sm={6} md={4}>
        <Card>
          <CardMedia
            component="img"
            alt={drink.strDrink}
            height="400"
            image={drink.strDrinkThumb}
            title={drink.strDrink}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {drink.strDrink}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {drink.strCategory}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Glass: {drink.strGlass}
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" color="text.secondary">
                  Instructions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {drink.strInstructions}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" color="text.secondary">
                  Ingredients
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {Array.from({ length: 15 }).map((_, index) => {
                    const ingredient = drink[`strIngredient${index + 1}`]
                    const measure = drink[`strMeasure${index + 1}`]
                    return ingredient ? (
                      <ListItem key={index}>
                        <Typography variant="body2" color="text.secondary">
                          {`${measure || ''} ${ingredient}`}
                        </Typography>
                      </ListItem>
                    ) : null
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" onClick={handlePrev}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Button variant="contained" color="primary" onClick={() => navigate('/')} style={{position: 'absolute', bottom: '20px'}}>Back to Home</Button>
    </Box>
  )
}
