'use client';
import { useState } from 'react';
import {
  Button, 
  Input, 
  Label, 
  LinkText, 
  TextButton, 
  Card, 
  Avatar, 
  FacialRecognitionBox,
  Text,
  Container, 
  FormGroup, 
  Flex, 
  Heading
} from '@/components/ui';

export default function LoginForm() {
  // Estado para controlar qué método de inicio de sesión mostrar
  const [loginMethod, setLoginMethod] = useState('password'); 
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión con:', credentials);
  };

  // Función para cambiar entre métodos de inicio de sesión
  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'password' ? 'facial' : 'password');
  };

  return (
    <Container>
      <Card>
        <Flex justify="center" className="mb-6">
          <Avatar />
        </Flex>
        
        {loginMethod === 'password' ? (
          <>
            <Heading>Iniciar Sesión con Contraseña</Heading>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">ID de Empleado / Email</Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Tu ID o correo electrónico"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </FormGroup>
              <Flex justify="end" className="mb-6">
                <LinkText href="/forgot-password">
                  Olvidé mi Contraseña
                </LinkText>
              </Flex>
              <Button type="submit">Ingresar</Button>
            </form>
            <Flex justify="center" className="mt-6">
              <TextButton onClick={toggleLoginMethod}>
                Intentar con Reconocimiento Facial
              </TextButton>
            </Flex>
          </>
        ) : (
          <>
            <Heading>Iniciar Sesión</Heading>
            <FacialRecognitionBox statusText="[Simulación de escaneo activo...]">
              <span className="text-gray-300 text-sm">Posiciona tu rostro en el centro</span>
            </FacialRecognitionBox>
            <Text className="text-cyan-400 text-center">
               Buscando rostro...
            </Text>
            <Flex justify="center" className="mt-4">
              <TextButton onClick={toggleLoginMethod}>
                ¿Problemas? Iniciar Sesión con Contraseña
              </TextButton>
            </Flex>
          </>
        )}
      </Card>
    </Container>
  );
}