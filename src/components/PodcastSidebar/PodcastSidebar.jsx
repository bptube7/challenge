
import { Box, Card, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PodcastSidebar = ({id, image, title, author, description}) => {
  const navigate = useNavigate();
  return (
    <Card>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CardMedia
          sx={{
            width: 160,
            height: 160,
            margin: '28px',
            cursor: 'pointer'
          }}
          image={image}
          title={title}
          onClick={() => navigate(`/podcast/${id}`)}
          data-testid="list-box-image"
        />
      </Box>
      <CardContent sx={{ p: 1, pt: 0 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ p: 1 }}>
          <Typography
            sx={{
              fontWeight: '600',
              cursor: 'pointer'
            }}
            align='left'
            variant="subtitle1"
            onClick={() => navigate(`/podcast/${id}`)}
          >
            {title}
          </Typography>
          <Typography sx={{ fontStyle: 'italic', lineHeight: 1 }} align='left' variant="body1" color="text.secondary">
            by {author}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography sx={{ fontWeight: '600' }} align='left' variant="subtitle2">
            Description:
          </Typography>
          <Typography sx={{ fontStyle: 'italic' }} align='left' variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export { PodcastSidebar };
