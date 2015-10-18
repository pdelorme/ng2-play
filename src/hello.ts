import {Component, bootstrap, Injectable} from 'angular2/angular2';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
@Component({
    selector: 'hello-app',
    providers: [TranslateService],
    template: `
        <h1>Hello, {{name}}!</h1>
        Say {{ hello | translate }} to: <input [value]="name" (input)="name = $event.target.value">
    `,
    pipes: [TranslatePipe]
})
export class HelloApp {
    name: string = 'World';
    hello: string = 'HELLO';

    constructor(translate: TranslateService) {
        translate.setDefault('en');
        translate.setTranslation('en', {
            'HELLO': 'hello'
        });
        translate.use('en');
    }
}

bootstrap(HelloApp, [HTTP_PROVIDERS]);