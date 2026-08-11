import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth.context";
import { login, register, logout, getMe } from "../auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    
    const handlelogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password})
            setUser(data.user)
            
        } catch (err) {
            
        } finally {
            setLoading(false)
        }
    }
    const handleregister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handlelogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
      const getAndSetUser = async () => {
        setLoading(true);
        try {
          const data = await getMe();
          if (data?.user) {
            setUser(data.user);
          }
        } catch (err) {
          // User is not logged in — this is normal
        } finally {
          setLoading(false);
        }
      };

      getAndSetUser();
    }, []);

    return {
      user,
      loading,
      register: handleregister,
      login: handlelogin,
      logout: handlelogout,
    };
}