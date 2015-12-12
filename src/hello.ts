import {Component, Injectable} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
@Component({
    selector: 'hello-app',
    template: `
        <h1>Hello, {{name}}!</h1>
        Say {{ 'HELLO_WORLD' | translate:'{value: "world"}' }} to: <input [value]="name" (input)="name = $event.target.value">
        <br/>
        Change langage:
        <select (change)="translate.use($event.target.value)">
            <option *ngFor="#lang of translate.getLangs()" [selected]="lang === translate.currentLang">{{lang}}</option>
        </select>
    `,
    pipes: [TranslatePipe]
})
export class HelloApp {
    name: string = 'World';

    constructor(public translate: TranslateService) {
        // not required as "en" is the default
        translate.setDefaultLang('en');

        // we set the translations for english manually (instead of using a json file & the static loader)
        translate.setTranslation('en', {
            'HELLO_WORLD': 'hello {{value}}'
        });

        translate.setTranslation('fr', {
            'HELLO_WORLD': 'bonjour {{value}}'
        });

        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

        // this trigger the use of the french or english language after setting the translations
        translate.use(userLang);
    }
}

// Instantiate TranslateService in the bootstrap so that we can keep it as a singleton
bootstrap(HelloApp, [HTTP_PROVIDERS, TranslateService]);
