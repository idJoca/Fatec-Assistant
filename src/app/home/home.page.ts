import { Component } from '@angular/core';
import { AssistantsEnum, OpenAssistantService } from '../open-assistant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private openAssistantService: OpenAssistantService) {}

  public openMonographAssistant(): void {
    this.openAssistantService.openAssistant(AssistantsEnum.MONOGRAPH);
  }

  public openTechnicalStandardsAssistant(): void {
    this.openAssistantService.openAssistant(AssistantsEnum.TECHNICAL_STANDARDS);
  }
}
