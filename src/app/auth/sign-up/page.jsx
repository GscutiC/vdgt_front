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
  FacialRecognitionBox
} from '@/components/ui';

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1); 

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
  
  const handleFacialDetectionComplete = () => {
    console.log('Registro facial completado y enviado');
    setCurrentStep(4);
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
                <Label htmlFor="employeeId">ID de Empleado</Label>
                <Input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="ID único"
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
              statusText="Rostro detectado. Mantente quieto...">
              <span className="text-gray-300 text-sm">Centra tu rostro en el marco.</span>
            </FacialRecognitionBox>
            <Flex justify="center">
              <TextButton className="text-cyan-200"
                onClick={handleFacialDetectionComplete}>
                (Demo)
              </TextButton>
            </Flex>
            <Button onClick={() => window.location.href = '/auth/sign-in'}
            >Cancelar Registro Facial
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