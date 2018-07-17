import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cmx-camera-open-page',
  templateUrl: './cmx-camera-open-page.component.html',
  styleUrls: ['./cmx-camera-open-page.component.css']
})
export class CmxCameraOpenPageComponent implements OnInit, OnDestroy {
  public captures: Array<any>;
  camera: boolean = false;
  localstreme: any;
  constructor() {
    this.captures = [];
  }
  ngOnInit() {
  }

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;


  openCamera() {
    this.camera = true
    var browser = <any>navigator;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);
    console.log(browser.mediaDevices);

    if (browser.getUserMedia) {
      browser.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.localstreme = stream
      });
    }
  }

  public captureImage() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }
  ngOnDestroy() {
    this.video.nativeElement.pause();
    this.video.nativeElement.src = "";
    this.localstreme.getTracks()[0].stop();
  }

}
