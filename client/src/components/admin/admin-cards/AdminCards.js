// material
import { Grid, Container } from "@mui/material";
import * as React from "react";
// components

import TotalUser from "./TotalUser";
import TotalDoctor from "./TotalDoctor";
import TotalAppointments from "./TotalAppointments";

export default function AdminCards() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TotalUser />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalDoctor />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalAppointments />
        </Grid>
      </Grid>
    </Container>
  );
}
