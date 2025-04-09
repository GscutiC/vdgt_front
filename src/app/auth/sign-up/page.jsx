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
  const [currentStep, setCurrentStep] = useState(1); // Paso 1: datos, Paso 2: configuración facial
  
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
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
    <Container>
      <Card>
        <Flex justify="center" className="mb-6">
           <Avatar/>
        </Flex>
        {currentStep === 1 && (
          <>
            <Heading>Registro de Nuevo Usuario</Heading>
            <Text className="text-center text-gray-300">
              Completa tus datos para crear tu cuenta.
            </Text>
            <Text className="text-center text-cyan-400">
              Paso 1 de 3
            </Text>
            <form onSubmit={handleSubmit}>
              <FormGroup>
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
            </form>
            <Flex justify="center" className="mt-6">
              <TextButton onClick={() => window.location.href = '/auth/sign-in'}>
                ¿Ya tienes cuenta? Iniciar Sesión
              </TextButton>
           </Flex>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Heading>Configuración de Reconocimiento Facial</Heading>
            <Text className="text-center text-cyan-400">
              Paso 2 de 3
            </Text>
            <Text className="text-lg mb-4 p-1">Sigue estas instrucciones para un registro exitoso:</Text>
            <ul className="space-y-2 mb-6">
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
            <Text className="text-center text-cyan-400">
              Paso 3 de 3
            </Text>
            <FacialRecognitionBox 
              showProgressBar={true} 
              progressValue={70} 
              statusText="Rostro detectado. Mantente quieto...">
              <span className="text-gray-300 text-sm">Centra tu rostro en el marco.</span>
            </FacialRecognitionBox>
            <Flex justify="center">
              <TextButton 
                onClick={handleFacialDetectionComplete}>
                Completar Registro (Demo)
              </TextButton>
            </Flex>
            <Flex justify="center">
              <TextButton onClick={() => setCurrentStep(2)}>
                Cancelar Registro Facial
              </TextButton>
            </Flex>
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