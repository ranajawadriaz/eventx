import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/screens/LoadingScreen';

const withLoading = (WrappedComponent:any) => {
  return (props:any) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate a loading delay or perform initialization logic here
      const loadData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate a delay
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }, []);

    if (isLoading) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
