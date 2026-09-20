import { createContext, useState, useContext } from "react";
import { useSignIn, useSignUp, useUser } from "@clerk/clerk-react";

export const AuthContext = createContext();

// Add this export so your pages can consume the context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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
        await setSignInActive({ session: result.createdSessionId });
      } else {
        throw new Error("Additional login steps required.");
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
        username,
      });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
      } else {
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
