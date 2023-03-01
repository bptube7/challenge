import React from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import {
  Box, Divider,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { PodcastSidebar } from 'components';
import useEpisode from './hooks/useEpisode';
import usePodcast from "../Podcast/hooks/usePodcast";

const Episode = () => {
  const { podcastId, episodeId } = useParams();
  const { details, url, totalEpisodes } = usePodcast({ podcastId });
  const { episode } = useEpisode({ podcastId, episodeId, url, totalEpisodes });

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={15}
        sx={{ p: 3 }}
      >
        <Grid item xs={4}>
          {details && (
            <PodcastSidebar
              id={podcastId}
              image={details.image}
              title={details.title}
              author={details.author}
              description={details.description}
            />
          )}
        </Grid>
        <Grid item xs={8}>
          {episode && (
            <Paper elevation={1} sx={{ p: 3}}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  sx={{
                    fontWeight: '600',
                    mb: 1
                  }}
                  align='left'
                  variant="h5"
                >
                  {episode.title}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                {parse(episode.description)}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box>
                <audio data-testid="audio-episode" style={{ width: '100%' }} controls>
                  <source src={episode.audioLink} type="audio/mpeg" />
                </audio>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export { Episode };
