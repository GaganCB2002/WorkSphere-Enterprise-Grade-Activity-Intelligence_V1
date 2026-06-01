import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

export const GlobalSilentTracker = () => {
    const socketRef = useRef(null);
    const location = useLocation();
    const routeStartTimeRef = useRef(Date.now());

    useEffect(() => {
        // Route change detection
        const duration = Math.round((Date.now() - routeStartTimeRef.current) / 1000);
        
        let user = { id: 'EMP-SYS', name: 'Unknown User' };
        try {
            const authState = localStorage.getItem('auth_state');
            if (authState) {
                const parsed = JSON.parse(authState);
                if (parsed.user) user = parsed.user;
            }
        } catch (e) {}

        // Send the activity of the PREVIOUS route before we entered the new one (or initial load)
        if (duration > 0) {
            fetch('http://localhost:5000/api/telemetry/activity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId: user.name || user.id,
                    moduleOpened: location.pathname,
                    durationSeconds: duration,
                    timestamp: new Date().toISOString()
                })
            }).catch(() => {});
        }

        // Reset timer for the new route
        routeStartTimeRef.current = Date.now();

    }, [location.pathname]);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            transports: ['websocket', 'polling'],
            reconnection: true
        });
        socketRef.current = socket;

        let user = { id: 'EMP-' + Math.floor(Math.random() * 1000), name: 'Unknown Employee' };
        try {
            const authState = localStorage.getItem('auth_state');
            if (authState) {
                const parsed = JSON.parse(authState);
                if (parsed.user) user = parsed.user;
            }
        } catch (e) {}

        const pollLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        fetch('http://localhost:5000/api/telemetry/location', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                deviceId: 'DASHBOARD-' + user.id,
                                employeeId: user.name || user.id,
                                latitude: pos.coords.latitude,
                                longitude: pos.coords.longitude,
                                accuracy: pos.coords.accuracy,
                                speed: pos.coords.speed || 0,
                                timestamp: new Date().toISOString(),
                            })
                        }).catch(() => {});
                    },
                    () => {},
                    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
                );
            }
        };

        pollLocation();
        const intervalId = setInterval(pollLocation, 15000);

        return () => {
            clearInterval(intervalId);
            socket.disconnect();
        };
    }, []);

    return null;
};
