"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const db_service_1 = require("./db.service");
const server_1 = require("../server");
exports.notificationService = {
    getNotifications(userId) {
        return db_service_1.db.get().notifications.filter(n => n.userId === userId);
    },
    async notify(userId, data) {
        const notification = {
            ...data,
            id: `ntf-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            userId,
            read: false,
            timestamp: new Date().toISOString()
        };
        db_service_1.db.update((data) => {
            data.notifications.unshift(notification);
            // Keep only last 100
            if (data.notifications.length > 1000)
                data.notifications.pop();
        });
        // 1. Real-time Socket Push
        server_1.io.emit(`notification_${userId}`, notification);
        // 2. Mock Email Push if High/Critical
        if (notification.priority === 'high' || notification.priority === 'critical') {
            console.log(`[EMAIL ALERT] To: ${userId} | Subject: ${notification.title}`);
        }
        return notification;
    },
    markAsRead(id) {
        db_service_1.db.update((data) => {
            const ntf = data.notifications.find(n => n.id === id);
            if (ntf)
                ntf.read = true;
        });
    },
    markAllRead(userId) {
        db_service_1.db.update((data) => {
            data.notifications.forEach(n => {
                if (n.userId === userId)
                    n.read = true;
            });
        });
    }
};
