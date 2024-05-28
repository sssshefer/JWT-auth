# JWT Authentication

This application demonstrates the benefits of using Json Web Tokens (JWT) for authentication. The app is built with React, TypeScript, Express, Node.js, MongoDB and Docker

## Features

- **Sign Up and Login**: Create an account and log in using JWT for secure session management
- **Persistent Login**: Stay logged in even after reloading the page or closing the browser
- **Password Recovery**: Recover your password via email if you have access to the provided email address
- **Change Password**: Change your password from the "Account" page, which will log you out from all devices
- **Auto-Saved Inputs**: Update your first and last name on the "Account" page with debounced input that auto-saves after a short delay
- **Password Change Alerts**: Receive warnings when the password on your account is changed to enhance security
  
## Test User Credentials For Website

- **Email**: test@test.com
- **Password**: 12345678

You can sign up with real credentials, and the application will send a confirmation email. To bypass email confirmation, check the "Turn off email confirmation" checkbox

## Exciting Features to Explore in This Project

1. **Sign Up**: Create an account using the test credentials or your own email
2. **Log In**: Log in with your credentials to access protected routes and features
3. **Account Management**: 
    - Recover your password if needed
    - Change your password from the "Account" page
    - Update your first and last name with auto-saved inputs
   
## Project Structure

### Backend

The backend is built with **Express** and **Node.js** and handles core functionalities which is to process user requests

- #### **Authentication**: 
  Uses **JWT** to manage user sessions securely
        
> [!NOTE] 
> Tokens in JWT are issued upon login and included with each request to verify the user's identity. We need them to authenticate users without repeated database queries, improving performance. JWT is secure because it uses signatures to ensure the token's integrity and authenticity
>
> **Access Tokens** are short-lived tokens used to access protected resources. They are typically stored in memory or local storage on the client side
>
> **Refresh Tokens** are long-lived tokens used to obtain new access tokens when the current one expires. They are usually stored in HTTP-only cookies to enhance security, preventing JavaScript access and           reducing the risk of XSS attacks

- #### **Database**:
  Stores user data in **MongoDB**, a NoSQL database known for high availability and scalability

- #### **Emails**:
  The email service is implemented with **Nodemailer**, allowing the application to send confirmation and password recovery emails
  

### Frontend

The frontend is developed with **React** and **TypeScript**:

-  #### **User Interface**:
    User-friendly UI with components for signing up, logging in, and managing account settings

- #### **Persistent Login**:
    Supports persistent login through secure storage of JWT

## How to Run locally 
To start the application, first clone the repository
```bash
git clone <repository_url>
```

Then, navigate to the project directory and run the following commands:
```bash
docker-compose build
docker-compose up
```

> [!IMPORTANT]  
> **Ecosystem Config Files**
> 
> In order to use the application locally, you'll need the `ecosystem.config.js` file for both the frontend and backend. However, these files contain confidential data and cannot be uploaded here. 
> Make sure to create these files yourself with the necessary configurations before running the application locally. But it's much easier to try the project online by following the link

## NGINX container
The NGINX configurations are not completed, but you can utilize the templates provided to configure it according to your needs


*Happy coding*
