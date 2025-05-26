# Firebase Setup for Fly Foods App

This document outlines the Firebase configuration and security rules for the Fly Foods food delivery application.

## Firebase Services Used

- **Firebase Authentication**: For user signup and login
- **Cloud Firestore**: For storing user data, favorites, and orders
- **Firebase Hosting**: For hosting the web application
- **Firebase Storage**: For storing images (future implementation)

## Security Rules

### Firestore Rules

The Firestore security rules enforce the following access patterns:

1. **Clients Collection**:
   - Users can only read and update their own data
   - Users can create their own user document during registration
   - User documents cannot be deleted through client-side code (admin only)

2. **Subcollections**:
   - Users can manage their own favorites and orders
   - Each user can only access their own subcollections

3. **Restaurants Collection**:
   - Read access is public (everyone can view restaurants)
   - Write access is restricted (admin only)

### Storage Rules (When Enabled)

The Storage security rules enforce:

1. **User Profile Images**:
   - Users can only upload their own profile images
   - Profile images are publicly readable

2. **Restaurant and Menu Images**:
   - All images are publicly readable
   - Upload restrictions to admin accounts only

## Data Structure

```
/clients/{userId}
  - uid: string
  - email: string
  - fullName: string
  - phone: string (optional)
  - createdAt: timestamp
  - favorites: array
  - orders: array
  - addresses: array

/clients/{userId}/favorites/{favoriteId}
  - itemId: string
  - type: "restaurant" | "dish"
  - name: string
  - image: string
  - addedAt: timestamp

/clients/{userId}/orders/{orderId}
  - items: array
  - total: number
  - restaurantId: string
  - restaurantName: string
  - status: string
  - createdAt: timestamp
  - deliveryAddress: object
```

## Deployment

The application can be deployed using:

```
npm run deploy
```

This script:
1. Builds the React application
2. Deploys Firestore rules
3. Deploys Firestore indexes
4. Deploys to Firebase hosting

## Accessing Firebase Console

Access the Firebase Console at: https://console.firebase.google.com/project/fry-lyle/overview

## Local Development

To run Firebase emulators locally:

```
firebase emulators:start
```

This will start local emulators for Firestore, Authentication, and Hosting for development purposes. 