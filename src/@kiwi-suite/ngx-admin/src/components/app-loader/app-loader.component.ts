import {Component} from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import {AccountService, ConfigurationService} from '../../services';

@Component({
    selector: 'app-loader',
    templateUrl: './app-loader.component.html',
    styleUrls: ['./app-loader.component.scss']
})
export class AppLoaderComponent {

    constructor(public config: ConfigurationService,
                private account: AccountService) {
    }

    get user$() {
        return this.account.user$;
    }

    get ready$() {
        return this.config.ready$;
    }

    get config$() {
        return this.config.params$;
    }

    get loading$() {
        return this.config.loading$;
    }
}