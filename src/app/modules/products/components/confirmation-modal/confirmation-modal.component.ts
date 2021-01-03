import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'pma-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  modalData: any;

  @Output() confirm: EventEmitter<any>;

  constructor(
    private _ngxSmartModal: NgxSmartModalService,
  ) {
    this.confirm = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }


  closeModal(): void {
    this._ngxSmartModal.close('confirmationModal');
  }


  setModalData(modalData: any): void {
    this.modalData = modalData;
  }


  confirmResponse(): void {
    this.confirm.emit(this.modalData);
    this.closeModal();
  }
}
