// contexts/OnlineStatusContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type OnlineStatusContextType = {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
  loading: boolean;
};

const OnlineStatusContext = createContext<OnlineStatusContextType>({
  isOnline: false,
  setIsOnline: () => {},
  loading: true,
});

export const OnlineStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnlineState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isOnline');
        if (value !== null) {
          setIsOnlineState(value === 'true');
        }
      } catch (error) {
        console.error('Error loading isOnline:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, []);

  const setIsOnline = async (value: boolean) => {
    try {
      setIsOnlineState(value);
      await AsyncStorage.setItem('isOnline', value.toString());
    } catch (error) {
      console.error('Error saving isOnline:', error);
    }
  };

  return (
    <OnlineStatusContext.Provider value={{ isOnline, setIsOnline, loading }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = () => useContext(OnlineStatusContext);
