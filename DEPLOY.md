# Deploying 360 ScamShield AI to Netlify

Follow these steps to deploy the application:

1. **GitHub Connection**:
   - Create a new repository on GitHub and push the codebase.
   - Go to Netlify, click "Add new site" > "Import an existing project".
   - Select your repository.

2. **Build Configuration**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

3. **Environment Variables**:
   - In Netlify, go to "Site configuration" > "Build & deploy" > "Environment".
   - Add the following variables (refer to `.env.example`):
     - `GEMINI_API_KEY`
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`

4. **Firebase Setup**:
   - Ensure your Firebase Authorized Domain includes your new Netlify site URL (e.g., `yoursite.netlify.app`) in the Firebase Console under "Authentication" > "Settings" > "Authorized Domains".
