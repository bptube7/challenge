import { render, screen } from '@testing-library/react';
import { AppLayout } from './AppLayout';
import { LoadingContext } from 'providers';

// MOCK useNavigate TO CAN RENDER COMPONENT WITHOUT ROUTER
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const Component = ({loading = false}) => {
  return (
    <LoadingContext.Provider value={{loading}}>
      <AppLayout/>
    </LoadingContext.Provider>
  );
};

describe('AppLayout', () => {
  it('renders AppLayout component', () => {
    render(<Component />);

    const element = screen.getByTestId("title");
    expect(element).toBeInTheDocument();
  });

  it('show loader', () => {
    render(<Component loading={true} />);

    const element = screen.getByTestId("loader");
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
  });
});
