import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { environment } from '../environments/environment';
import { AssistantsEnum, OpenAssistantService } from './open-assistant.service';
import sha1 from '../helpers/sha1';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private instances: any[] = [];
  private renderedInstance: AssistantsEnum[] = [];

  constructor(private splashScreen: SplashScreen,
              private openAssistantService: OpenAssistantService) {
    this.splashScreen.show();
  }

  private static startConversation(instance, message: string): void {
    sessionStorage.clear();
    const {sessionID} = instance.getState();
    const payload = {
      id: sessionID,
      input: {
        text: message,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        message_type: 'text',
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      thread_id: 'main',
    };
    instance.send(payload);
  }

  ngOnInit(): void {
    this.openAssistantService.openAssistant$.subscribe(
      assistant => {
        const instance = this.instances[assistant];

        if (!this.renderedInstance.includes(assistant)) {
          instance.render();
          this.renderedInstance.push(assistant);
        }

        instance.openWindow();
      }
    );

    this.initAssistantInstances(environment.assistants);
  }

  private initAssistantInstances(assistants: typeof environment['assistants']): void {
    if (!assistants.length) {
      this.splashScreen.hide();
      return;
    }

    const {integrationID, region, serviceInstanceID, startMessage} = assistants[0];

    window.watsonAssistantChatOptions = {
      integrationID,
      region,
      serviceInstanceID,
      onLoad: instance => {
        const sessionIdHash = localStorage.getItem(assistants.length.toString());
        const currentSessionIdHash = sha1(instance.getState().sessionID);

        if (sessionIdHash !== currentSessionIdHash) {
          localStorage.setItem(assistants.length.toString(), currentSessionIdHash);
          sessionStorage.clear();
        }

        this.instances.push(instance);
        AppComponent.startConversation(
          instance,
          startMessage
        );
        this.initAssistantInstances(assistants.slice(1));
      },
      openChatByDefault: false,
      showLauncher: false,
    };

    const t = document.createElement('script');
    t.src =
      'https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js';
    document.head.appendChild(t);
  }
}
