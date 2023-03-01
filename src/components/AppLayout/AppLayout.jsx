import { memo, useContext } from 'react'
import { AppBar, Box, CircularProgress, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from 'providers';

const AppLayout = memo(function({children}) {
  // ACCESS NAVIGATE FUNCTION FROM REACT ROUTER DOM
  const navigate = useNavigate();
  // ACCESS THE LOADING CONTEXT VALUE
  const { loading } = useContext(LoadingContext);
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{
            boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px',
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                cursor: 'pointer'
              }}
              color="primary"
              onClick={() => navigate('/')}
              data-testid="title"
            >
              Podcaster
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            { loading && (
              <CircularProgress data-testid="loader" size={30} />
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        {children}
      </Box>
    </Container>
  );
});

export { AppLayout };
