
import {GL_CONFIG_DB} from '../config';
import Dexie, { Table } from 'dexie';


let GL_APP_USER = 0;
export class GLDBWrapper extends Dexie{

    open_db() {
       return Promise.resolve().then(()=>{return this.open();});
    }
    constructor() {
        super(GL_CONFIG_DB.GL_DB_NAME);
       this.version(1).stores({
            list: '++id, name, user_id, created, changed, icon, order, pinned',
            item: '++id, name, cart_id, label, order, parent, state',
            user: '++id, name, status, icon'
        });
       this.open_db().then(()=>{
           console.log("Database initialized.");
       })
    }
    get_lists(){
        return Promise.resolve().then(()=>{
            return this.table("list").toArray()
        }).then((res)=>{
            console.log("Retrieved lists for user_id " + GL_APP_USER);
            return res;
        }, ()=>{
            console.log("Failed to retrieve lists for user_id " + GL_APP_USER);
            return [];
        }).catch((e)=>{
            console.log("Error retrieving lists for user_id " + GL_APP_USER + ": "+e);
            return [];
        }
        );
    }
    get_list(id){

    }
    set_lists(lists) {
         this.list.bulkPut(lists).then(()=>{
             console.log("Bulk items added.");
         },
             ()=>{
             console.log("Bulk items failed to put.");
         }).catch((r)=>{console.log("Failed to add items: "+r)});
    }
}
export function InitDatabase(){

}
export function GetDatabase(){

}