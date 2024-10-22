# TaskSwap

[//]: # (Add your project logo or title image here)

## Introduction

TaskSwap is an innovative task management and collaboration platform designed to streamline workflow and boost productivity. It allows users to create, assign, and swap tasks within teams, promoting flexibility and efficient resource allocation.

## Setup

### Database Setup

1. Navigate to the `db` folder.
2. Execute the `init.sql` file to initialize the database structure.
3. Run the `data.sql` file to populate the database with initial data.

### Backend Setup

1. Change directory to the backend folder:
   ```
   cd backend
   ```

2. Create a configuration file:
   - Copy the example configuration file (e.g., `config.example.toml`) to `config.toml`.
   - Modify the `config.toml` file with your specific settings.

3. Run the Ballerina application:
   - Follow the necessary steps to start the Ballerina application (refer to the backend documentation for specific commands).
   ```
   bal build
   ```

   ```
   bal run
   ```

### Frontend Setup

1. Navigate to the frontend directory.

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Running the Application

After completing the setup steps above, your application should be up and running. Access the frontend through your web browser and ensure the backend is properly connected.

## About TaskSwap

TaskSwap is a comprehensive task management solution that revolutionizes the way teams collaborate and manage their workload. Here's a detailed overview of the project:

### Key Features

1. **Task Creation and Management**: Users can easily create, edit, and manage tasks with details.

2. **Task Swapping Operations**: The unique feature of TaskSwap allows users to exchange tasks with others, promoting flexibility and efficient resource allocation.

3. **Community Creation and Management**: Users can create, join, and manage communities, fostering collaboration among like-minded individuals or teams.

4. **Community Tasks**: Create and assign tasks specific to communities, enabling focused group efforts and projects.

5. **User Dashboard**: A comprehensive dashboard for users to manage their personal tasks, view communities, swap requests and notifications.

### Technology Stack

- **Frontend**: Built with Nextjs, offering a responsive and intuitive user interface.
- **Backend**: Powered by Ballerina, providing a robust and scalable server-side solution.
- **Database**: Utilizes MySQL for efficient data storage and retrieval.
- **API**: RESTful API design ensures smooth communication between frontend and backend.

### Demonstration

`https://youtu.be/IrRXBeMek3c?si=tEPyPTmj3ezwKuS4`