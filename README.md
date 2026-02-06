# The Vibe Culture
**https://thevibeculture.uk**:
Welcome to The Vibe Culture, a platform for showcasing creative talent and managing community events. This project is built with Next.js and Firebase, providing a secure and scalable solution for talent submissions and event management.

## Tech Stack

*   **[Next.js](https://nextjs.org/)**: A React framework for building server-side rendered and static web applications.
*   **[Firebase](https://firebase.google.com/)**: A comprehensive platform for building web and mobile applications, used here for authentication and database services.
    *   **[Firebase Authentication](https://firebase.google.com/docs/auth)**: For secure user authentication.
    *   **[Firestore](https://firebase.google.com/docs/firestore)**: A NoSQL database for storing application data.
*   **[NextAuth.js](https://next-auth.js.org/)**: An authentication library for Next.js applications.
*   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [npm](https://www.npmjs.com/)
*   A [Firebase project](https://console.firebase.google.com/)

## Getting Started

To get the project up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd the-vibe-culture
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```
# Firebase Service Account Key (see "Firebase Configuration" below)
FIREBASE_SERVICE_ACCOUNT_KEY='your-firebase-service-account-key-json'

# A secure password for the admin dashboard
ADMIN_PASSWORD='your-admin-password'

# NextAuth.js secret
NEXTAUTH_SECRET='your-nextauth-secret'
```

### 4. Firebase Configuration

This project requires both client-side and server-side Firebase configurations.

#### Server-Side Configuration

1.  **Generate a private key** for your service account in the Firebase console:
    *   Navigate to **Project settings** > **Service accounts**.
    *   Click **Generate new private key**.
2.  **Copy the JSON** contents and paste them as the value for `FIREBASE_SERVICE_ACCOUNT_KEY` in your `.env.local` file. Make sure it is a single line with no line breaks.

#### Client-Side Configuration

1.  Navigate to your **Project settings** in the Firebase console.
2.  In the **General** tab, scroll down to the **Your apps** section.
3.  Select your web app and find the **SDK setup and configuration** section.
4.  Copy the `firebaseConfig` object.
5.  Open `src/lib/firebase.ts` and replace the placeholder values with your `firebaseConfig`.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Dashboard

The Vibe Culture includes a secure admin dashboard for managing talent submissions and events.

### Accessing the Dashboard

To access the admin dashboard, navigate to `/admin/login` and sign in with the email and password of a user you have created in the Firebase Authentication console. To add a user:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to the **Authentication** section.
3. Click the **Add user** button and follow the instructions.

### Features

*   **View Submissions**: See a list of the latest talent submissions.
*   **Manage Events**: Add new events to the platform and delete existing ones.
*   **Secure**: Powered by NextAuth.js and Firebase, ensuring that only authorized users can access the dashboard.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

When deploying to Vercel, make sure to set the same environment variables that are in your `.env.local` file in the Vercel project settings.


https://github.com/user-attachments/assets/d5d7ba99-58c4-4115-a594-ade86f470fc0

