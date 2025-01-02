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
import { isNotEmpty, isNotNull } from "../../utils/Helpers";

type AuthContextType = {
    user: string | null;
    setUser: Dispatch<SetStateAction<string | null>>;
    saveUserData: (data: string | null) => Promise<void>;
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
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (isNotEmpty(token)) {
                    setUser(token);
                }
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        };

        loadUserData();
    }, []);

    const saveUserData = async (data: string | null) => {
        try {
            if (isNotNull(data) && isNotEmpty(data)) {
                await AsyncStorage.setItem('accessToken', data ? data : "");
                setUser(data);
            }
        } catch (error) {
            console.error('Failed to save user data:', error);
        }
    };

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
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
