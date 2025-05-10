# Deploying Firebase Storage Rules

This document explains how to deploy the Firebase Storage security rules to your Firebase project.

## Prerequisites

1. Make sure you have the Firebase CLI installed:
   ```
   npm install -g firebase-tools
   ```

2. Ensure you're logged in to Firebase:
   ```
   firebase login
   ```

3. Make sure your project is initialized with Firebase:
   ```
   firebase init
   ```
   
   Select "Storage" when prompted for which Firebase products you want to set up.

## Deploying Storage Rules

1. The storage rules are defined in the `firebase.storage.rules` file.

2. To deploy just the storage rules, run:
   ```
   firebase deploy --only storage
   ```

3. Once deployed, your Firebase Storage will enforce these rules:
   - Anyone can read profile images
   - Only the authenticated user can upload/update their own profile images
   - All other storage operations are denied

## Testing the Profile Image Upload

1. Sign in to your app
2. Go to the Profile page
3. Click on the edit profile button
4. Click on the profile image area to select an image
5. Submit the form to upload the image to Firebase Storage

The image URL will be saved to your Firestore database in the user's document, and the image will be displayed on your profile page, settings page, and in the mobile menu.

## Troubleshooting

If you encounter issues with uploading images:

1. Check the browser console for errors
2. Verify that your Firebase Storage permissions are correctly set
3. Make sure the authenticated user has the correct permissions
4. Check that the image file size is not too large (recommended max: 5MB) 