
# AI Chatbot Interface with LLM Response

This project is an AI-powered chatbot interface built using Next.js and integrated with Google's Gemini API for large language model (LLM) responses. It allows users to input queries, and display structured outputs. Additionally, there is an admin panel for user management and response review, with data stored in MongoDB.

## Features

- **Chatbot Interface**: Users can input queries, and the chatbot sends these queries to the Google Gemini API, displaying structured JSON responses.
- **Admin Panel**: The admin panel displays a list of users and their saved responses. Admins can view detailed responses and manage users.
- **Save Responses**: Users can save chatbot responses to a memory store (Redux) and MongoDB for later retrieval.
- **User History Feature**: A History tab in the chatbot interface to allow users to view their previously saved responses.
- **Responsive UI**: The interface is fully responsive, ensuring a smooth experience across devices.
  
## Tech Stack

- **Framework**: Next.js (App Router)
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **Backend**: MongoDB with Mongoose
- **LLM API**: Google Gemini API
- **Other Dependencies**: TypeScript

## Project Structure

```bash
.
├── app/                     # Next.js App Router and pages
├── components/              # Reusable React components
├── lib/                     # Utility functions and API integrations
├── models/                  # Mongoose models for MongoDB
├── store/                   # Redux store and slice definitions
├── public/                  # Static assets like images and fonts
├── .env.sample              # Sample environment variables file
├── next.config.mjs          # Next.js configuration file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation (this file)
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/soniyaprasad77/ai-chatbot-main.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ai-chatbot-main
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Rename `.env.sample` to `.env`
   - Add your `MongoDB` connection string, `JWT Secret` and `Google Gemini API` keys.

## Running the Application

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Admin Panel

The admin panel is available at the `/admin` route and provides the following functionality:

- View a list of users
- Review saved chatbot responses for each user

## Chatbot Interface

1. Users can type their query into the chatbot input field.
2. The chatbot sends the query to the Google Gemini API.


## Future Improvements

- **Additional Error Handling**: Enhance error handling in the chatbot interface to provide more detailed feedback to users when API calls fail.
- **Search and Filter for Admin Panel**: Add search and filtering capabilities in the admin panel to improve navigation through user responses.
- **Optimization for Large Data**: Improve performance when dealing with large response sets in the admin panel.



