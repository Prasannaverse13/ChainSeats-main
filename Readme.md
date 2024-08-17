# ChainSeats Application

ChainSeats is a decentralized application built on the Linera microchain for the Linera Spring Hackathon - 2024. It allows users to manage events seamlessly. This application includes functionalities for creating, subscribing, unsubscribing, and deleting events.

## Features

- **Create Event**: Users can create new events with details such as time, name, place, description, participants, and image URL.
- **Subscribe to Event**: Users can subscribe to events using the chain ID.
- **Unsubscribe from Event**: Users can unsubscribe from events using the chain ID.
- **Delete Event**: Users can delete events using a unique key.


## Deployment and Running the Frontend

To deploy and run the frontend of the ChainSeats application, follow these steps:

1. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Navigate to the `event-frontend` directory and install the required dependencies by running:
   ```bash
   cd event-frontend
   npm install
   ```

2. **Run the Frontend**:
   Start the development server by running:
   ```bash
   npm start
   ```
   This will launch the frontend application, and you can access it in your web browser at `http://localhost:3000`.

By following these steps, you can deploy and run the frontend of the ChainSeats application seamlessly.


## Deployment and Running the Backend

To deploy and run the backend of the ChainSeats application, follow these steps:

1. **Build the Project**:
   Ensure you have Rust installed. Navigate to the root directory of the project and build the project by running:
   ```bash
   cargo build
   ```

2. **Run the Deployment Script**:
   Execute the `deploy.sh` script to deploy the backend. This script will build the project, initialize the Linera network, publish and create the application, and start the Linera services. Run the script by executing:
   ```bash
   ./deploy.sh
   ```

By following these steps, you can deploy and run the backend of the ChainSeats application seamlessly.
