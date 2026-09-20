import { createContext, useState } from "react";
import { useSignIn, useSignUp, useUser } from "@clerk/clerk-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Pull in Clerk's hooks to manage the actual authentication state
  const { user, isLoaded: isUserLoaded } = useUser();
  const {
    isLoaded: isSignInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    isLoaded: isSignUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();

  const [customLoading, setCustomLoading] = useState(false);

  // Global loading state waits for Clerk to initialize + any active form submission
  const loading =
    !isUserLoaded || !isSignInLoaded || !isSignUpLoaded || customLoading;

  const login = async ({ email, password }) => {
    if (!isSignInLoaded) return;
    setCustomLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        // This activates the Clerk session, which will populate the 'user' object and trigger your Protected routes
        await setSignInActive({ session: result.createdSessionId });
      } else {
        throw new Error("Additional login steps required (e.g., 2FA).");
      }
    } catch (error) {
      console.error("Clerk login error:", error);
      throw error;
    } finally {
      setCustomLoading(false);
    }
  };

  const register = async ({ username, email, password }) => {
    if (!isSignUpLoaded) return;
    setCustomLoading(true);

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        username, // Make sure "Username" is enabled in your Clerk Dashboard settings
      });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
      } else {
        // If your Clerk settings enforce email verification, the status will be "missing_requirements".
        // You would handle sending an OTP code here if needed.
        console.warn("User requires further verification:", result);
      }
    } catch (error) {
      console.error("Clerk registration error:", error);
      throw error;
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
