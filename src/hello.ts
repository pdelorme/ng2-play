import {Component, Injectable} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
@Component({
    selector: 'hello-app',
    template: `
        Copyright: "<b>{{ 'FOOTER.COPYRIGHT' | translate:{version: version} }}</b>"
        <br/>
        Change langage:
        <select (change)="translate.use($event.target.value)">
            <option *ngFor="#lang of languages" [selected]="lang === translate.currentLang">{{lang}}</option>
        </select>
    `,
    pipes: [TranslatePipe]
})
export class HelloApp {
    version: string = '1.0.0';
    languages: Array = ['en', 'an'];

    constructor(public translate: TranslateService) {
        // not required as "en" is the default
        translate.setDefaultLang('en');

        // we set the translations for english manually (instead of using a json file & the static loader)
        /*translate.setTranslation('en', {
            'HELLO_WORLD': 'hello {{value}}'
        });

        translate.setTranslation('fr', {
            'HELLO_WORLD': 'bonjour {{value}}'
        });*/

        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(an|en)/gi.test(userLang) ? userLang : 'en';

        // Use a static file
        translate.useStaticFilesLoader("i18n", ".json");

        // this trigger the use of the userLang language after setting the translations
        translate.use(userLang);
    }
}

// Instantiate TranslateService in the bootstrap so that we can keep it as a singleton
bootstrap(HelloApp, [TranslateService, HTTP_PROVIDERS]);
