import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute,ParamMap} from "@angular/router";
import {switchMap,tap} from "rxjs/internal/operators";
import {ReuseTabService} from "@delon/abc";
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdf/build/pdf.worker.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  pdfDoc:any;
  pageRendering:boolean = false;
  scale = 1.5;
  pageNum = 1;
  pageNumPending :any = null;

  showPDF (url) {
    pdfjsLib.getDocument(url).then((pdf)=> {
      this.pdfDoc = pdf;
      this.renderPage(1);
    });
  }
  renderPage (num) {
    this.pageRendering = true;
    this.pdfDoc.getPage(num).then( (page)=> {
      let viewport = page.getViewport(this.scale);
      let canvas:any = document.getElementById('the-canvas');
      let box:any = document.getElementById('canvas-box');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      box ? box.style.width = viewport.width + 'px':'';
      // Render PDF page into canvas context
      let renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      let renderTask = page.render(renderContext);
      // Wait for rendering to finish
      renderTask.promise.then( ()=> {
        this.pageRendering = false;
        if (this.pageNumPending !== null) {
          // New page rendering is pending
          this.renderPage(this.pageNumPending);
          this.pageNumPending = null;
        }
      })
    })
  }
  queueRenderPage (num) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num)
    }
  }
  onPrevPage () {
    if (this.pageNum <= 1) {
      return
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum);
  }
  onNextPage () {
    if (this.pageNum >= this.pdfDoc.numPages) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum);
  }

    constructor(
    private http: _HttpClient,
    private route:ActivatedRoute,
    private reuseTabService:ReuseTabService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      tap((params:ParamMap) => {
        this.reuseTabService.title = `编辑 ${params.get('id')}`;
      })
    ).subscribe();
    // pdfjsLib.getDocument('./assets/typescript-tutorial.pdf').then((pdf)=>{
    //   console.log('PDF loaded');
    //   let pageNumber = 1;
    //   pdf.getPage(pageNumber).then((page)=>{
    //     console.log('Page loaded');
    //     let scale = 1.5;
    //     let viewport = page.getViewport(scale);
    //     let canvas:any = document.getElementById('the-canvas');
    //     let box:any = document.getElementById('canvas-box');
    //     let context = canvas.getContext('2d');
    //     canvas.height = viewport.height;
    //     canvas.width = viewport.width;
    //     box.style.width = viewport.width + 'px';
    //     console.log(`width:${viewport.width}`);
    //     let renderContext = {
    //       canvasContext: context,
    //       viewport: viewport
    //     };
    //     let renderTask = page.render(renderContext);
    //     renderTask.then(function () {
    //       console.log('Page rendered');
    //     });
    //   });
    // },(err)=>{
    //   console.log(err);
    // });
    this.showPDF('./assets/typescript-tutorial.pdf');
  }

}
