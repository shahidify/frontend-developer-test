import React, { useState, useEffect } from "react";
import api from "../lib/api";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import UserTable from "./UserTable";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(
  theme => ({
      root: {
          padding: '20px 20px',
          margin: '20px'
      },
      margin10: {
        margin: '10px'
      }
  }),
  {
      name: 'App',
  }
);

const fetchData = async () => {
  return await api.getUsersDiff();
};

export const App = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  
  const loadData = () => {
    setLoading(true);
    setError(false);
    const results = fetchData();
    results
      .then((response) => {
        if (response.code === 200) {
          setUserData([...userData, ...response.data]);
        }
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className={classes.root} >
      <Grid
        container
        justify="center"
        alignItems="center"
        component={Paper}
        spacing={0}
        data-testid="app-grid"
      >
        <Grid
          item
          container
          xs={12}
          justify="center"
          alignItems="center"
          spacing={0}
          direction="column"
        >
          <UserTable data={userData} />
          {error && 
            <Box data-testid="error-box" className={classes.margin10}>
              <Typography color="error">
                We had problems fetching your data. Please try again.
              </Typography>
            </Box>
          }
          {loading && <CircularProgress disableShrink className={classes.margin10} />}
          {!loading && (
            <Box data-testid="load-button-box">
              <Button
                align="center"
                variant="contained"
                color="primary"
                onClick={loadData}
                data-testid="btn-load-more"
                className={classes.margin10}
              >
                Loading more
              </Button>
              </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;