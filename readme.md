# Hero CRUD Application

This is a Hero CRUD (Create, Read, Update, Delete) application built with Node.js, Express, Ajv, React, Vite, Redux, and Supabase. The application provides functionality to manage heroes, including creating new heroes, updating existing heroes, viewing hero details, listing all heroes, and deleting heroes. It also incorporates user authentication for secure access to the application.

# Features

## Create a new hero:

Users can add new heroes to the application by providing details such as the hero's name, superpowers, and description.

## Update hero details:

Users can modify the information of existing heroes, including their names, superpowers, images, and descriptions.

## View hero details:

Users can view the details of a specific hero, including their name, superpowers,images, and description.

## List all heroes:

Users can see a list of all the heroes currently available in the application, displaying their nickname and one image.

## Delete heroes:

Users can remove heroes from the application, effectively deleting them from the system.

## User authentication:

The application utilizes Supabase for user authentication, ensuring secure access to the CRUD operations.

# Technologies Used

## Backend:

1. Node.js
2. Express
3. Ajv
4. Typescript
5. Supabase

## Frontend

1. React
2. Redux
3. Tailwind
4. Vite
5. Typescript

# Getting Started

## Prerequisites

Node.js (version >=16 <19)
Yarn (latest version)

## Installation

1. Clone the repository: git clone <repository-url>
2. Navigate to the project directory: cd js-ninja-test-task
3. Install dependencies: yarn

### Configuration

#### Shared Configuration:

Create a .env file in the shared directory.
Add the following environment variables to the .env file:
SUPABASE_URL: Your Supabase API URL
SUPABASE_KEY: Your Supabase API Key
use .env.example as example

- for test propose you can use this supabase credaential
  SUPABASE_URL='https://rljmvdkvedtzmgkznivz.supabase.co'
  SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsam12ZGt2ZWR0em1na3puaXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyMjE0NDYsImV4cCI6MjAwMTc5NzQ0Nn0.B_citWnEEaxa0OhpldLUBdIRqa2wKhl4Hioiiun3oKM'

#### Frontend Configuration:

Create a .env file in the frontend directory. use .env.example as example to fill in .env

### Usage

#### Build

after add all .env run yarn run build

#### Start the backend server:

Run the server: yarn run start:backend

#### Start frontend

Run yarn run dev:frontend

Access the application in your browser: http://localhost:5173
