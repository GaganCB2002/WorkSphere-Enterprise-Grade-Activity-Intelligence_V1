"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allocationService = void 0;
const db_service_1 = require("./db.service");
const activity_service_1 = require("./activity.service");
const server_1 = require("../server");
exports.allocationService = {
    getAll() {
        return db_service_1.db.get().allocations;
    },
    create(allocation) {
        const newAllocation = {
            ...allocation,
            id: `all-${Date.now()}`
        };
        db_service_1.db.update((data) => {
            data.allocations.push(newAllocation);
        });
        activity_service_1.activityService.log({
            title: 'Resource Allocated',
            detail: `${allocation.employeeName} assigned to ${allocation.projectName} (${allocation.hoursPerWeek}h/week)`,
            category: 'Project',
            actor: 'System'
        });
        server_1.io.emit('allocation_updated', newAllocation);
        return newAllocation;
    },
    update(id, updates) {
        let updated = null;
        db_service_1.db.update((data) => {
            const index = data.allocations.findIndex(a => a.id === id);
            if (index !== -1) {
                data.allocations[index] = { ...data.allocations[index], ...updates };
                updated = data.allocations[index];
            }
        });
        if (updated) {
            server_1.io.emit('allocation_updated', updated);
        }
        return updated;
    },
    delete(id) {
        db_service_1.db.update((data) => {
            data.allocations = data.allocations.filter(a => a.id !== id);
        });
        server_1.io.emit('allocation_deleted', id);
    },
    // Asset Management
    getAssets() {
        return db_service_1.db.get().assets;
    },
    getAssetAllocations() {
        return db_service_1.db.get().assetAllocations;
    },
    addAsset(asset) {
        const newAsset = {
            ...asset,
            id: `as-${Date.now()}`
        };
        db_service_1.db.update((data) => {
            data.assets.push(newAsset);
        });
        return newAsset;
    },
    allocateAsset(input) {
        const allocation = {
            ...input,
            id: `al-${Date.now()}`,
            status: 'Active',
            allocatedAt: new Date().toISOString()
        };
        db_service_1.db.update((data) => {
            data.assetAllocations.push(allocation);
            const asset = data.assets.find(a => a.id === input.assetId);
            if (asset)
                asset.status = 'Allocated';
        });
        activity_service_1.activityService.log({
            title: 'Asset Allocated',
            detail: `${input.assetName} handed over to ${input.employeeName}`,
            category: 'System',
            actor: 'Admin'
        });
        server_1.io.emit('asset_allocation_updated', allocation);
        return allocation;
    },
    revokeAsset(id) {
        let affectedAssetId = null;
        db_service_1.db.update((data) => {
            const index = data.assetAllocations.findIndex(a => a.id === id);
            if (index !== -1) {
                data.assetAllocations[index].status = 'Revoked';
                data.assetAllocations[index].returnedAt = new Date().toISOString();
                affectedAssetId = data.assetAllocations[index].assetId;
                const asset = data.assets.find(a => a.id === affectedAssetId);
                if (asset)
                    asset.status = 'Available';
            }
        });
        if (affectedAssetId) {
            server_1.io.emit('asset_allocation_revoked', id);
        }
    }
};
