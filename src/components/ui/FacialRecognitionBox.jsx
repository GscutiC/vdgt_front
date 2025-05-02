"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

export function FacialRecognitionBox({ 
  showProgressBar = false, 
  onCapture,
  children 
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState('Esperando detección de rostro...');
  const [faceDetected, setFaceDetected] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const stableDetectionCountRef = useRef(0);
  const captureTimeoutRef = useRef(null);

  // Cargar los modelos de detección facial
  useEffect(() => {
    const loadModels = async () => {
      try {
        // Ruta a los modelos (asegúrate de tener estos archivos en tu carpeta public)
        const MODEL_URL = '/models';
        
        // Cargar los modelos necesarios
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        
        setModelsLoaded(true);
        console.log('Modelos de detección facial cargados');
      } catch (error) {
        console.error('Error cargando modelos:', error);
        setDetectionStatus('Error al cargar sistema de detección');
      }
    };

    loadModels();
  }, []);

  // Iniciar la cámara cuando se cargan los modelos
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      if (!modelsLoaded) return;
      
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user" 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraActive(true);
            startFaceDetection();
          };
        }
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        setDetectionStatus('No se puede acceder a la cámara');
      }
    };

    if (modelsLoaded) {
      startCamera();
    }

    // Limpiar cuando el componente se desmonta
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (captureTimeoutRef.current) {
        clearTimeout(captureTimeoutRef.current);
      }
    };
  }, [modelsLoaded]);

  // Función para iniciar la detección facial
  const startFaceDetection = async () => {
    if (!videoRef.current || !modelsLoaded || !cameraActive) return;

    const video = videoRef.current;
    
    const detectFace = async () => {
      if (!video || !cameraActive) return;
      
      try {
        const detections = await faceapi.detectAllFaces(
          video, 
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks();

        if (detections.length === 0) {
          setFaceDetected(false);
          setDetectionStatus('No se detecta ningún rostro');
          setProgressValue(0);
          stableDetectionCountRef.current = 0;
          
          // Continuar detección
          requestAnimationFrame(detectFace);
          return;
        }
        
        if (detections.length > 1) {
          setFaceDetected(false);
          setDetectionStatus('Múltiples rostros detectados. Solo debe haber una persona');
          setProgressValue(0);
          stableDetectionCountRef.current = 0;
          
          // Continuar detección
          requestAnimationFrame(detectFace);
          return;
        }

        // Un solo rostro detectado
        const detection = detections[0];
        
        // Verificar si el rostro está centrado y tiene buen tamaño
        const { _box: box } = detection.detection;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        
        const faceArea = (box.width * box.height) / (videoWidth * videoHeight);
        const isCentered = 
          box.x > videoWidth * 0.2 && 
          box.x + box.width < videoWidth * 0.8 &&
          box.y > videoHeight * 0.2 && 
          box.y + box.height < videoHeight * 0.8;
        
        const isGoodSize = faceArea > 0.1; // El rostro ocupa al menos 10% del cuadro
        
        if (!isCentered) {
          setFaceDetected(true);
          setDetectionStatus('Centra tu rostro en el marco');
          setProgressValue(30);
          stableDetectionCountRef.current = 0;
          
          // Continuar detección
          requestAnimationFrame(detectFace);
          return;
        }
        
        if (!isGoodSize) {
          setFaceDetected(true);
          setDetectionStatus('Acércate un poco más a la cámara');
          setProgressValue(30);
          stableDetectionCountRef.current = 0;
          
          // Continuar detección
          requestAnimationFrame(detectFace);
          return;
        }
        
        // Rostro bien posicionado
        setFaceDetected(true);
        stableDetectionCountRef.current += 1;
        
        // Actualizar progreso basado en la estabilidad del rostro
        const stableFramesNeeded = 15; // Necesitamos 15 frames estables para capturar
        const progress = Math.min(95, 30 + (65 * stableDetectionCountRef.current / stableFramesNeeded));
        setProgressValue(progress);
        
        if (stableDetectionCountRef.current <= stableFramesNeeded / 3) {
          setDetectionStatus('Rostro detectado. Mantente quieto...');
        } else if (stableDetectionCountRef.current <= 2 * stableFramesNeeded / 3) {
          setDetectionStatus('¡Perfecto! No te muevas...');
        } else {
          setDetectionStatus('Capturando en breve...');
        }
        
        // Si el rostro es estable por suficientes frames, capturamos
        if (stableDetectionCountRef.current >= stableFramesNeeded) {
          // Esperamos un momento antes de capturar
          captureTimeoutRef.current = setTimeout(() => {
            captureImage();
          }, 500);
          return;
        }
        
        // Continuar detección
        requestAnimationFrame(detectFace);
      } catch (error) {
        console.error('Error en detección facial:', error);
        setDetectionStatus('Error en la detección facial');
        
        // Reintentar
        setTimeout(() => {
          requestAnimationFrame(detectFace);
        }, 1000);
      }
    };
    
    detectFace();
  };

  // Función para capturar la imagen
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Establecer dimensiones
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Dibujar fotograma del video en el canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convertir a base64
      const imageData = canvas.toDataURL('image/jpeg');
      
      // Llamar al callback con la imagen
      if (onCapture) {
        onCapture(imageData);
        setProgressValue(100);
        setDetectionStatus('¡Captura exitosa!');
        console.log('Imagen capturada correctamente');
      }
    } catch (err) {
      console.error('Error al capturar imagen:', err);
      setDetectionStatus('Error al capturar la imagen');
    }
  };

  return (
    <div className="relative w-full border-2 border-cyan-500/30 bg-black/20 rounded-lg overflow-hidden mb-6 h-64 flex items-center justify-center">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Canvas invisible para capturar imagen */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Marco para centrar la cara */}
      <div className={`relative z-10 w-40 h-40 border-2 border-dashed 
        ${faceDetected ? 'border-green-400/70' : 'border-cyan-400/50'} 
        rounded-full flex items-center justify-center transition-colors`}>
        {children}
      </div>
      
      {/* Botón manual de captura (opcional, puedes quitarlo) */}
      <button 
        onClick={captureImage}
        className="absolute bottom-4 right-4 bg-cyan-500 text-white rounded-full p-3 shadow-lg hover:bg-cyan-600 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </button>
      
      {/* Barra de progreso */}
      {showProgressBar && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-700">
          <div 
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}
      
      {/* Texto de estado */}
      <div className="absolute bottom-3 left-0 w-full text-center text-sm text-white/80">
        {detectionStatus}
      </div>
    </div>
  );
}