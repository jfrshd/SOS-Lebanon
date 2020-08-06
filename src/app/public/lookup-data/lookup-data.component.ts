import { Component, Input } from '@angular/core';
import { LookupData } from '../models/lookup-data';

@Component({
    selector: 'sos-lookup-data',
    templateUrl: './lookup-data.component.html',
    styleUrls: ['./lookup-data.component.css'],
})
export class LookupDataComponent {
    @Input() data: LookupData;
    @Input() showUser: boolean;
    @Input() showActions: boolean;
}
