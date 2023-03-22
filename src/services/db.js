// db.js
import Dexie from 'dexie';

export const db = new Dexie('user_');
db.version(1).stores({
    list: '++id, name, user_id, created, changed, icon, priority, pinned',
    item: '++id, name, cart_id, numneeded, created, complete, completed, completed_by, created_by, priority',
    folder: '++id, name, cart_id, created, created_by, priority',
    user: '++id, name, status, icon'
});