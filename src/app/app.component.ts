import { Component } from '@angular/core';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  readText: string;
  saveText: string = 'test';

  openFile(evt) {
    const file = evt.target.files[0];
    this.fileToText(file)
    .then(text => {
      this.readText = text;
    })
    .catch(err => console.log(err));
  }

  fileToText(file): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  saveFile() {
    // const data = 'test';
    let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    let blob = new Blob([bom, this.saveText], {"type": "text/csv"});
    FileSaver.saveAs(blob, 'test_data.txt');
  }
}
