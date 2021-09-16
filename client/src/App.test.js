import { getByText, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from './App';

test('Renders a title', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = screen.getByText(/Bienvenidos a la Wiki-mon/i);
    expect(linkElement).toBeInTheDocument();
})
test('Renders subtitle', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = screen.getByText("La mejor página para conocer a todos los pokemones!");
    expect(linkElement).toBeInTheDocument();
})

test('Renders a button to /home', () => {
    render(<BrowserRouter><App></App></BrowserRouter>)
    const button = screen.getByText(/empezar/i);
    expect(button).toBeInTheDocument();
});
