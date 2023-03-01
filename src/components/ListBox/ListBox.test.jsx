import { render, screen } from '@testing-library/react';
import { ListBox } from './ListBox';

// MOCK useNavigate TO CAN RENDER COMPONENT WITHOUT ROUTER
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// MOCK DATA TO USE IN COMPONENT
const mockData = {
  id: '123456',
  author: 'Lorem Picsum',
  image: 'https://picsum.photos/200/300',
  title: 'Easy to use, stylish placeholders'
}

const Component = () => {
  return (
    <ListBox {...mockData} />
  );
};

describe('ListBox', () => {
  it('renders ListBox component', () => {
    render(<Component />);

    const authorElement = screen.getByText(/Lorem Picsum/);
    expect(authorElement).toBeInTheDocument();
    expect(authorElement).toBeVisible();

    const titleElement = screen.getByText(/Easy to use, stylish placeholders/);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toBeVisible();

    const imageElement = screen.getByTestId('list-box-image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toBeVisible();

  });
});
