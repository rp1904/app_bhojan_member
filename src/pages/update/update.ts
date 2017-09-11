import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { AppUrls } from '../../services/appurls';

@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})

export class Update {

  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams,
              public transfer: FileTransfer, public file: File, public fileOpener: FileOpener,
              public appUrls: AppUrls) {
                  
  }

fileTransfer: FileTransferObject = this.transfer.create();

versionDetails:any;

val:number = 0;

ionViewDidLoad() {
    this.versionDetails = this.params.get("versionDetails");
}

download() {

this.appUrls.loading.presentLoadingUnlimited("Downloading Updates....");
this.appUrls.loading.presentToastUnlimited("Please do not press back button or close app.");
 var nativePath = this.file.dataDirectory + 'Bhojan.apk';
  this.fileTransfer.download(this.versionDetails.appLink, nativePath).then((entry) => {

        this.fileOpener.open(nativePath, 'application/vnd.android.package-archive')
        .then(() => console.log(nativePath + 'File is opened'))
        .catch(e => console.log(nativePath + 'Error openening file', e));

      this.appUrls.loading.dismissLoading();
      this.appUrls.loading.dismissUnlimitedToast();
    //   this.appUrls.loading.showAlertOnlyTSubitle("Success",'download complete: ' + entry.toURL());
      console.log(entry.toURL());

  }, (error) => {
      console.log(error);
      this.appUrls.loading.dismissLoading();
      this.appUrls.loading.dismissUnlimitedToast();
      this.appUrls.loading.showAlertOnlyTSubitle("Error",'Download Failed ! Please Try Again.');
  });
   
   this.fileTransfer.onProgress((result)=>{
            
            var percent =  result.loaded / result.total * 100;
            percent = Math.round(percent);
            console.log('Downloaded:  ' + percent + '%');
   });
   
   this.file.removeFile(this.file.dataDirectory, 'Bhojan.apk')
   .then(() => console.log(nativePath + 'File is removed'))
   .catch(e => console.log(nativePath + 'Error removing file', e));
}



}
