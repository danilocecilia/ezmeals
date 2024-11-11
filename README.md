# EZ Meals

EZ Meals is a meal planning and management application designed to help users plan their meals for the week, manage their shopping lists, and discover new recipes. The application provides a user-friendly interface for browsing meals, adding them to a weekly planner, and managing quantities based on user preferences.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

The project structure is as follows:

```
.env.local
.eslintignore
.eslintrc.json
.gitignore
.next/
.nvmrc
.prettierrc.js
.vscode/
app/
components/
context/
hooks/
lib/
public/
types/
utils/
package.json
postcss.config.js
tailwind.config.ts
tsconfig.json
README.md
```

### Key Directories and Files

- **app/**: Contains the main application pages and components.
- **components/**: Reusable UI components.
- **context/**: Context providers for global state management.
- **hooks/**: Custom React hooks.
- **lib/**: Utility functions and libraries.
- **public/**: Static assets like images and fonts.
- **types/**: TypeScript type definitions.
- **utils/**: Utility functions.
- **.env.local**: Environment variables.
- **.eslintrc.json**: ESLint configuration.
- **.prettierrc.js**: Prettier configuration.
- **tailwind.config.ts**: Tailwind CSS configuration.
- **tsconfig.json**: TypeScript configuration.

## Features

- **Authentication**: User authentication using NextAuth.js.
- **State Management**: Global state management using React Context API.
- **Forms**: Form handling with React Hook Form and Zod for schema validation.
- **UI Components**: Custom UI components built with Radix UI and Tailwind CSS.
- **File Upload**: File upload functionality using react-dropzone.
- **Carousel**: Image carousel using Embla Carousel.
- **API Routes**: Custom API routes for handling server-side logic.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the application in production mode. Make sure to run `npm run build` first.

### `npm run lint`

Runs ESLint to check for linting errors.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.