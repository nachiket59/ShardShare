import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "../List/List";
import Box from "@material-ui/core/Box";
import { Typography, Container } from "@material-ui/core";
import { getSharedWithUser } from "../../api/index";
import { trackPromise } from "react-promise-tracker";
import {toast} from 'react-toastify';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  media: {
    height: 140,
  },
});

export default function SharedWithUser(props) {
  const classes = useStyles();
  const [secrets, setSecrets] = useState([]);
  useEffect(() => {
    trackPromise(
      getSharedWithUser()
        .then((res) => {
          setSecrets(res.data.secret_array);
        })
        .catch((res) => {
          toast.error(res.response.data.message);
        })
    );
  }, []);
  return (
    <Container>
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <Typography variant="h4" gutterBottom>
          Secrets Shared With You
        </Typography>
      </Box>
      {secrets.length === 0 ? (
        <Box margin="5rem" display="flex" justifyContent="center">
          <Typography variant="h6" gutterBottom>
            No Secrets Have Been Shared With You Yet...
          </Typography>
        </Box>
      ) : (
        <List listItems={secrets} list_for={"shared_with_user"} />
      )}
    </Container>
  );
}
