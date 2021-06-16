/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum AssistantsEnum {
  MONOGRAPH,
  TECHNICAL_STANDARDS
}

@Injectable({
  providedIn: 'root'
})
export class OpenAssistantService {
  private onOpenAssistant = new Subject<AssistantsEnum>();

  get openAssistant$() {
    return this.onOpenAssistant.asObservable();
  }

  constructor() { }

  public openAssistant(assistant: AssistantsEnum): void {
    this.onOpenAssistant.next(assistant);
  }
}
