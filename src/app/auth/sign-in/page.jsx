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
import { useLogin } from '@/hooks/auth/use-login';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState('password');
  const { login, isLoading, error, success } = useLogin();
  const [facialData, setFacialData] = useState(null);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión con:', credentials);
    
    try {
      // Si deseas omitir la autenticación real por ahora y solo redirigir
      // puedes comentar estas líneas y solo usar la redirección
      /*
      const result = await login(credentials);
      console.log('Login exitoso:', result);
      */
      
      // Redirigir al dashboard usando el router de Next.js
      router.push('/auth/dashboard');
    } catch (err) {
      // El error ya se maneja en el hook
      console.error('Error al iniciar sesión:', err);
    }
  };

  const handleFacialLogin = async (imageData) => {
    if (!imageData) return;
    
    setFacialData(imageData);
    console.log('Imagen facial capturada para login');
    
    try {
      // Puedes comentar esta lógica si solo quieres probar la redirección
      /*
      const result = await login({ email: '' }, imageData);
      console.log('Login facial exitoso:', result);
      */
      
      // Redirigir al dashboard o página principal
      router.push('/auth/dashboard');
    } catch (err) {
      // El error ya se maneja en el hook
      console.error('Error en login facial:', err);
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'password' ? 'facial' : 'password');
  };
  
  const renderErrorMessage = () => {
    if (!error) return null;
    
    return (
      <div className="p-2 my-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-sm">
        {error}
      </div>
    );
  };

  return (
    <Container className="py-9 h-screen">
      <Card>
        <Flex className="justify-between py-4">
          <Avatar />
          <div className="text-right">
            <div className="text-white text-base font-semibold">NOMBRE DE LA EMPRESA</div>
          </div>
        </Flex>
        
        {renderErrorMessage()}

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
              
              <Button 
                type="submit" 
                disabled={isLoading}
                // Quitar el onClick aquí, ya que el formulario maneja la sumisión
              >
                {isLoading ? 'Iniciando sesión...' : 'Ingresar al Sistema'}
              </Button>
              
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <div className="px-4 text-xs text-slate-400">O</div>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <button 
                type="button"
                onClick={toggleLoginMethod}
                className="w-full hover:-translate-y-0.5 flex items-center justify-center p-3 text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm"
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
              statusText={isLoading ? "Verificando identidad..." : "Posiciona tu rostro para iniciar sesión"}
              className="rounded-lg p-4 mb-2"
              showProgressBar={true}
              onCapture={handleFacialLogin}
            >
              <span className="text-slate-300 text-sm">
                {isLoading ? "Verificando..." : "Posiciona tu rostro en el centro"}
              </span>
            </FacialRecognitionBox>
            
            <Text className={`text-center mb-6 ${isLoading ? "text-yellow-400" : "text-cyan-400"}`}>
               {isLoading ? "Verificando identidad..." : "Buscando rostro..."}
            </Text>
            
            <button 
              type="button"
              onClick={toggleLoginMethod}
              disabled={isLoading}
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