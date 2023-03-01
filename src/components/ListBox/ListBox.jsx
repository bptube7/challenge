
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ListBox = ({ id, author, image, title }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: '100%',
        boxShadow: 'none',
        padding: '10px',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/podcast/${id}`)}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CardMedia
          sx={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            margin: '28px'
          }}
          image={image}
          title={title}
          data-testid="list-box-image"
        />
      </Box>
      <Box
        sx={{
          boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px',
          paddingTop: '100px',
          marginTop: '-100px',
        }}
      >
        <CardContent>
          <Typography sx={{ fontWeight: '600', minHeight: '100px' }} align='center' variant="subtitle2">
            {title}
          </Typography>
          <Typography sx={{ minHeight: '40px' }} align='center' variant="body2" color="text.secondary">
            Author: {author}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export { ListBox };
