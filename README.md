# Web Application with React, Vite

## Overview

This repository hosts a web application with a React and Vite frontend. The frontend is deployed on Vercel, the backend REST API is hosted on Google Cloud Run, and the MySQL database is managed on Microsoft Azure. Image storage is handled via Cloudinary.

## Features

- **Frontend**: React and Vite with Tailwind CSS and DaisyUI for styling.

## User Registration and Access

- **Registration**: Before using the application, you need to register an account. The registration process allows you to create a new user profile with your preferred credentials.
- **Admin Access**: For administrative purposes, you can log in with the following credentials:
  - **Username**: `admin`
  - **Password**: `admin`
  
  Note that these credentials provide administrative access to manage application settings and user data. It is recommended to change the default admin credentials after your first login to ensure security.

## Service Availability

If you encounter any issues accessing the application, it could be due to one of the following reasons:
- **Database Unavailability**: The MySQL database hosted on Microsoft Azure might be down or no longer available.
- **Backend Service Down**: The REST API service on Google Cloud Run may no longer be active.
- **Image Storage Issue**: Cloudinary might be experiencing issues, or image links could be broken.

## [Link to visit website](https://food-order-app-kappa-six.vercel.app/)

---

Feel free to customize this README to fit any additional details or instructions specific to your application.
