import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  log: string[];
  constructor() {
    this.log = [];
  }

  addLog(msg: string): void {
    const content = `${new Date()}: ${msg}`;
    this.log.push(content);
    console.log(content);
  }
}
