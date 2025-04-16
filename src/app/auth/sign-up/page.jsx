'use client';
import { useState } from 'react';
import {
  Button, 
  Input, 
  Label,
  Card,
  Text,
  Avatar,
  Container,
  FormGroup,
  Flex,
  TextButton,
  Heading,
  FacialRecognitionBox,
  StepsIndicator
} from '@/components/ui';
import { useRegister } from '@/hooks/auth/use-register';

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1); 
  const {registerUser, isLoading, error, success} = useRegister();
  const [facialData, setFacialData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const getContainerClassName = () => {
    switch(currentStep) {
      case 1:
        return "py-5 h-auto";
      case 2:
        return "py-19 h-screen";
      case 3:
        return "py-5 h-auto";
      case 4:
        return "py-5 h-screen";
      default:
        return "py-5 h-auto";
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de registro:', formData);
    setCurrentStep(2);
  };
  
  const handleStartFacialSetup = () => {
    console.log('Activando cámara para reconocimiento facial');
    setCurrentStep(3);
  };
  
  const handleCompleteRegistration = async () => {
    // Simulamos que se capturó el rostro
    const simulatedFaceData = 'face_data_placeholder';
    setFacialData(simulatedFaceData);
    
    try {
      // Importante: Enviar formData directamente, no como propiedad de un objeto
      const result = await registerUser(formData, simulatedFaceData);
      console.log('Registro completado exitosamente:', result);
      
      // Avanzar al paso de confirmación
      setCurrentStep(4);
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      // El manejo de errores ya está implementado en useRegister hook
    }
  };
// Agregar después de handleCompleteRegistration

const handleFacialDetectionComplete = async () => {
  try {
    // 1. Acceder a la cámara del usuario
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user" // Cámara frontal
      } 
    });
    
    // 2. Crear un elemento video para mostrar la cámara (temporal)
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();
    
    // 3. Crear un canvas para capturar la imagen
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // 4. Dibujar el fotograma actual en el canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 5. Convertir la imagen a base64
    const capturedImage = canvas.toDataURL('image/jpeg');
    
    // 6. Detener la cámara
    stream.getTracks().forEach(track => track.stop());
    
    // 7. Guardar los datos de la imagen
    setFacialData(capturedImage);
    console.log('Imagen facial capturada correctamente');
    
    // 8. Continuar con el registro
    handleCompleteRegistration();
    
  } catch (error) {
    console.error('Error al acceder a la cámara:', error);
    alert('No se pudo acceder a la cámara. Por favor, verifica los permisos del navegador.');
  }
};


  return (
    <Container className={getContainerClassName()}>
      <Card>
        <Flex justify="center" className="mb-4">
           <Avatar/>
        </Flex>
        {currentStep === 1 && (
          <>
            <Heading>Registro de Nuevo Usuario</Heading>
            <Text>Completa tus datos para crear tu cuenta.</Text>
            <StepsIndicator currentStep={currentStep} steps={3} className="mb-6" />

            <form onSubmit={handleSubmit}>
              <FormGroup className="mb-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nombre Apellido"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Correo Electrónico Corporativo</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu.correo@empresa.com"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Crear Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </FormGroup>
              <FormGroup className="mb-8">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </FormGroup>
              <Button type="submit">
                Siguiente: Registrar Rostro
              </Button>
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <div className="px-4 text-xs text-slate-400">O</div>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>
              <button 
                type="button"
                onClick={() => window.location.href = '/auth/sign-in'}
                className="w-full flex items-center justify-center p-3 text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm"
              >
                <span className="inline-block w-3 h-3 bg-slate-300 rounded-full mr-2"></span>
                ¿Ya tienes cuenta? Iniciar Sesión
              </button>
            </form>
=
          </>
        )}

        {currentStep === 2 && (
          <>
            <Heading>Configuración de Reconocimiento Facial</Heading>
            <StepsIndicator currentStep={currentStep} steps={3} className="mb-6" />
            <Text className="text-lg mb-4 p-1 text-white/80">Sigue estas instrucciones para un registro exitoso:</Text>
            <ul className="space-y-2 mb-6 text-white/70">

              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Busca un lugar con buena iluminación.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Mira directamente hacia la cámara.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Asegúrate que tu rostro esté despejado (sin gorras, mascarillas, etc.).</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Mantén una expresión facial neutra.</span>
              </li>
            </ul>
            <Button 
              className="w-full bg-cyan-400 hover:bg-cyan-500" 
              onClick={handleStartFacialSetup}
            >Activar Cámara y Comenzar</Button>
          </>
        )}
        {currentStep === 3 &&(
          <>
            <Heading>Configuración de Reconocimiento Facial</Heading>
            <StepsIndicator currentStep={currentStep} steps={3} className="mb-6" />

            <FacialRecognitionBox 
      showProgressBar={true} 
      progressValue={70} 
      statusText="Rostro detectado. Mantente quieto..."
      onCapture={(imageData) => {
        setFacialData(imageData);
        console.log('Imagen capturada desde componente');
      }}
    >
      <span className="text-gray-300 text-sm">Centra tu rostro en el marco.</span>
    </FacialRecognitionBox>
            
            <Flex justify="center">
              <TextButton 
              className="text-cyan-200"
              onClick={() => handleFacialDetectionComplete()}
              disabled={isLoading}>
                (Demo)
              </TextButton>
            </Flex>
            <Button 
      onClick={handleCompleteRegistration}
      disabled={isLoading || !facialData}
      className="w-full bg-green-600 hover:bg-green-700"
    >
      {isLoading ? 'Enviando datos...' : 'Completar Registro'}
    </Button> 

          </>
        )}
        {currentStep === 4 && (
          <>
            <Flex justify="center" className="mb-10 text-cyan-400 text-6xl">
              OK
            </Flex>
            <Heading className="text-center text-green-400 mb-6">
              ¡Registro Completado!
            </Heading>
            <Text>
              Tu cuenta ha sido creada exitosamente y tu rostro ha 
              sido registrado para el inicio de sesión seguro.
            </Text>
            <Button onClick={() => window.location.href = '/auth/sign-in'}
            >Ir a Iniciar Sesión
            </Button>    
          </>
        )}
      </Card>
    </Container>
  );
}