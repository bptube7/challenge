import { render, screen } from '@testing-library/react';
import { NoMatch } from './NoMatch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Component = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

describe('NoMatch', () => {
  it('renders NoMatch component', () => {
    render(<Component />);

    const authorElement = screen.getByText(/Nothing to see here!/);
    expect(authorElement).toBeInTheDocument();
    expect(authorElement).toBeVisible();

    const titleElement = screen.getByText(/Go back!/);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toBeVisible();
  });
});
