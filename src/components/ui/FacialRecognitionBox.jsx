'use client';
import React, { useRef, useEffect, useState } from 'react';

export function FacialRecognitionBox({ 
  showProgressBar = false, 
  progressValue = 0, 
  statusText = '', 
  children,
  onCapture // Nueva prop para cuando se captura una imagen
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);

  // Iniciar la cámara cuando el componente se monta
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
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
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        setCameraPermissionDenied(true);
      }
    };

    startCamera();

    // Limpiar cuando el componente se desmonta
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Función para capturar la imagen
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return null;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Ajustar tamaño del canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Dibujar en el canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Obtener la imagen como base64
    const imageData = canvas.toDataURL('image/jpeg');
    
    // Llamar al callback si existe
    if (onCapture) {
      onCapture(imageData);
    }
    
    return imageData;
  };

  return (
    <div className="relative w-full border-2 border-cyan-500/30 bg-black/20 rounded-lg overflow-hidden mb-6 h-64 flex items-center justify-center">
      {cameraPermissionDenied ? (
        <div className="text-red-400 text-center p-4">
          <p className="mb-2">No se pudo acceder a la cámara.</p>
          <p>Por favor verifica los permisos del navegador.</p>
        </div>
      ) : (
        <>
          {/* Video para mostrar la cámara */}
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
          <div className="relative z-10 w-40 h-40 border-2 border-dashed border-cyan-400/50 rounded-full flex items-center justify-center">
            {children}
          </div>
          
          {/* Botón de captura */}
          <button 
            onClick={captureImage}
            className="absolute bottom-4 right-4 bg-cyan-500 text-white rounded-full p-3 shadow-lg hover:bg-cyan-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </button>
        </>
      )}
      
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
      {statusText && (
        <div className="absolute bottom-3 left-0 w-full text-center text-sm text-white/80">
          {statusText}
        </div>
      )}
    </div>
  );
}