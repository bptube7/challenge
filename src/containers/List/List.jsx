import { Chip, Grid, TextField } from '@mui/material';
import { ListBox } from 'components';
import useList from './hooks/useList';

const List = () => {
  const { filteredList, search, handleSearch } = useList();

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Chip
          sx={{
            mr: 1,
            border: '1px'
          }}
          label={filteredList.length}
          color="primary"
        />
        <TextField
          id="search"
          onChange={(e) => handleSearch({value: e.target.value})}
          value={search}
          label="Filter podcasts..."
          variant="outlined"
          size="small"
          data-testid="search-box"
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        { filteredList && filteredList.map((item) =>
          <Grid key={item.id} item xs={3}>
            <ListBox
              id={item.id}
              author={item.author}
              image={item.image}
              title={item.title}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export { List };
