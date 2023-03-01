import React, { useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { PodcastSidebar } from 'components';
import usePodcast from './hooks/usePodcast';
import { formattedDate, formattedTime } from 'utility/format';


const Podcast = () => {
  const { podcastId } = useParams();

  const navigate = useNavigate();
  const { details, episodes } = usePodcast({ podcastId });

  const headCells = [
    {
      id: 'title',
      label: 'Title',
    },
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'duration',
      label: 'Duration',
    },
  ];

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
          <Paper elevation={1} sx={{ mb: 3, p: 1 }}>
            <Typography sx={{ fontWeight: '600' }} align='left' variant="h5">
              Episodes: {episodes.length}
            </Typography>
          </Paper>
          <Paper elevation={1} sx={{ p: 1}}>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    { headCells.map((headCell) => (
                      <TableCell key={headCell.id}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  { episodes.map((item) => {
                    return (
                      <TableRow
                        key={item.title}
                      >
                        <TableCell align="left">
                          <Button
                            size="small"
                            onClick={() => navigate(`/podcast/${podcastId}/episode/${item.id}`)}
                          >
                            <Typography align='left' variant="body2">
                              {item.title}
                            </Typography>
                          </Button>
                        </TableCell>
                        <TableCell align="left">{formattedDate({value: item.date})}</TableCell>
                        <TableCell align="center">{formattedTime({value: item.duration})}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export { Podcast };
