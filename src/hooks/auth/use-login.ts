import { useState } from 'react';

interface LoginCredentials {
  email: string;
  password?: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Inicia sesión usando contraseña o reconocimiento facial
   * @param credentials - Credenciales de usuario
   * @param facialData - Datos faciales en formato base64 (opcional)
   */
  const login = async (credentials: LoginCredentials, facialData: string | null = null) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Método 1: Login con reconocimiento facial
      if (facialData) {
        console.log('Iniciando sesión con reconocimiento facial...');
        
        try {
          // Convertir base64 a Blob para enviar como archivo
          const fetchResponse = await fetch(facialData);
          const blob = await fetchResponse.blob();
          
          // Crear FormData
          const formData = new FormData();
          formData.append('face_image', blob, 'face.jpg');
          
          // Configurar timeout para evitar bloqueos
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos
          
          try {
            const response = await fetch('http://127.0.0.1:5000/auth/login_face', {
              method: 'POST',
              body: formData,
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            console.log('Respuesta recibida:', response.status);
            
            const data = await response.json();
            console.log('Datos de respuesta:', data);

            if (!response.ok) {
              throw new Error(data.error || 'Error al iniciar sesión con reconocimiento facial');
            }

            // Guardar token en localStorage
            if (data.access_token) {
              localStorage.setItem('accessToken', data.access_token);
            }

            setSuccess(true);
            return data;
          } catch (fetchError: any) {
            if (fetchError.name === 'AbortError') {
              console.error('La solicitud tardó demasiado y fue abortada');
              throw new Error('Tiempo de espera agotado. Intente nuevamente o use contraseña.');
            }
            throw fetchError;
          }
        } catch (error: any) {
          console.error('Error en login facial:', error);
          throw new Error(`Error en reconocimiento facial: ${error.message}`);
        }
      } 
      // Método 2: Login con contraseña
      else {
        console.log('Iniciando sesión con credenciales...');
        
        const requestData = {
          email: credentials.email,
          password: credentials.password
        };
        
        const response = await fetch('http://127.0.0.1:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        console.log('Respuesta de login:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Credenciales inválidas');
        }

        // Guardar token en localStorage
        if (data.access_token) {
          localStorage.setItem('accessToken', data.access_token);
        }

        setSuccess(true);
        return data;
      }
    } catch (err: any) {
      console.error('Error en login:', err);
      setError(err.message || 'Ocurrió un error durante el inicio de sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setSuccess(false);
  };

  return {
    login,
    logout,
    isLoading,
    error,
    success,
  };
};