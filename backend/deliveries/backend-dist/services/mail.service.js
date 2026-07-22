"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const db_service_1 = require("./db.service");
const notification_service_1 = require("./notification.service");
exports.mailService = {
    getInbox(userId) {
        return db_service_1.db.get().emails.filter(m => m.receiverId === userId || m.senderId === userId);
    },
    sendMail(email) {
        const newMail = {
            ...email,
            id: `mail-${Date.now()}`,
            timestamp: new Date().toISOString(),
            read: false,
            folder: 'sent'
        };
        db_service_1.db.update((data) => {
            data.emails.unshift(newMail);
        });
        // Trigger Notification for recipient
        notification_service_1.notificationService.notify(newMail.receiverId, {
            type: 'email',
            priority: 'high',
            title: `New Email: ${newMail.subject}`,
            content: `From: ${newMail.senderName}`,
            link: '/mail'
        });
        return newMail;
    },
    deleteMail(id) {
        db_service_1.db.update((data) => {
            const mail = data.emails.find(m => m.id === id);
            if (mail)
                mail.folder = 'trash';
        });
    }
};
