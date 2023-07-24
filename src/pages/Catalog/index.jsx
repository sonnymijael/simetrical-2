import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
// id item
const { id } = useParams()

export default function Catalog () {
  return <Grid container spacing={2}>
    <Grid item>
      {id}
    </Grid>
  </Grid>
}