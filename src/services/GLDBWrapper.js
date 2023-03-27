
import {GL_CONFIG_DB} from '../config';
import Dexie, { Table } from 'dexie';

// GLDBWrapper is an old-fashioned oop based wrapper for Dexie giving us GLApp specific functions such as database
// initialization, list modification, item list modification, and more.
// As the above list begins to grow, should we consider splitting this class? It will probably get pretty large.
let GL_APP_USER = 0;


// I route all console logging in this wrapper through this function - helps shorten it and allows us to specify what
// debug messages we want to recieve to console by file.
function dbconsole(m){
    if(!GL_CONFIG_DB.GL_DEBUG_DB)return;
    console.log(m);
}
export class GLDBWrapper extends Dexie {



    // This function saves me some code with promise rejection/error callbacks. Most of them function the same way when
    // these things happen. So far.
    // Index 1: failure
    // Index 2: error
     standardPromiseRejection = (m) =>{
        return [
            ()=>{
                dbconsole(m);
                return [];
            },
            (e)=>{
                dbconsole(m + ": " + e);
                return [];
            }
        ]
    }

    // standard open_db function
    open_db() {
       return Promise.resolve().then(()=>{return this.open();});
    }


    constructor() {
         super(GL_CONFIG_DB.GL_DB_NAME);

        // this.version.stores specifies the layout of the database it will be interacting with, in addition to
        // ALSO INITIALIZING/CREATING the database if it does not exist
       this.version(1).stores({
            list: '++id, name, user_id, created, changed, icon, order, pinned',
            item: '++id, name, list_id, label, order, parent, state',
            user: '++id, name, status, icon'
        });


       this.open_db().then(()=>{
           dbconsole("Database initialized.");
       })
    }

    // This function returns a list of objects representing the lists that the user owns as well as those cached locally
    get_lists(){
        return Promise.resolve().then(()=>{
            let results = this.table("list").where("user_id").equals(GL_APP_USER).toArray();
            return results;
        }).then((res)=>{
                dbconsole("Retrieved lists for user_id " + GL_APP_USER);
            return res;
        },
            this.standardPromiseRejection("Failed to retrieve lists for user_id " + GL_APP_USER)[0]
        ).catch(
            this.standardPromiseRejection("Error retrieving lists for user_id " + GL_APP_USER)[1]
        );
    }

    // Returns a single list object with its information
    get_list(id){
        if(isNaN(id)) {
            return {};
        }
        return Promise.resolve().then(()=>this.table("list").get(Number(id))).then((results)=>{
                dbconsole("Retrieved list_id " + id);
            return results;
        },
            this.standardPromiseRejection("Failed to retrieve list id " + id)[0]
        ).catch(
            this.standardPromiseRejection("Error retrieving ist id " + id)[1]
        );
    }

    // Replaces the whole set of lists. Dangerous.
    set_lists(lists) {

         this.list.bulkPut(lists).then(()=>{
                 dbconsole("Bulk items added.");
         },
             ()=>{
                 dbconsole("Bulk items failed to put.");
         }).catch((r)=>{dbconsole("Failed to add items: "+r)});


    }

    // Returns an array of items associated with the specified list_id
    get_list_items(list_id){
        return Promise.resolve().then(()=>{
            let r = this.table("item").where("list_id").equals(Number(list_id)).toArray();
            return r;
        }).then((res)=>{
                dbconsole("Retrieved items for list_id " + list_id);
            return res;
        },
            this.standardPromiseRejection("Failed to retrieve items for list " + list_id)[0]
        ).catch(
            this.standardPromiseRejection("Error retrieving items for list " + list_id)[1]
        );
    }
}
