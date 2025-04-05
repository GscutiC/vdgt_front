'use client';
import { useState } from 'react';
import {Button, Input, Label,Card,Text,Avatar,Container,FormGroup,Flex,TextButton,Heading} from '@/components/ui';

export default function RegisterForm() {
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
  };

  return (
    <Container>
      <Card>
        <Flex justify="center" className="mb-6">
           <Avatar/>
        </Flex>
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
              required/>
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
              required/>
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
              required/>
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
              required/>
          </FormGroup>
          <Button type="submit">
            Siguiente: Registrar Rostro</Button>
        </form>
        <Flex justify="center" className="mt-6">
            <TextButton>
              Intentar con Reconocimiento Facial de Nuevo
            </TextButton>
        </Flex>
      </Card>
    </Container>
    
  );
}