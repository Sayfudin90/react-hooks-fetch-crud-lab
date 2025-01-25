import React from "react";
import "whatwg-fetch";
import {
fireEvent,
render,
screen,
waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";
import App from "../components/App";

// MSW Server Setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("creates a new question when the form is submitted", async () => {
 render(<App />);
 
 // Navigate to form
 fireEvent.click(screen.getByText("New Question"));
 
 // Fill out form
 fireEvent.change(screen.getByLabelText(/Prompt/), {
   target: { value: "Test Prompt" },
 });
 fireEvent.change(screen.getByPlaceholderText("Answer 1"), {
   target: { value: "Test Answer 1" },
 });
 fireEvent.change(screen.getByPlaceholderText("Answer 2"), {
   target: { value: "Test Answer 2" },
 });
 
 // Select correct answer
 fireEvent.change(screen.getByPlaceholderText(/Correct Answer/), {
   target: { value: "1" },
 });
 
 fireEvent.click(screen.getByText("Add Question"));
 fireEvent.click(screen.getByText("View Questions"));
 
 const newQuestion = await screen.findByText("Test Prompt");
 expect(newQuestion).toBeInTheDocument();
});