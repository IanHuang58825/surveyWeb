import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  //adminTabs切頁
  private _activeLinkadmin$ = new BehaviorSubject<string>('build');
  activeLinkadmin$ = this._activeLinkadmin$.asObservable();
  setActiveLinkadmin(name: string) {
    this._activeLinkadmin$.next(name);
  }
  //frontTabs切頁
  private _activeLinkfront$ = new BehaviorSubject<string>('fillin');
  activeLinkfront$ = this._activeLinkfront$.asObservable();
  setActiveLinkfront(name: string) {
    this._activeLinkfront$.next(name);
  }
   //updateTabs切頁
   private _activeLinkUpdate$ = new BehaviorSubject<string>('updateBuild');
   activeLinkUpdate$ = this._activeLinkUpdate$.asObservable();
   setActiveLinkUpdate(name: string) {
     this._activeLinkadmin$.next(name);
   }
  constructor() { }


}
