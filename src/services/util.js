import {GL_CONFIG} from "../config";

export function GLDbg(m){
    if(!GL_CONFIG.GL_DEBUG)return;
    console.log(m);
}
