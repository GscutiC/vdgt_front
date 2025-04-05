'use client';
import { useState } from 'react';
import {Button, Input, Label,LinkText,TextButton,Card,Avatar,Container} from '@/components/ui';

export default function LoginForm() {
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

  return (
    <Container>
        <Card>
        <div className="flex justify-center mb-6">
          <Avatar/>
        </div>     
        <h1 className="text-2xl font-bold text-center mb-8">
          Iniciar Sesión con Contraseña
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="email">ID de Empleado / Email</Label>
            <Input  type="text"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Tu ID o correo electrónico" required/>
          </div>
          <div className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
               <Input  type="password"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="••••••••" required/>
          </div>
          <div className="text-right mb-6">
              <LinkText href="/forgot-password">
                  Olvidé mi Contraseña
              </LinkText>
          </div>
          <Button type="submit">Ingresar</Button>
        </form>
        <div className="mt-6 text-center">
          <TextButton>Intentar con Reconocimiento Facial de Nuevo</TextButton>
        </div>
      </Card>
    </Container>      
  );
}