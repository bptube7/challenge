import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout, NoMatch } from 'components';
import { Episode, List, Podcast } from 'containers';
import { LoadingContextProvider } from './providers';

const App = () => {
  return (
    <LoadingContextProvider>
      <BrowserRouter>
        <CssBaseline />
        <AppLayout>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="podcast/:podcastId" element={<Podcast />} />
            <Route path="podcast/:podcastId/episode/:episodeId" element={<Episode />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </LoadingContextProvider>
  );
}

export default App;
