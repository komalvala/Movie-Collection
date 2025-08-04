# Movie Project - React + Vite

This project is a movie booking application built with React and Vite, featuring Firebase authentication and Cloudinary image uploads.

## Features

- User authentication (email/password and Google login)
- Movie management (add, edit, delete)
- Image uploads with Cloudinary
- Movie booking system

## Cloudinary Image Upload Setup

### 1. Environment Setup

Cloudinary is already configured with cloud name 'dheweokqn'. If you want to use your own Cloudinary account:

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com/)
2. Get your Cloud Name from the dashboard
3. Edit the `.env` file in the project root and add your cloud name:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
```

### 2. Create Upload Preset

Make sure you have an upload preset named `wjaninbj` in your Cloudinary dashboard:

1. In your Cloudinary dashboard, go to Settings > Upload
2. Scroll down to "Upload presets" and click "Add upload preset"
3. Create a new preset with these settings:
   - Preset name: `wjaninbj`
   - Signing Mode: Unsigned
   - Folder: Optional (e.g., "movie-posters")
4. Save the preset

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
