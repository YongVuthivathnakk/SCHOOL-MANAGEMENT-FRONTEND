# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# SCHOOL-MANAGEMENT-FRONTEND" 


## Reflective Questions

### 1. Why do we use localStorage to store the JWT token instead of saving it in a React state? What are the advantages and risks?

Advantages of using localStorage:
+ Persistence across page reloads: Data in React state is lost when the page refreshes. localStorage retains the token even after a refresh or tab close.
+ Accessibility in non-React code: For example, HTTP clients like Axios can access the token to attach it to request headers.
+ No need to refetch or re-login on reloads: User stays logged in without needing to re-authenticate.

Risks of using localStorage:
+ Vulnerable to XSS attacks: If malicious scripts are injected into your app, they can read from localStorage and steal the token.
+ No automatic expiration handling: Tokens stay there until explicitly removed.
+ Cannot be sent automatically with each HTTP request like cookies with HttpOnly

### 2. How does the AuthContext improve the way we manage user authentication across different pages?

Benefits:
+ Global access: Any component can access the authentication state without prop drilling.
+ Consistency: All parts of the app use the same source of truth for authentication.
+ Better organization: You can encapsulate login/logout logic, token refresh, etc., in one place.
+ Easier testing and debugging: You can simulate auth states during development.
  
### 3. What would happen if the token in localStorage is expired or tampered with? How should our app handle such a case?

If token is expired or tampered with:
+ API requests will fail.
+ Your app may show protected content briefly (if not validating the token immediately).

How to handle it:
+ Validate token on app load: Use AuthContext to decode and check expiration.
+ Handle 401 errors globally: Intercept HTTP errors (e.g., with Axios interceptors) and log the user out or redirect to /login.
+ Clear localStorage: Remove the token to prevent repeated failed requests.
+ Optionally refresh token: If you're using refresh tokens, initiate a silent refresh flow.

### 4. How does using a ProtectedRoute improve the user experience and security of the application?

User Experience:
+ No flickering of protected content: Users don’t see a brief flash of protected routes before being redirected.
+ Smooth redirection: Automatically sends unauthenticated users to login pages.

Security:
+ Route-level protection: Prevents navigation to pages without proper authentication.
+ Keeps unauthorized users out: Even if they try to visit protected URLs manually.

### 5. What are the security implications of showing different UI elements (like "Logout" or "Dashboard") based on the token state? Could this ever leak information?

Potential Risks:
+ UI alon: Hiding links doesn’t prevent access. Backend routes still need protection.
+ Information leakage: If roles/permissions are embedded in JWT and decoded client-side (e.g., isAdmin), a tampered or forged token might reveal features they shouldn’t even know exist.

Best Practices:
+ Always validate token server-side before granting access to data or actions.
+ Never rely only on frontend checks for authorization.
+ Obfuscate sensitive UI when not allowed, but don't assume it's secure just because it's hidden.
