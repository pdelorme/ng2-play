import {Component, bootstrap, Injectable} from 'angular2/angular2';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
@Component({
    selector: 'hello-app',
    template: `
        <h1>Hello, {{name}}!</h1>
        Say {{ 'HELLO_KEY' | translate }} to: <input [value]="name" (input)="name = $event.target.value">
    `,
    pipes: [TranslatePipe]
})
export class HelloApp {
    name: string = 'World';

    constructor(translate: TranslateService) {
        // not required as "en" is the default
        translate.setDefault('en');

        // we set the translations for english manually (instead of using a json file & the static loader)
        translate.setTranslation('en', {
            'HELLO_KEY': 'hello'
        });

        // this trigger the use of the english language after setting the translations
        translate.use('en');
    }
}

// Instantiate TranslateService in the bootstrap so that we can keep it as a singleton
bootstrap(HelloApp, [HTTP_PROVIDERS, TranslateService]);