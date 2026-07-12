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
        const data = await getMe();
        setUser(data.user);
        setLoading(false);
      };

      getAndSetUser();
    }, []);

    return {user, loading, handleregister, handlelogout, handlelogin}
}