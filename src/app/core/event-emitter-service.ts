import { EventEmitter, Injectable } from '@angular/core';
export namespace EventEmitterName {
    export class EventEmitterService {
        static changeTitle: EventEmitter<object> = new EventEmitter();
        static changeStartLoading: EventEmitter<object> = new EventEmitter();
        static changeFinishLoading: EventEmitter<object> = new EventEmitter();
    
    }
}