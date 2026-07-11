import { useContext } from "react";
import { AuthContext } from "../../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    
    const handlelogin = async ({ email, password }) => {
        setLoading(true)
        const data = await login({ email, password })

        setUser(data.user)
        setLoading(false)
        
    }
    const handleregister = async ({ username, email, password }) => {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    const handlelogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }

    return {user, loading, handleregister, handlelogout, handlelogin}
}