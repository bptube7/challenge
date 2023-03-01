import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

const mockData = {
  "feed": {
    "entry": [
      {
        "im:name": {
          "label": "The Joe Budden Podcast"
        },
        "im:image": [
          {
            "label": "https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png",
            "attributes": {
              "height": "55"
            }
          },
          {
            "label": "https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.png",
            "attributes": {
              "height": "60"
            }
          },
          {
            "label": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
            "attributes": {
              "height": "170"
            }
          }
        ],
        "summary": {
          "label": "Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends."
        },
        "im:price": {
          "label": "Get",
          "attributes": {
            "amount": "0",
            "currency": "USD"
          }
        },
        "im:contentType": {
          "attributes": {
            "term": "Podcast",
            "label": "Podcast"
          }
        },
        "rights": {
          "label": "© All rights reserved"
        },
        "title": {
          "label": "The Joe Budden Podcast - The Joe Budden Network"
        },
        "link": {
          "attributes": {
            "rel": "alternate",
            "type": "text/html",
            "href": "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2"
          }
        },
        "id": {
          "label": "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
          "attributes": {
            "im:id": "1535809341"
          }
        },
        "im:artist": {
          "label": "The Joe Budden Network",
          "attributes": {
            "href": "https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=2"
          }
        },
        "category": {
          "attributes": {
            "im:id": "1310",
            "term": "Music",
            "scheme": "https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2",
            "label": "Music"
          }
        },
        "im:releaseDate": {
          "label": "2023-02-22T04:18:00-07:00",
          "attributes": {
            "label": "February 22, 2023"
          }
        }
      },
      {
        "im:name": {
          "label": "Million Dollaz Worth Of Game"
        },
        "im:image": [
          {
            "label": "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/7b/cf/f6/7bcff6bb-5f99-6c2f-c6c5-3a9799f3df21/mza_8544742664200824246.jpg/55x55bb.png",
            "attributes": {
              "height": "55"
            }
          },
          {
            "label": "https://is3-ssl.mzstatic.com/image/thumb/Podcasts125/v4/7b/cf/f6/7bcff6bb-5f99-6c2f-c6c5-3a9799f3df21/mza_8544742664200824246.jpg/60x60bb.png",
            "attributes": {
              "height": "60"
            }
          },
          {
            "label": "https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/7b/cf/f6/7bcff6bb-5f99-6c2f-c6c5-3a9799f3df21/mza_8544742664200824246.jpg/170x170bb.png",
            "attributes": {
              "height": "170"
            }
          }
        ],
        "summary": {
          "label": "The Million Dollaz Worth of Game show, a weekly podcast with rapper/actor @GillieDaKing and social media influencer and disruptor @Wallo267 - The perfect blend of discussing music, real life issues, personal experiences, honest advice and comedy\n\nYou can find every episode of this show on Apple Podcasts, Spotify or YouTube. Prime Members can listen ad-free on Amazon Music. For more, visit barstool.link/mworthofgame"
        },
        "im:price": {
          "label": "Get",
          "attributes": {
            "amount": "0",
            "currency": "USD"
          }
        },
        "im:contentType": {
          "attributes": {
            "term": "Podcast",
            "label": "Podcast"
          }
        },
        "rights": {
          "label": "© 2023 Barstool Sports, Inc."
        },
        "title": {
          "label": "Million Dollaz Worth Of Game - Barstool Sports"
        },
        "link": {
          "attributes": {
            "rel": "alternate",
            "type": "text/html",
            "href": "https://podcasts.apple.com/us/podcast/million-dollaz-worth-of-game/id1460157002?uo=2"
          }
        },
        "id": {
          "label": "https://podcasts.apple.com/us/podcast/million-dollaz-worth-of-game/id1460157002?uo=2",
          "attributes": {
            "im:id": "1460157002"
          }
        },
        "im:artist": {
          "label": "Barstool Sports",
          "attributes": {
            "href": "https://podcasts.apple.com/us/artist/barstool-sports/1524874689?uo=2"
          }
        },
        "category": {
          "attributes": {
            "im:id": "1523",
            "term": "Music Commentary",
            "scheme": "https://podcasts.apple.com/us/genre/podcasts-music-music-commentary/id1523?uo=2",
            "label": "Music Commentary"
          }
        },
        "im:releaseDate": {
          "label": "2023-02-24T16:30:00-07:00",
          "attributes": {
            "label": "February 24, 2023"
          }
        }
      },
    ]
  }
};

describe('App', () => {
  it('renders app with mock data', async () => {
    const promise = Promise.resolve({ data: mockData });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await waitFor(() => {
      const titleElement = screen.getByText(/Podcaster/);
      expect(titleElement).toBeInTheDocument();

      const searchElement = screen.getByTestId("search-box");
      expect(searchElement).toBeInTheDocument();

      const titlePodcastElement = screen.getByText(/The Joe Budden Podcast - The Joe Budden Network/);
      expect(titlePodcastElement).toBeInTheDocument();
      expect(titlePodcastElement).toBeVisible();

      const titlePodcastElement2 = screen.getByText(/Million Dollaz Worth Of Game - Barstool Sports/);
      expect(titlePodcastElement2).toBeInTheDocument();
      expect(titlePodcastElement2).toBeVisible();
    });
  });
});
