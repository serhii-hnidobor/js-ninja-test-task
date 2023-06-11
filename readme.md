# Hero CRUD Application

This is a Hero CRUD (Create, Read, Update, Delete) application built with Node.js, Express, Ajv, React, Vite, Redux, and Supabase. The application provides functionality to manage heroes, including creating new heroes, updating existing heroes, viewing hero details, listing all heroes, and deleting heroes. It also incorporates user authentication for secure access to the application.

# Features

### Create a New Superhero

Users can add a new superhero to the application by providing the following details:
- Nickname
- Real Name
- Catchphrase
- Description
- Superpowers (as an array of strings)
- Images (multiple images can be assigned to a superhero)

### Update Superhero Details

Users can modify the information of existing superheroes, including:
- Nickname
- Real Name
- Catchphrase
- Description
- Superpowers
- Images (edit, assign, or remove images)

### List All Superheroes

Users can view a list of all superheroes in the application. Each item in the list displays:
- Nickname
- One image representing the superhero

Pagination is implemented, allowing users to view 5 superheroes at a time.

### View Superhero Details

Users can access detailed information about a specific superhero, including:
- Nickname
- Real Name
- Catchphrase
- Description
- Superpowers
- All assigned images for the superhero

### Delete Superheroes

Users can remove superheroes from the application, effectively deleting them from the system. This action permanently removes the superhero and their associated images.

## Additional features

###  User authentication:

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
