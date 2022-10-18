import {StorageService} from '../core/StorageService'
import {ToastService} from '../core/ToastService'
export class BaseController
{
   selectKey:any="";
   fromState:string;
   selectItem:any={};
   toastService=ToastService;
   storageService=StorageService;
   
}