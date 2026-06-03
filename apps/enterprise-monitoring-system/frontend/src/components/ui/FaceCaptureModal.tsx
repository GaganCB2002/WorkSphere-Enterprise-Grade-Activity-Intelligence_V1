import React, { useRef, useState, useEffect } from 'react';
import { Camera, LogOut, MapPin, RefreshCw, UserCheck } from 'lucide-react';

export interface FaceCaptureData {
  type: 'login' | 'logout';
  image: string;
  time: string;
  date: string;
  address: string;
  coords: { lat: number; lng: number } | null;
}

export interface FaceCaptureModalProps {
  type: 'login' | 'logout';
  onCapture: (data: FaceCaptureData) => void;
  onClose: () => void;
}

export function FaceCaptureModal({ type, onCapture, onClose }: FaceCaptureModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [address, setAddress] = useState('Fetching high-precision location...');
  const [coords, setCoords] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    // Start camera
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraReady(true);
        }
      })
      .catch(err => {
        console.error("Camera error:", err);
        alert("Camera access is required for identity verification.");
      });

    // Get Location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setCoords(pos.coords);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const data = await res.json();
          setAddress(data.display_name || `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        } catch (e) {
          setAddress(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (GPS Lock)`);
        }
      },
      () => setAddress('Location access denied. Using fallback node.')
    );

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || isProcessing || isCaptured) return;
    
    setIsProcessing(true);
    const context = canvasRef.current.getContext('2d');
    if (!context) {
      setIsProcessing(false);
      return;
    }

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const imageData = canvasRef.current.toDataURL('image/jpeg', 0.8);
    setIsCaptured(true);
    
    onCapture({
      type,
      image: imageData,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      address: address,
      coords: coords ? { lat: coords.latitude, lng: coords.longitude } : null
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[1000] p-8">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-8 text-center bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
          <div className={`inline-flex p-3 rounded-2xl mb-4 ${type === 'login' ? 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
            {type === 'login' ? <UserCheck size={32} /> : <LogOut size={32} />}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            {type === 'login' ? 'Identity Verification' : 'Shift Termination'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Biometric face capture required to {type === 'login' ? 'start' : 'end'} your session.
          </p>
        </div>

        <div className="p-8">
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-inner">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover -scale-x-100" />
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                <RefreshCw size={32} className="animate-spin" />
              </div>
            )}
            <div className="absolute inset-0 border-2 border-teal-500/30 rounded-2xl pointer-events-none"></div>
            <div className="absolute top-3 left-3 text-[0.65rem] font-bold text-teal-500 uppercase tracking-wider bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
              SECURE_LINK_ACTIVE // 256-BIT
            </div>
          </div>

          <div className="mt-6 p-4 bg-teal-50/50 dark:bg-teal-500/5 rounded-xl border border-teal-100 dark:border-teal-500/10">
             <div className="flex items-center gap-2 mb-1.5">
               <MapPin size={14} className="text-teal-600 dark:text-teal-400" />
               <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Verification Node</span>
             </div>
             <div className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{address}</div>
          </div>

          <div className="mt-8 flex gap-4">
            {type === 'logout' && (
              <button 
                onClick={onClose}
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-colors"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={() => {
                if (isCaptured) {
                  alert('Your photo is already captured. Processing verification...');
                  return;
                }
                handleCapture();
              }}
              disabled={!isCameraReady || isProcessing || isCaptured}
              className={`flex-[2] flex items-center justify-center gap-2 font-black py-4 rounded-xl transition-all shadow-lg ${
                isCaptured 
                  ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 shadow-none cursor-not-allowed' 
                  : type === 'login' 
                    ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-teal-500/20' 
                    : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
              } ${(!isCameraReady || isProcessing) && !isCaptured ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? <RefreshCw size={20} className="animate-spin" /> : <Camera size={20} />}
              {isCaptured ? 'PHOTO CAPTURED' : (type === 'login' ? 'VERIFY & LOGIN' : 'VERIFY & LOGOUT')}
            </button>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
