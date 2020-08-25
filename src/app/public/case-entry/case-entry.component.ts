import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { Case } from '../models';
import { CaseService } from '../services/case/case.service';
declare var $: any;

@Component({
    selector: 'app-case-entry',
    templateUrl: './case-entry.component.html',
    styleUrls: ['./case-entry.component.css'],
})
export class CaseEntryComponent implements OnInit {
    @Input() data: Case;
    @Input() showActions: boolean;
    @Input() showInitiative = true;
    // locations key(id)-value(name) pair
    @Input() locations: any;
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onDelete = new EventEmitter<string>();
    // tslint:disable-next-line: no-output-on-prefix
    @Output() onUpdate = new EventEmitter<string>();
    deleteModal: any;
    fulfillModal: any;

    constructor(
        private caseService: CaseService,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        this.deleteModal = $(this.elementRef.nativeElement).find('.modal-delete');
        this.deleteModal.modal({
            keyboard: false,
            show: false
        });
        this.fulfillModal = $(this.elementRef.nativeElement).find('.modal-fulfill');
        this.fulfillModal.modal({
            keyboard: false,
            show: false
        });
    }

    delete(): void {
        this.deleteModal.modal('show');
    }

    fulfill(): void {
        this.fulfillModal.modal('show');
    }

    deleteCase(): void {
        this.caseService.delete(this.data.id)
            .subscribe(_ => {
                this.onDelete.emit(this.data.id);
            });
    }

    fulfillCase(): void {
        this.caseService.update(this.data)
            .subscribe(_ => {
                this.fulfillModal.modal('hide');
                this.onUpdate.emit(this.data.id);
            });
    }
}
