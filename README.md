# React Product Display Application

This is a modular React application that allows product display, adding items to a shopping cart, login functionality, and support for multiple themes. The project is built using TypeScript and Redux for state management and is configured for easy startup using Docker Compose.

## Application Goal

To create a modular React application with the following functionalities:
* Login form with validation
* Product list with the ability to add items to the cart
* Product detail view by route
* Support for multiple themes (without external libraries)
* Architecture prepared for future expansion

## Features

* **Login Page**: A form with username and password fields, including validation.
    * Hardcoded credentials: `username: admin`, `password: Admin123$`
* **Product List**: Displays products with an image, name, short description, and price. Data is fetched from the [Fake Store API](https://fakestoreapi.com/products).
* **Product Details**: A separate page for each product, accessible via the `/products/:id` route.
* **Shopping Cart**: Functionality for adding/removing products, viewing the total price, and an item counter. Accessible at the `/cart` route.
* **Multi-Theme Support**: The ability to choose between at least two themes (e.g., Light, Dark, Blue, Red) that apply to the entire application without using external UI libraries. The selected theme is saved in `localStorage`.
* **State Persistence**: The shopping cart and selected theme are saved in `localStorage` between sessions. Authentication state is also persisted.

## Technologies

* **React** (v18+)
* **TypeScript**
* **Vite** as the build tool
* **React Router DOM** (v6) for routing
* **Redux Toolkit** for state management
* **Nginx** (inside a Docker container) for serving static files
* **Docker** and **Docker Compose** for containerization

## Prerequisites

To run this project, you need to have the following installed:
* [Node.js](https://nodejs.org/) (recommended LTS version matching the one in `Dockerfile`, e.g., v22.x)
* `npm` (comes with Node.js) or `yarn`
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop installation)

## Setup and Running the Project

### 1. Clone the Repository
``bash
git clone https://github.com/Metalocalypse/React-shop
cd React-shop

### 2. Running with Docker Compose (Recommended)
This is the simplest way to run the application in a production-like environment.

1.  Ensure Docker Desktop is running.
2.  From the project root, run:
    ```bash
    docker-compose up --build
    ```
    * The `--build` option will ensure the Docker image is rebuilt if there have been changes to the `Dockerfile` or code. For subsequent runs without changes, `docker-compose up` is sufficient.
3.  The application will be available at: **[http://localhost:8080](http://localhost:8080)**

To stop the application started via Docker Compose, press `Ctrl + C` in the terminal where it's running, and then you can run:
```bash
docker-compose down