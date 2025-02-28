# React Data Table Application

A modern React application built with TypeScript that displays data from the DummyJSON API in a responsive and interactive data table.

## Features

- Two main pages: Users and Products
- Reusable components across pages
- Data fetching with Axios
- State management with Redux Toolkit
- Responsive design with Tailwind CSS
- Custom pagination
- Client-side filtering
- Server-side pagination

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit
- Axios
- Lucide React
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FrontEndDevAsti/react-data-table-task.git
cd react-data-table
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── DataTable.tsx   # Main data table component
│   ├── Navbar.tsx      # Navigation component
│   └── Pagination.tsx  # Pagination component
├── pages/              # Page components
│   ├── Users.tsx       # Users page
│   └── Products.tsx    # Products page
├── store/              # Redux store
│   ├── index.ts        # Store configuration
│   ├── usersSlice.ts   # Users state management
│   └── productsSlice.ts # Products state management
├── utils/              # Utility functions
│   └── api.ts          # API service functions
├── App.tsx             # Main application component
└── main.tsx            # Entry point
```

## Routes

- `/users` - Displays a table of users with filtering and pagination
- `/products` - Displays a table of products with filtering, pagination, and category tabs

## API

This project uses the [DummyJSON API](https://dummyjson.com/) for fetching data:
- Users: `https://dummyjson.com/users`
- Products: `https://dummyjson.com/products`


