import React from 'react';

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
  React.useEffect(() => {
    const data: FaceCaptureData = {
      type,
      image: '',
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString().split('T')[0],
      address: 'Location unavailable',
      coords: null,
    };
    onCapture(data);
    onClose();
  }, [type, onCapture, onClose]);
  return null;
}
