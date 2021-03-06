import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MediaHelper } from '../../../helpers/media.helper';
import { Media } from '../../../interfaces/media.interface';
import { CustomFieldTypeAbstract } from '../custom-field-type.abstract';
import { ImageHelper } from '../../../helpers/image.helper';

@Component({
  selector: 'formly-field-media',
  templateUrl: './formly-field-media.component.html'
})
export class FormlyFieldMediaComponent extends CustomFieldTypeAbstract {

  value: Media;
  modalRef: BsModalRef;

  isImage = MediaHelper.isImage;
  mimeTypeIcon = MediaHelper.mimeTypeIcon;

  constructor(protected modalService: BsModalService) {
    super();
  }

  openModal(template: TemplateRef<any>) {
    if (this.to.disabled) {
      return;
    }
    this.modalRef = this.modalService.show(template, {class: 'modal-xl modal-empty'});
  }

  onSelect(value: any) {
    this.modalRef.hide();
    super.setValue(value);
  }

  openLightbox(media: Media) {
    ImageHelper.setImage(media.original);
  }

  close() {
    this.modalRef.hide();
  }

}
