"use client";
import { useState, useEffect } from "react";
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
  StepsIndicator,
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui";
import { useRegister } from "@/hooks/auth/use-register";

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { registerUser, isLoading, error, success } = useRegister();
  const [facialData, setFacialData] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ show: false, type: "", message: "", title: "" });

  const [validationErrors, setValidationErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    facial: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [faceDetected, setFaceDetected] = useState(false);
  const [lightingCondition, setLightingCondition] = useState("unknown");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getContainerClassName = () => {
    switch (currentStep) {
      case 1:
        return "p-1 min-h-screen"; 
      case 2:
        return "p-9 h-screen"; 
      case 3:
        return "p-2 h-screen";
      case 4:
        return "p-5 h-screen";
      default:
        return "p-2 h-auto";
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Formato de correo electrónico inválido";
    }
    
    const allowedDomains = ["gmail.com"]; 
    const domain = email.split('@')[1];
    if (allowedDomains.length > 0 && !allowedDomains.includes(domain)) {
      return "Por favor utiliza un correo electrónico corporativo autorizado";
    }
    
    return "";
  };
  const checkPasswordStrength = (password) => {
    if (!password) return "weak";
    
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = 
      hasMinLength + hasUpperCase + hasLowerCase + hasNumbers + hasSpecialChars;
    
    if (strength <= 2) return "weak";
    if (strength <= 4) return "medium";
    return "strong";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (name === "email") {
      setValidationErrors(prev => ({
        ...prev,
        email: validateEmail(value)
      }));
    } else if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
      
      // Password requirements
      let passwordError = "";
      if (value.length > 0 && value.length < 8) {
        passwordError = "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.";
      } else if (!/[A-Z]/.test(value) && value.length > 0) {
        passwordError = "Debe incluir al menos una letra mayúscula";
      } else if (!/[0-9]/.test(value) && value.length > 0) {
        passwordError = "Debe incluir al menos un número";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value) && value.length > 0) {
        passwordError = "Debe incluir al menos un carácter especial";
      }
      
      setValidationErrors(prev => ({
        ...prev,
        password: passwordError
      }));
    } else if (name === "confirmPassword") {
      setValidationErrors(prev => ({
        ...prev,
        confirmPassword: 
          value !== formData.password 
            ? "Las contraseñas no coinciden" 
            : ""
      }));
    } else if (name === "fullName") {
      setValidationErrors(prev => ({
        ...prev,
        fullName: 
          value.trim().split(" ").length < 2 
            ? "Ingresa nombre y apellido" 
            : ""
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(formData.email);
    const passwordError = formData.password.length < 8 
      ? "La contraseña debe tener al menos 8 caracteres" 
      : "";
    const confirmError = formData.password !== formData.confirmPassword 
      ? "Las contraseñas no coinciden" 
      : "";
    const nameError = formData.fullName.trim().split(" ").length < 2 
      ? "Ingresa nombre y apellido" 
      : "";
    
    setValidationErrors({
      fullName: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
      facial: "",
    });
    
    if (emailError || passwordError || confirmError || nameError) {
      // Show error alert
      setShowSuccessAlert(false);
      return;
    }
    
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      console.log("Datos de registro:", formData);
      setCurrentStep(2);
    }, 1500);
  };
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "strong": return "text-green-500";
      default: return "text-gray-500";
    }
  };
  const renderPasswordStrength = () => {
    if (!formData.password) return null;
    
    return (
      <div className="mt-1">
        <div className="flex items-center mb-1">
          <div className="text-sm text-white mr-2">Seguridad:</div>
          <div className={`text-sm font-medium ${getPasswordStrengthColor()}`}>
            {passwordStrength === "weak" && "Débil"}
            {passwordStrength === "medium" && "Media"}
            {passwordStrength === "strong" && "Fuerte"}
          </div>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              passwordStrength === "weak" 
                ? "w-1/3 bg-red-500" 
                : passwordStrength === "medium" 
                  ? "w-2/3 bg-yellow-500" 
                  : "w-full bg-green-500"
            }`}
          />
        </div>
      </div>
    );
  };
  const validatePasswordMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      setAlertInfo({
        show: true,
        type: "error",
        title: "Error de Validación",
        message: "Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo."
      });
      return false;
    }
    return true;
  };
  const validatePassword = () => {
    // Basic password validation - at least 8 characters, one uppercase, one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setAlertInfo({
        show: true,
        type: "error",
        title: "Contraseña Insegura",
        message: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número."
      });
      return false;
    }
    return true;
  };
  const handleStartFacialSetup = () => {
    console.log("Activando cámara para reconocimiento facial");
    setAlertInfo({
      show: false,
      type: "info",
      title: "Preparando Cámara",
      message: "Preparando el reconocimiento facial. Por favor concede los permisos necesarios."
    });
    setTimeout(() => {
      setCurrentStep(3);
    }, 2000);
  };
  const handleCompleteRegistration = async (capturedFaceData = null) => {
    try {
      setAlertInfo({
        show: true,
        type: "info",
        title: "Procesando Registro",
        message: capturedFaceData ? "Procesando tu registro con reconocimiento facial..." : "Procesando tu registro básico..."
      });
      
      // Si hay datos faciales capturados, enviar al endpoint con reconocimiento facial
      if (capturedFaceData && capturedFaceData !== "face_data_placeholder") {
        console.log("Registrando con reconocimiento facial");
        const result = await registerUser(formData, capturedFaceData, true);
        console.log("Registro con facial completado:", result);
      } else {
        // Si no hay datos faciales o se eligió explícitamente no usar facial
        console.log("Registrando sin reconocimiento facial");
        const result = await registerUser(formData, null, false);
        console.log("Registro básico completado:", result);
      }
  
      // En cualquier caso, avanzar al paso 4 si todo fue exitoso
      setAlertInfo({
        show: true,
        type: "success",
        title: "¡Registro Exitoso!",
        message: "Tu cuenta ha sido creada correctamente."
      });
      
      setTimeout(() => {
        setCurrentStep(4);
      }, 1500);
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      setAlertInfo({
        show: true,
        type: "error",
        title: "Error de Registro",
        message: "Ocurrió un error durante el registro. Por favor intenta nuevamente."
      });
      // El error ya debería estar establecido por el hook useRegister
    }
  };
  const handleFacialDetectionComplete = async () => {
    try {
      setAlertInfo({
        show: true,
        type: "info",
        title: "Accediendo a Cámara",
        message: "Solicitando acceso a tu cámara para capturar tu rostro..."
      });
      
      // 1. Acceder a la cámara del usuario
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user", // Cámara frontal
        },
      });

      setAlertInfo({
        show: true,
        type: "success",
        title: "Cámara Activada",
        message: "Capturando imagen de tu rostro..."
      });

      // 2. Crear un elemento video para mostrar la cámara (temporal)
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      // 3. Crear un canvas para capturar la imagen
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 4. Dibujar el fotograma actual en el canvas
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 5. Convertir la imagen a base64
      const capturedImage = canvas.toDataURL("image/jpeg");

      // 6. Detener la cámara
      stream.getTracks().forEach((track) => track.stop());

      // 7. Guardar los datos de la imagen
      setFacialData(capturedImage);
      console.log("Imagen facial capturada correctamente");
      
      setAlertInfo({
        show: true,
        type: "success",
        title: "Captura Exitosa",
        message: "Tu rostro ha sido capturado correctamente. Procediendo con el registro..."
      });

      // 8. Continuar con el registro utilizando el endpoint facial
      setTimeout(() => {
        handleCompleteRegistration(capturedImage);
      }, 1500);
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      setAlertInfo({
        show: true,
        type: "error",
        title: "Error de Cámara",
        message: "No se pudo acceder a la cámara. Por favor, verifica los permisos del navegador."
      });
    }
  };
  const renderError = () => {
    if (error) {
      return <Text className="mt-2 text-red-500 text-center">{error}</Text>;
    }
    return null;
  };

  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ show: false, type: "", message: "", title: "" });
      }, 5000); // Dismiss after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [alertInfo.show]);
  
  const renderAlert = () => {
    if (!alertInfo.show) return null;
    
    const alertClassMap = {
      error: "bg-red-900/50 border-red-500",
      success: "bg-green-900/50 border-green-500",
      info: "bg-blue-900/50 border-blue-500",
      warning: "bg-yellow-900/50 border-yellow-500"
    };
    
    return (
      <Alert className={`mb-4 ${alertClassMap[alertInfo.type]}`}>
        <AlertTitle>{alertInfo.title}</AlertTitle>
        <AlertDescription>{alertInfo.message}</AlertDescription>
      </Alert>
    );
  };
  
  return (
    <Container className={getContainerClassName()}>
      <Card> 
        <Flex justify="center" className="mb-4">
          <Avatar />
        </Flex>
        
        {/* Alert component that works across all steps */}
        {renderAlert()}
        
        {currentStep === 1 && (
          <>
            <Heading>Registro de Nuevo Usuario</Heading>
            <Text>Completa tus datos para crear tu cuenta.</Text>
            <form onSubmit={handleSubmit}>
             <FormGroup className="mb-1">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nombre Apellido"
                  required
                  className={validationErrors.fullName ? "border-red-500" : ""}
                />
                {validationErrors.fullName && (
                  <Text className="text-red-500 text-xs mt-1">
                    {validationErrors.fullName}
                  </Text>
                )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Correo Electrónico Corporativo</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu.correo@gmail.com"
                  required
                  className={validationErrors.email ? "border-red-500" : ""}
                />
                {validationErrors.email && (
                  <Text className="text-red-500 text-xs mt-1">
                    {validationErrors.email}
                  </Text>
                )}
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
                  className={validationErrors.password ? "border-red-500" : ""}
                />
                {renderPasswordStrength()}
                {validationErrors.password && (
                  <Text className="text-red-500 text-xs mt-0">
                    {validationErrors.password}
                  </Text>
                )}
              </FormGroup>
              <FormGroup className="mb-4"> 
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className={validationErrors.confirmPassword ? "border-red-500" : ""}
                />
                {validationErrors.confirmPassword && (
                  <Text className="text-red-500 text-xs mt-1">
                    {validationErrors.confirmPassword}
                  </Text>
                )}
              </FormGroup>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <button 
                  type="submit"
                  className="hover:-translate-y-0.5 w-full py-1.5 px-3 bg-white text-black text-sm font-normal rounded-md transition-all"
                >
                  Siguiente: Registrar Rostro
                </button>
                
                <button
                  type="button"
                  onClick={() => (window.location.href = "/auth/sign-in")}
                  className="hover:-translate-y-0.5 w-full py-1.5 px-3 bg-transparent text-sm text-white/80 font-normal rounded-md border border-cyan-700/30 transition-all"
                >
                  ¿Ya tienes cuenta? Iniciar Sesión
                </button>
              </div>
              <StepsIndicator
              currentStep={currentStep}
              steps={3}
            />
            </form>
            
          </>
        )}
        {currentStep === 2 && (
          <>
            <Heading>Configuración de Reconocimiento Facial</Heading>
            <Text className="text-lg mb-3 p-1 text-white/80">
              Sigue estas instrucciones para un registro exitoso:
            </Text>
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
                <span>
                  Asegúrate que tu rostro esté despejado (sin gorras,
                  mascarillas, etc.).
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Mantén una expresión facial neutra.</span>
              </li>
            </ul>
            <Button
              className="w-full bg-cyan-400 hover:bg-cyan-500"
              onClick={handleStartFacialSetup}
            >
              Activar Cámara y Comenzar
            </Button>
            <StepsIndicator
              currentStep={currentStep}
              steps={3}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            <Heading>Configuración de Reconocimiento Facial</Heading>
            <FacialRecognitionBox
              showProgressBar={true}
              onCapture={(imageData) => {
                setFacialData(imageData);
                console.log("Imagen capturada automáticamente");
                setAlertInfo({
                  show: true,
                  type: "success",
                  title: "Rostro Detectado",
                  message: "Tu rostro ha sido detectado correctamente. Ya puedes registrarte."
                });
              }}
            >
              <span className="text-gray-300 text-sm">
                Centra tu rostro en el marco
              </span>
            </FacialRecognitionBox>
            {renderError()}
            <div className="grid grid-cols-2 gap-4">
              {/* Primer botón: Registrar con reconocimiento facial */}
              <Button
                onClick={() => {
                  if (facialData) {
                    handleCompleteRegistration(facialData);
                  } else {
                    // Si no hay datos faciales capturados automáticamente, intentar captura manual
                    handleFacialDetectionComplete();
                  }
                }}
                disabled={isLoading}
                variant="default"
              >
                {isLoading ? "Procesando..." : "Capturar y Registrar Rostro"}
              </Button>
              {/* Segundo botón: Registrar sin reconocimiento facial */}
              <Button
                onClick={() => {
                  // Mostrar alerta de confirmación
                  setAlertInfo({
                    show: true,
                    type: "warning",
                    title: "Confirmar Registro Básico",
                    message: "Estás a punto de registrarte sin reconocimiento facial. Esto limitará las opciones de inicio de sesión seguro."
                  });
                  
                  // Esperar confirmación implícita (la alerta se cerrará automáticamente)
                  setTimeout(() => {
                    // Llamar al endpoint normal sin datos faciales
                    handleCompleteRegistration(null);
                  }, 3000);
                }}
                disabled={isLoading}
               variant="outline"
              >
                Registrar sin Rostro
              </Button>
            </div>
            <StepsIndicator
              currentStep={currentStep}
              steps={3}/>
          </>
        )}
        {currentStep === 4 && (
          <>
            <Flex justify="center" className="mb-2 text-cyan-500 text-6xl">
              OK
            </Flex>
            <Heading className="text-center text-green-400 mb-5">
              ¡Registro Completado!
            </Heading>
            
            <Button onClick={() => (window.location.href = "/auth/sign-in")}>
              Ir a Iniciar Sesión
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
}