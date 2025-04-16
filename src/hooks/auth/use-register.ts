import { useState } from 'react';
interface DatosRegistro {
    username: string;
    email: string;
    password: string;
    full_name: string;
    facial_data?: any; // Propiedad opcional con el tipo apropiado
  }
  
  const createRequestData = (userData: { employeeId?: string; email: string; password: string; fullName: string }): DatosRegistro => ({
    username: userData.employeeId || userData.email.split('@')[0],
    email: userData.email,
    password: userData.password,
    full_name: userData.fullName,
  });


  export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const registerUser = async (userData, facialData = null) => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Crear el objeto de datos para la solicitud
        const requestData = {
          username: userData.employeeId || userData.email.split('@')[0],
          email: userData.email,
          password: userData.password,
          full_name: userData.fullName,
        };
  
        // Opcional: agregar datos faciales si existen
        if (facialData) {
          // Usar operador de propagación para evitar el error de TypeScript
          const requestWithFacialData = {
            ...requestData,
            facial_data: facialData
          };
          
          console.log('Enviando datos al servidor:', requestWithFacialData);
          
          const response = await fetch('http://127.0.0.1:5000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestWithFacialData),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
          }
  
          setSuccess(true);
          return data;
        } else {
          // Si no hay datos faciales, enviar solo los datos básicos
          console.log('Enviando datos al servidor:', requestData);
          
          const response = await fetch('http://127.0.0.1:5000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
          }
  
          setSuccess(true);
          return data;
        }
      } catch (err) {
        setError(err.message || 'Ocurrió un error durante el registro');
        throw err; // Re-lanzar para que el componente pueda manejarlo
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      registerUser,
      isLoading,
      error,
      success,
    };
  };