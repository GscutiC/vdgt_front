import { useState } from 'react';

interface DatosRegistro {
  username: string;
  email: string;
  password: string;
  full_name: string;
  facial_data?: any;
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

  /**
   * Registra un nuevo usuario
   */
  const registerUser = async (userData, facialData = null, useFacialRecognition = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Caso 1: Usuario decide registrarse CON reconocimiento facial
      if (useFacialRecognition && facialData) {
        try {
          console.log('Preparando datos faciales para envío...');
          
          // Método alternativo para convertir base64 a blob
          // ya que el método anterior podría estar fallando
          const base64Response = facialData.split(',')[1]; // Eliminar prefijo data:image/jpeg;base64,
          const byteCharacters = atob(base64Response);
          const byteNumbers = new Array(byteCharacters.length);
          
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          
          console.log('Blob creado correctamente:', blob.size, 'bytes');
          
          // Crear un objeto FormData para enviar la imagen
          const formData = new FormData();
          formData.append('username', userData.employeeId || userData.email.split('@')[0]);
          formData.append('email', userData.email);
          formData.append('password', userData.password);
          formData.append('full_name', userData.fullName);
          formData.append('face_image', blob, 'face.jpg');
          
          console.log('FormData construido, enviando solicitud...');
          
          // Agregar timeout para evitar que la solicitud se bloquee indefinidamente
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos
          
          try {
            const response = await fetch('http://127.0.0.1:5000/auth/register_face', {
              method: 'POST',
              body: formData,
              signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            console.log('Respuesta recibida:', response.status);
            
            const data = await response.json();
            console.log('Datos de respuesta:', data);

            if (!response.ok) {
              throw new Error(data.error || 'Error al registrar usuario con reconocimiento facial');
            }

            setSuccess(true);
            return data;
          } catch (fetchError) {
            if (fetchError.name === 'AbortError') {
              console.error('La solicitud tardó demasiado y fue abortada');
              throw new Error('Tiempo de espera agotado. Intente nuevamente o use registro sin rostro.');
            }
            throw fetchError;
          }
        } catch (error) {
          console.error('Error detallado:', error);
          
          // Si hay error con facial, intentar registro normal como fallback
          console.warn('Error en reconocimiento facial, recurriendo a registro básico');
          const basicRequestData = createRequestData(userData);
          
          const basicResponse = await fetch('http://127.0.0.1:5000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(basicRequestData),
          });
          
          const basicData = await basicResponse.json();
          if (!basicResponse.ok) {
            throw new Error(basicData.error || 'Error al registrar usuario');
          }
          
          setSuccess(true);
          return {
            ...basicData,
            message: basicData.message + ' (facial fallido, registro básico exitoso)'
          };  
        }
      } 
      // Caso 2: Usuario decide registrarse SIN reconocimiento facial
      else {
        const requestData = createRequestData(userData);
        
        console.log('Enviando registro básico sin reconocimiento facial');
        
        const response = await fetch('http://127.0.0.1:5000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al registrar usuario');
        }

        setSuccess(true);
        return data;
      }
    } catch (err) {
      console.error('Error final:', err);
      setError(err.message || 'Ocurrió un error durante el registro');
      throw err;
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