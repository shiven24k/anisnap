# Social Media Clone

This project is a social media clone built with React, Chakra UI, and Supabase. It aims to replicate the basic functionality of popular social media platforms, allowing users to create accounts, post content, interact with posts, and connect with other users.
![image](https://github.com/user-attachments/assets/0ac0f648-247f-4e24-8a42-7674c7a607ae)

Link:-https://socialmedia-citadel.vercel.app/

## Features

- **User Authentication:** Users can sign up, sign in, and sign out securely using Supabase Auth.
- **Profile Management:** Users can update their profile information and upload profile pictures.
- **Post Creation:** Users can create posts with text and images.
- **Post Interaction:** Users can like, comment on, and share posts.
- **Responsive Data:** Posts and interactions are stored in Supabase Postgres.
- **Responsive Design:** The application is responsive and works well on both desktop and mobile devices.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Chakra UI:** A simple, modular, and accessible component library for React.
- **Supabase:** Backend-as-a-service for auth, Postgres data, and storage.
  - **Supabase Auth:** For user authentication.
  - **Supabase Postgres:** For app data.
  - **Supabase Storage:** For user-uploaded images.


## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/shiven24k/anisnap.git
```
2. Go to git directory
```bash
cd insta  
```
2. Install node package

```bash
npm install
```
3. Create a .env file and copy the Supabase project URL and anon key into it.
```bash
VITE_SUPABASE_URL=<YOUR_SUPABASE_PROJECT_URL>
VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
VITE_AUTH_REDIRECT_URL=http://127.0.0.1:5173
```
4. Start with npm
```bash
npm run dev
```



    
