// src/context/AuthContext.tsx
import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    user: { [key: string]: any } | null;
    setUser: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
    saveUserData: (data: { token: string; userId: string }) => Promise<void>;
    clearUserData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<{ [key: string]: any } | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const userId = await AsyncStorage.getItem('userId');
                if (token && userId) {
                    setUser({ token, userId });
                }
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        };

        loadUserData();
    }, []);

    const saveUserData = async (data: { token: string; userId: string }) => {
        try {
            await AsyncStorage.setItem('accessToken', data.token);
            await AsyncStorage.setItem('userId', data.userId);
            setUser(data);
        } catch (error) {
            console.error('Failed to save user data:', error);
        }
    };

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('userId');
            setUser(null);
        } catch (error) {
            console.error('Failed to clear user data:', error);
        }
    };

    return (
        <AuthContext.Provider
            {...props}
            value={{ user, setUser, saveUserData, clearUserData }}
        />
    );
};

export { AuthProvider, useAuth };
