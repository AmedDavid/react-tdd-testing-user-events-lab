import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent for simulating user actions
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements (already provided)
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/lorem ipsum/i);
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", { name: /github/i });
  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
  expect(githubLink).toHaveAttribute("href", expect.stringContaining("https://github.com"));
  expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("https://linkedin.com"));
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  const codingCheckbox = screen.getByRole("checkbox", { name: /coding/i });
  const designCheckbox = screen.getByRole("checkbox", { name: /design/i });
  const gamingCheckbox = screen.getByRole("checkbox", { name: /gaming/i });
  expect(codingCheckbox).toBeInTheDocument();
  expect(designCheckbox).toBeInTheDocument();
  expect(gamingCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  const codingCheckbox = screen.getByRole("checkbox", { name: /coding/i });
  const designCheckbox = screen.getByRole("checkbox", { name: /design/i });
  const gamingCheckbox = screen.getByRole("checkbox", { name: /gaming/i });
  expect(codingCheckbox).not.toBeChecked();
  expect(designCheckbox).not.toBeChecked();
  expect(gamingCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "john@example.com");
  expect(nameInput).toHaveValue("John Doe");
  expect(emailInput).toHaveValue("john@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  const codingCheckbox = screen.getByRole("checkbox", { name: /coding/i });
  const designCheckbox = screen.getByRole("checkbox", { name: /design/i });
  userEvent.click(codingCheckbox);
  userEvent.click(designCheckbox);
  expect(codingCheckbox).toBeChecked();
  expect(designCheckbox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const codingCheckbox = screen.getByRole("checkbox", { name: /coding/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.type(nameInput, "John Doe");
  userEvent.click(codingCheckbox);
  userEvent.click(submitButton);
  expect(screen.getByText(/thanks for signing up, john doe/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: coding/i)).toBeInTheDocument();
});

