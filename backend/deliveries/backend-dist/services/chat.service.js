"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const db_service_1 = require("./db.service");
const server_1 = require("../server");
const notification_service_1 = require("./notification.service");
exports.chatService = {
    getMessages(userId, otherId, groupId) {
        return db_service_1.db.get().messages.filter(m => {
            if (groupId)
                return m.groupId === groupId;
            if (otherId) {
                return (m.senderId === userId && m.receiverId === otherId) ||
                    (m.senderId === otherId && m.receiverId === userId);
            }
            return false;
        });
    },
    sendMessage(message) {
        const newMessage = {
            ...message,
            id: `msg-${Date.now()}`,
            timestamp: new Date().toISOString(),
            read: false
        };
        db_service_1.db.update((data) => {
            data.messages.push(newMessage);
        });
        // Emit to specific receiver or group
        if (newMessage.groupId) {
            server_1.io.to(newMessage.groupId).emit('new_message', newMessage);
        }
        else if (newMessage.receiverId) {
            server_1.io.emit(`new_message_${newMessage.receiverId}`, newMessage);
            server_1.io.emit(`new_message_${newMessage.senderId}`, newMessage);
            // Trigger Notification
            notification_service_1.notificationService.notify(newMessage.receiverId, {
                type: 'message',
                priority: 'medium',
                title: `New message from ${newMessage.senderName || 'User'}`,
                content: newMessage.content.substring(0, 50),
                link: '/chat'
            });
        }
        return newMessage;
    }
};
