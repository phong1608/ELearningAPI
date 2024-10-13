# E-Learning API Project
 This repository contains a comprehensive backend solution built with TypeScript, designed to support an e-learning platform. The architecture consists of multiple microservices that work together to provide authentication, course management, cart functionality, order processing, reviews, and more.
## Whats Including In This Repository

#### Auth Microservice
* Handles user authentication and authorization.
* Implements JWT (JSON Web Tokens) for secure token-based authentication.
* Provides user registration and password management features.
#### Course Microservice
* Manages courses, including creation, updates, and retrieval of course details.
* Supports categorization and tagging of courses for easier discovery.
* Allows users to enroll in courses .
#### Cart Microservice
* Manages the shopping cart functionality.
* Enables users to add, remove, and update courses in their cart.
* Integrates with the Order microservice for seamless checkout using message queue.
#### Order Microservice
* Handles order processing and management.
* Keeps track of order statuses and user order history.
#### Review Microservice
* Manages user reviews and ratings for courses.
* Allows users to submit, edit, and delete their reviews.
* Aggregates reviews for display on course pages.
#### Gateway API
* Acts as a single entry point for all microservices.
* Handles routing, authentication, and response aggregation.
* Provides rate limiting and load balancing features.
#### Discount Microservice
* Manages discount codes and promotional offers.
* Validates discount codes during checkout and applies discounts accordingly.
#### Docker Compose establishment with all microservices on docker;
* Containerization of microservices
* Containerization of databases
* Override Environment variables


### Getting Started


You will need the following tools:

* [Node.js (v20 or later)]
* [TypeScript]
* [Docker] (for containerization)
* [Docker Compose]


### Installing
Follow these steps to get your development environment set up: (Before Run Start the Docker Desktop)
1. Clone the repository
2. Once Docker for Windows is installed, go to the **Settings > Advanced option**, from the Docker icon in the system tray, to configure the minimum amount of memory and CPU like so:
* **Memory: 4 GB**
* CPU: 2
3. At the root directory of solution, select **docker-compose** and **Set a startup project**. **Run docker-compose without debugging on visual studio**.
  Or you can go to root directory which include **docker-compose.yml** files, run below command:
```csharp
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

4. Wait for docker compose all microservices. 


In the root directory, use Docker Compose to start all microservices:


docker-compose up -d
Wait for all containers to start. 
