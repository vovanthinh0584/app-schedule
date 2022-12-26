import { EventEmitter, Injectable } from '@angular/core';
export namespace EventEmitterName {
    export class EventEmitterService {
        static changeTitle: EventEmitter<object> = new EventEmitter();
    
    }
}