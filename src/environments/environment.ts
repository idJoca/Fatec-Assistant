// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  assistants: [
    {
      integrationID: '74be2c04-b7b9-4ad1-98a1-15f6e5173455',
      region: 'us-south',
      serviceInstanceID: '8f486940-cafc-4571-88f2-6ca198b06072',
      startMessage: 'Quero uma lista de monografias'
    },
    {
      integrationID: '6094d63f-7cd0-431e-989e-be0978fb8c7d',
      region: 'us-south',
      serviceInstanceID: '8f486940-cafc-4571-88f2-6ca198b06072',
      startMessage: 'Quero tirar dúvidas sobre Normas Técnicas'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
