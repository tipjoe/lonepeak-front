import { Component, OnInit } from '@angular/core';
// import { NgxImageCompressService } from 'ngx-image-compress';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass'],
})
export class PostFormComponent implements OnInit {
  isForm: boolean = false;
  compressedImage: string = '';

  constructor(
    // private imageService: NgxImageCompressService // private router: Router
  ) {}

  ngOnInit(): void {
    // this.isForm = this.router.url == '/add-post';
  }

  toggleForm() {
    this.isForm = !this.isForm;
    if (!this.isForm) {
      this.compressedImage = '';
    }
  }

  compressImage() {
    // this.imageService.uploadFile().then(({ image, orientation }) => {
    //   // console.warn('Size in bytes was:', this.imageService.byteCount(image));

    //   this.imageService
    //     .compressFile(image, orientation, 50, 50)
    //     .then((result) => {
    //       this.compressedImage = result;
    //       // console.warn('Size in bytes is now:', this.imageService.byteCount(result));
    //     });
    // });
  }

  textAreaHeight(event: KeyboardEvent) {
    // Must cast event.target to prevent null possibility.
    let el: HTMLInputElement = <HTMLInputElement>event.target;
    el.style.height = '1px';
    el.style.height = 25 + el.scrollHeight + 'px';
  }
}
