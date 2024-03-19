# Atlas Search Pagination Demo

## Project Overview

This project demonstrates how to implement pagination with Atlas Search. It's a simple web application consisting of a Node.js backend and a basic frontend served via a Python HTTP server. The application features a table displaying data from the `sample_mflix.comments` collection in an HTML format, complete with next and previous buttons for navigation. Pagination is implemented based on the guidelines provided in the example [here](https://www.mongodb.com/docs/atlas/atlas-search/paginate-results/#paginate-the-results-sequentially).

## Getting Started

### Prerequisites

- Node.js installed for the backend.
- Python installed for serving the frontend.
- A MongoDB Atlas cluster and load sample Dataset.
- An Atlas search index created on sample_mflix.comments collection named "sidx_on_name" on field name or even default index with dynamic mapping works too. Check the backend code to make appropriate changes if needed.

### Installation and Setup

1. **Clone the repository:**https://www.mongodb.com/docs/atlas/atlas-search/paginate-results/#paginate-the-results-sequentially
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```bash
   cd <project-directory>
   ```
3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file:**
   Add your MongoDB Atlas cluster details in `.env` file in the Compass format:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<clusterurl>.mongodb.net/
   ```

### Running the Application

#### Backend

- Start the backend server by running:
  ```bash
  node search-backend.js
  ```

#### Frontend

- Serve the frontend by running a Python HTTP server in the `public` folder:
  ```bash
  cd public
  python -m http.server
  ```

### Accessing the Application

- Open your web browser and navigate to the URL provided by the Python HTTP server, typically `http://localhost:8000`. Use this URL to open `index.html` and interact with the application.

