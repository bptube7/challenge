import {logRoles, render, screen, waitFor} from '@testing-library/react';
import { Episode } from './Episode';
import { LoadingContextProvider } from 'providers';
import axios from 'axios';

jest.mock('axios');

// MOCK useNavigate and useParams TO CAN RENDER COMPONENT WITHOUT ROUTER
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({
    podcastId: '1535809341',
    episodeId: '333e2c4d-bc72-4a6a-9b7e-e0bd859d08b5',
    url: 'https://jbpod.libsyn.com/applepodcast',
    totalEpisodes: 367
  }),
}));

const mockData = {
  "contents": "{\"resultCount\": 1,\"results\": [{\"feedUrl\":\"https://jbpod.libsyn.com/applepodcast\",\"trackCount\": 367}]}",
};

const mockData2 = {
  "feed": {
    "url":"https://jbpod.libsyn.com/applepodcast",
    "title":"The Joe Budden Podcast",
    "link":"https://www.youtube.com/c/joebuddentv/videos",
    "author":"The Joe Budden Network",
    "description":"Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends.",
    "image":"https://ssl-static.libsyn.com/p/assets/6/5/5/a/655a79b7f130e7cde5bbc093207a2619/JBN_Apple_Podcast.jpg"
  },
  "items": [
    {
      "title": "Episode 605 | \"3 Hookah Tips In His Mouth\"",
      "pubDate": "2023-02-25 08:00:00",
      "guid": "333e2c4d-bc72-4a6a-9b7e-e0bd859d08b5",
      "author": "The Joe Budden Network",
      "description": "\n<p>The gang talks about the upcoming Oscars as Rihanna is set to perform (20:20) while The Academy also prepares to get a crisis management team in place (22:30). A debate about white vs. black drug tv shows ensues as season 5 of Snowfall is underway (31:23), 6LACK has an album due in March (42:38), and Snoh Aalegra’s recent tweet brings a discussion about the challenges artists still face in music (51:12). Also, Saucy Santana has some comments about hookah (1:33:55), ADIDAS is reportedly re-approaching business with Kanye (1:55:15), Part of the Show (2:02:26), + MORE!</p> <p><span data-preserver-spaces=\"true\">Become a Patron of The Joe Budden Podcast for additional bonus episodes and visual content for all things JBP.: Tap in here </span><a class=\"editor-rtfLink\" href=\"http://www.patreon.com/JoeBudden\" target=\"_blank\" rel=\"noopener\"><span data-preserver-spaces=\"true\">www.patreon.com/JoeBudden</span></a></p> <p> </p> <div dir=\"auto\">Sleeper Picks:</div> <div dir=\"auto\"> </div> <div dir=\"auto\">Joe | Jozzy - “Alone”</div> <div dir=\"auto\"> </div> <div dir=\"auto\">Ice | Payroll Giovani (feat. Jeezy) - “Ex Dealer Flow 2”</div> <div dir=\"auto\"> </div> <div dir=\"auto\">Parks | Times Change (feat. Mooch) - “Destined”</div> <div dir=\"auto\"> </div> <div dir=\"auto\">Ish | Kevin Ross - “Show &amp; Prove”</div> <div dir=\"auto\"> </div> <div dir=\"auto\">Melyssa | Ukweli &amp; Xenia Manasseh - “Waiting”</div> <div dir=\"auto\"> </div> <div dir=\"auto\">QueenzFlip | Lord Ju - “My Bop”</div>\n",
      "enclosure": {
        "link": "https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_605_1.mp3?dest-id=2422538",
        "duration": 9380,
      },
    },
  ]
};

const Component = () => {
  return (
    <LoadingContextProvider>
      <Episode />
    </LoadingContextProvider>
  );
};

describe('Episode', () => {
  it('renders Episode component', async () => {
    const promise = Promise.resolve({ data: mockData });

    axios.get.mockImplementationOnce(() => promise);

    const promise2 = Promise.resolve({ data: mockData2 });

    axios.get.mockImplementationOnce(() => promise2);

    const promise3 = Promise.resolve({ data: mockData2 });

    axios.get.mockImplementationOnce(() => promise3);

    render(<Component />);

    await waitFor(() => {
      const authorElement = screen.getByText(/The Joe Budden Network/);
      expect(authorElement).toBeInTheDocument();
      expect(authorElement).toBeVisible();

      const episodeTitleElement = screen.getByText(/Episode 605 \| "3 Hookah Tips In His Mouth"/);
      expect(episodeTitleElement).toBeInTheDocument();
      expect(episodeTitleElement).toBeVisible();

      const episodeDescriptionElement = screen.getByText(/The gang talks about the upcoming Oscars as Rihanna is set to perform/);
      expect(episodeDescriptionElement).toBeInTheDocument();
      expect(episodeDescriptionElement).toBeVisible();

      const episodeDurationElement = screen.getByTestId("audio-episode");
      expect(episodeDurationElement).toBeInTheDocument();
      expect(episodeDurationElement).toBeVisible();
    })
  });
});
