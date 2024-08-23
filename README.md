# **Receipt Processor Project**


## **Overview**

This project implements a receipt processing service that handles the submission of receipts, calculates points based on predefined rules, and stores the processed data in-memory. The service is built with Node.js, Express, and TypeScript, and it is containerized using Docker for easy deployment and testing.

## **Project Setup**

### **Docker Setup**

This project is containerized using Docker, allowing for consistent and easy deployment across various environments.

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Haydenbugs/receipt-processor.git
    ```

2. **Build the Docker Image**:

    Build the Docker image for the project using the following command:

    ```bash
    docker build -t receipt-processor .
    ```

3. You can run the Docker container using Docker Compose through the following command:

    ```bash
    docker-compose up
    ```

    This command will start the application and expose it on `http://localhost:3000`.

### **Running the Project Locally**

If you prefer to run the project locally without Docker:

1. **Install Dependencies**:

    ```bash
    npm install
    ```

2. **Build the Project**:

    Compile the TypeScript files to JavaScript:

    ```bash
    npm run build
    ```

3. **Start the Server**:

    Start the application server:

    ```bash
    npm run dev
    ```

    The server will be running at `http://localhost:3000`.

### **Testing the Endpoints**

You can test the API endpoints using Postman or any other API testing tool.

1. **Process Receipt**:
    - **Endpoint**: `POST /receipts/process`
    - **Description**: Submits a receipt for processing and returns a JSON object with an ID.
    - **Example Request**:
      ```json
      {
        "retailer": "Target",
        "purchaseDate": "2022-01-01",
        "purchaseTime": "13:01",
        "items": [
          {
            "shortDescription": "Mountain Dew 12PK",
            "price": "6.49"
          },
          {
            "shortDescription": "Emils Cheese Pizza",
            "price": "12.25"
          }
        ],
        "total": "18.74"
      }
      ```
    - **Example Response**:
      ```json
      {
        "id": "7fb1377b-b223-49d9-a31a-5a02701dd310"
      }
      ```

2. **Get Points**:
    - **Endpoint**: `GET /receipts/{id}/points`
    - **Description**: Retrieves the number of points awarded for a given receipt.
    - **Example Response**:
      ```json
      {
        "points": 32
      }
      ```

    Replace `{id}` with the ID returned from the `POST /receipts/process` request.

## **Implementation Details**

### **Receipt Processing**

- **API Endpoints**:
  - Implemented a `POST /receipts/process` endpoint to handle receipt submission.
  - Implemented a `GET /receipts/{id}/points` endpoint to retrieve the points awarded for a specific receipt.
- **Controllers**:
  - Controllers manage incoming HTTP requests, interact with the service layer, and return the appropriate HTTP responses.
- **DTOs (Data Transfer Objects)**:
  - DTOs are used to validate and transform incoming data, ensuring the data structure is correct before being processed by the service layer.

### **Points Calculation Logic**

- **Rules for Points Calculation**:
  - We developed a comprehensive set of rules to calculate points from a receipt:
    - 1 point for every alphanumeric character in the retailer name.
    - 50 points if the total is a round dollar amount with no cents.
    - 25 points if the total is a multiple of 0.25.
    - 5 points for every two items on the receipt.
    - Additional points based on the length of the item description, odd purchase dates, and specific purchase times.
  - The logic is encapsulated in helper functions to ensure modularity and reusability.

### **Project Structure**

The project is structured to ensure that each module has a clear and defined role:


```plaintext
├── src
│   ├── controllers          # API Controllers that manage request and response logic
│   ├── dtos                 # Data Transfer Objects for validating and shaping incoming data
│   ├── entities             # Core entities/models used across the application
│   ├── routes               # API route definitions
│   ├── services             # Business logic and helpers, including points calculation
│   ├── tests                # Unit tests for services and helpers
│   └── index.ts             # Application entry point
├── Dockerfile               # Docker configuration for building the image
├── docker-compose.yml       # Docker Compose configuration for running the application
├── package.json             # Project metadata and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
