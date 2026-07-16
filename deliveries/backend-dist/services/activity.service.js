"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityService = void 0;
const db_service_1 = require("./db.service");
const server_1 = require("../server");
exports.activityService = {
    log(activity, metadata) {
        const item = {
            ...activity,
            id: `act-${Date.now()}`,
            timestamp: new Date().toISOString()
        };
        if (metadata) {
            item.detail = `${item.detail} | Device: ${metadata.device || 'Unknown'} | IP: ${metadata.ip || '127.0.0.1'} | Location: ${metadata.location || 'Local Node'}`;
        }
        db_service_1.db.update((data) => {
            data.activities.unshift(item);
            if (data.activities.length > 200) {
                data.activities.pop();
            }
        });
        server_1.io.emit('new_activity', item);
        return item;
    }
};
