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
  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'password' ? 'facial' : 'password');
  };

  return (
    <Container className="py-10 h-screen">
      <Card>
        <Flex className="justify-between">
          <Avatar />
          <div className="text-right">
            <div className="text-white text-base font-semibold">NOMBRE DE LA EMPRESA</div>
          </div>
        </Flex>
        
        {loginMethod === 'password' ? (
          <>
            <Heading>Bienvenido</Heading>
            <Text>Ingrese sus credenciales para acceder al sistema</Text>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormGroup className="mb-4">
                <Label htmlFor="email">
                  ID de Empleado / Email
                </Label>
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
                <Label htmlFor="password" >
                  Contraseña
                </Label>
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
              <Flex justify="end" className="mb-4">
                <LinkText href="/forgot-password" >
                  ¿Olvidó su contraseña?
                </LinkText>
              </Flex>
              
              <Button type="submit">Ingresar al Sistema</Button>
              
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <div className="px-4 text-xs text-slate-400">O</div>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <button 
                type="button"
                onClick={toggleLoginMethod}
                className="w-full flex items-center justify-center p-3 text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm"
              >
                <span className="inline-block w-3 h-3 bg-slate-300 rounded-full mr-2"></span>
                Acceder con Reconocimiento Facial
              </button>
            </form>
          </>
        ) : (
          <>
            <Heading className="text-center">Reconocimiento Facial</Heading>
            <FacialRecognitionBox 
              statusText="[Simulación de escaneo activo...]"
              className=" rounded-lg p-4 mb-2"
            >
              <span className="text-slate-300 text-sm">Posiciona tu rostro en el centro</span>
            </FacialRecognitionBox>
            
            <Text className="text-cyan-400 text-center mb-6">
               Buscando rostro...
            </Text>
            
            <button 
              type="button"
              onClick={toggleLoginMethod}
              className="w-full flex items-center justify-center p-3 text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm"
            >
              <span className="inline-block w-3 h-3 bg-slate-300 rounded-full mr-2"></span>
              ¿Problemas? Iniciar Sesión con Contraseña
            </button>
          </>
        )}
      </Card>
    </Container>
  );
}