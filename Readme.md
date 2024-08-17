# ChainSeats Application

ChainSeats is a decentralized event management application built on Linera's innovative microchain technology. The app enables users to seamlessly create, manage, and participate in events. It includes key functionalities such as creating, subscribing, unsubscribing, and deleting events.

By leveraging Linera's microchains, ChainSeats provides a secure and real-time user experience. Users can store assets and application data on their own chains, ensuring fast finality and reliable data replication. Additionally, the platform supports cross-chain messaging, multi-user chains, and local composability, offering a powerful and flexible programming model for developers.

ChainSeats brings decentralized principles together with cutting-edge blockchain technology to offer a dynamic, user-centric solution for managing events.

![Screenshot (807)](https://github.com/user-attachments/assets/7e879571-a3f3-4db2-8e1a-80a97d2c08ba)

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
