# Gunung Putri Square

**A modern, responsive website project built with React and Laravel.**

Gunung Putri Square is a web development project focused on recreating and developing a modern property website interface. The project combines a React-based frontend with a Laravel backend foundation, with an emphasis on visual consistency, responsive layouts, reusable components, and maintainable code.

The project is developed for learning, experimentation, and personal portfolio purposes.

---

## Table of Contents

* [Overview](#overview)
* [Project Objectives](#project-objectives)
* [Technology Stack](#technology-stack)
* [Project Features](#project-features)
* [Website Sections](#website-sections)
* [Project Architecture](#project-architecture)
* [Project Structure](#project-structure)
* [Requirements](#requirements)
* [Installation](#installation)
* [Environment Configuration](#environment-configuration)
* [Running the Application](#running-the-application)
* [Production Build](#production-build)
* [Development Guidelines](#development-guidelines)
* [Security Considerations](#security-considerations)
* [Project Status](#project-status)
* [Future Improvements](#future-improvements)
* [Disclaimer](#disclaimer)
* [Author](#author)

---

## Overview

This project explores the development of a modern property website using a component-based frontend architecture and a PHP-based backend framework.

The frontend uses React to organize interface elements into reusable components, while Laravel provides the foundation for server-side functionality and potential backend integrations.

The interface is designed around a property and residential website concept, emphasizing clear information hierarchy, intuitive navigation, responsive presentation, and a consistent visual identity.

**Project repository:**
https://github.com/ezar-max/gunungputri-square

**Reference website:**
https://www.gunungputri.co.id/

## Project Objectives

The primary objectives of this project are:

* Recreate a reference website's visual structure as accurately as possible.
* Develop a responsive interface for desktop, tablet, and mobile devices.
* Apply reusable React components to improve maintainability.
* Explore integration between a React frontend and a Laravel backend.
* Organize source code using a clear and maintainable project structure.
* Practice modern frontend development and Laravel application development.
* Build a practical project suitable for a developer portfolio.

## Technology Stack

### Frontend

| Technology        | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| React 19          | Component-based user interface                    |
| JavaScript (ES6+) | Frontend logic and interactions                   |
| JSX               | Writing UI components                             |
| HTML5             | Semantic page structure                           |
| CSS3              | Layout, styling, animation, and responsive design |
| Tailwind CSS 4    | Utility-first styling                             |
| Vite              | Development server and frontend build tooling     |
| Lucide React      | Interface icons                                   |

### Backend

| Technology | Purpose                                      |
| ---------- | -------------------------------------------- |
| PHP        | Server-side programming language             |
| Laravel    | Backend framework and application foundation |
| Composer   | PHP dependency management                    |

### Typography

**Plus Jakarta Sans** is used as the project's interface typography where configured.

### Development Tools

* Git for version control.
* GitHub for source code hosting.
* npm for JavaScript package management.
* Composer for PHP package management.
* Vite for frontend development and asset bundling.

> Technology and feature descriptions should reflect the actual dependency versions and implementation in the repository.

## Project Features

The project is organized around the following development areas.

### User Interface

* Component-based frontend architecture.
* Reusable interface elements.
* Consistent typography and visual styling.
* Responsive layout implementation.
* Interactive navigation and interface elements.

### Property Website Interface

The interface is designed around a residential or property website concept, with sections intended to present information in a clear and accessible manner.

### Backend Foundation

Laravel provides a foundation for future server-side functionality, including:

* Route management.
* Controller-based request handling.
* Server-side validation.
* Database integration when configured.
* Authentication and session management when implemented.

### Maintainability

* Separation of interface components.
* Organized styling and frontend assets.
* Dependency management through npm and Composer.
* Version control using Git.

Features that have not yet been implemented or tested should not be considered production-ready.

## Website Sections

The frontend design includes or is intended to include the following sections, subject to the current implementation.

### 1. Navigation

Provides the primary navigation structure and access to important website sections.

### 2. Hero Section

Introduces the website through its primary visual area, headline, and supporting content.

### 3. Property Information

Presents information about the property, residential concept, or development.

### 4. Unit Information

Organizes available unit information into a structured and readable presentation where applicable.

### 5. Location

Provides a dedicated area for presenting location-related information.

### 6. Gallery

Displays property or supporting imagery in a visual format.

### 7. Testimonials

Provides a section for user or customer feedback if the relevant content is available.

### 8. Articles and Information

Organizes supporting articles or informational content where implemented.

### 9. Contact Section

Provides contact-related information and relevant links where available.

### 10. Footer

Contains supporting navigation, supplementary information, and relevant links.

The final list of completed sections should be verified against the actual application before release.

## Project Architecture

The project combines two technologies with different responsibilities.

### React Frontend

React is responsible for rendering the interface and organizing UI elements into reusable components.

The frontend uses JSX, JavaScript, and CSS-based styling, with Vite supporting local development and production asset builds.

### Laravel Backend

Laravel provides the server-side application foundation.

Depending on the implemented integration, it can handle routes, request processing, authentication, validation, and database operations.

### Integration

React and Laravel must be configured to communicate correctly before backend-dependent functionality can be considered operational.

The current repository configuration should be checked to confirm whether the frontend is served independently through Vite or integrated into Laravel's rendering and asset pipeline.

## Project Structure

The following is an illustrative overview. The exact structure depends on the files currently present in the repository.

```text
gunungputri-square/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   └── Models/
├── bootstrap/
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
│   ├── css/
│   ├── js/
│   └── views/
├── routes/
│   └── web.php
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── composer.json
├── package.json
├── vite.config.js
└── README.md
```

Not every directory shown above is necessarily present. Refer to the actual repository for the authoritative project structure.

## Requirements

Before running the project, ensure the following tools are installed:

* PHP version compatible with the Laravel version in `composer.json`.
* Composer.
* Node.js compatible with the dependencies in `package.json`.
* npm.
* A supported database server if database functionality is required.

To check the installed versions:

```bash
php -v
composer --version
node -v
npm -v
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ezar-max/gunungputri-square.git
cd gunungputri-square
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Configure the environment

Create a local environment file from the example:

**Windows Command Prompt:**

```bat
copy .env.example .env
```

**Linux or macOS:**

```bash
cp .env.example .env
```

If `.env.example` is not present, inspect the repository and prepare a safe environment template before proceeding. Never publish real credentials.

### 5. Generate the application key

```bash
php artisan key:generate
```

### 6. Configure the database

If the application requires MySQL or MariaDB, update the relevant settings in `.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gunungputri_square
DB_USERNAME=root
DB_PASSWORD=
```

Use credentials appropriate for your local environment. The example above is for development only.

### 7. Run migrations

If the project contains the required database migrations:

```bash
php artisan migrate
```

Review the migrations before running them against any existing or production database.

## Running the Application

### Start the Laravel development server

```bash
php artisan serve
```

### Start the Vite development server

In a separate terminal:

```bash
npm run dev
```

Open the local URL provided by Laravel or the configured frontend development server, depending on the project's current architecture.

If the React frontend is configured to run independently, follow the scripts defined in `package.json` and the applicable frontend entry point.

## Production Build

To generate optimized frontend assets:

```bash
npm run build
```

For Laravel deployment, configure the production environment according to the application's actual routing and asset integration.

Before deploying, verify:

* Frontend assets load correctly.
* Laravel routes return the intended pages.
* No development server is required in production.
* Environment variables are configured securely.
* Database migrations are ready.
* Debug mode is disabled.
* Authentication and authorization work as intended, if implemented.

## Development Guidelines

To maintain code quality:

* Keep components focused on a single responsibility.
* Reuse common interface elements.
* Keep styling organized and consistent.
* Use meaningful names for components, functions, and variables.
* Avoid duplicating layout code.
* Validate user input on the server when processing backend requests.
* Test changes before committing them.
* Avoid committing generated dependencies and secret environment files.

## Security Considerations

Security should be considered throughout development.

* Never commit `.env` files containing secrets.
* Do not hardcode production credentials.
* Apply appropriate validation to server-side input.
* Use Laravel's built-in CSRF protection where applicable.
* Store passwords using secure password hashing.
* Protect restricted routes with authentication and authorization middleware.
* Avoid exposing private user data.
* Review file upload validation if uploads are implemented.

Authentication and database security measures must be verified against the actual implementation.

## Project Status

**Status:** Under development.

The project is intended for learning, experimentation, and portfolio presentation. Features and backend integrations should be considered complete only after implementation and testing.

## Future Improvements

Potential improvements include:

* Completing React and Laravel integration.
* Implementing secure user authentication.
* Adding role-based access control where necessary.
* Connecting dynamic content to a database.
* Improving accessibility and semantic HTML.
* Optimizing images and page performance.
* Adding automated tests.
* Deploying a live demonstration.
* Documenting API endpoints if an API layer is introduced.

These items are planned improvements, not a claim that the features are already available.

## Disclaimer

This repository is an independent learning and portfolio project inspired by a website reference.

It is not an official website, partnership, or endorsement by the owner of the referenced website.

All third-party trademarks, branding, content, and assets remain the property of their respective owners. Any use of third-party materials should comply with the applicable permissions and terms.

## Author

**Fredi Wahyu Ezar**

* GitHub: [@ezar-max](https://github.com/ezar-max)
* Repository: [gunungputri-square](https://github.com/ezar-max/gunungputri-square)

---

Built as part of an ongoing web development and portfolio project.
