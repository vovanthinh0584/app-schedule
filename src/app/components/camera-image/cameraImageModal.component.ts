import { InputRequestService } from './../../services/inputRequest/input-request.service';
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";
import { WorkPermitService } from 'src/app/services/workPermit/work-permit.service';
import { Camera, CameraOptions, PictureSourceType, CameraPopoverOptions } from '@ionic-native/camera/ngx';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { ErrorDialogService } from 'src/app/core/errordialog.service';
@Component({
  selector: 'app-camera-image-modal',
  templateUrl: './cameraImageModal.component.html',
  styleUrls: ['./cameraImageModal.component.css'],
})
export class CameraImageModalComponent implements OnInit {
  @Input() Language;
  @Input() selectItem;
  @Input() toastService;
  @Input() Message;
  @Input() User;
  img:any=""
  listImage:any=[{FileName:"tesst",ID:1},{FileName:"tesst2",ID:1}];
  selectedFile:any;
  constructor(public dialog: ErrorDialogService,private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service:WorkPermitService,private camera: Camera,
    public actionSheetController: ActionSheetController, public alertController: AlertController) {
    console.log("cameraImageModalComponent Constructor", this.Language)
  }
  selected(item)
  {
    this.selectedFile=item;
    let typeFile = this.selectedFile.FileName.split('.').pop().toLowerCase();
    this.setImage(this.selectedFile.FileImage,typeFile);
  }
  setImage(base64:string,typeFile:string)
  {
    this.img = `data:image/${typeFile};base64,${base64}`;
  }
  ngOnInit() {
    this.getListImage();
  }
  getListImage(){

    this.service.GetWorkPermitImages(this.selectItem.Item).subscribe(x=>{
        this.listImage=x.Data.map(x=>{
            x.ImageName=x.FileName.split('.').shift();return x});
    });
  }
  
  async presentActionSheetAdd() {
    const actionSheet = await this.actionSheetController.create({
        // header: '',
        buttons: [
            //{
            //    text: 'Chọn ảnh',
            //    handler: () => {
            //        this.openImagePicker();
            //    }
            // },
            {
                text: 'Chụp ảnh mới',
                handler: () => {
                    this.openCamera();
                }
            }, {
                text: 'Hủy',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
    });
    await actionSheet.present();
}

async presentActionSheetEdit() {
    const actionSheet = await this.actionSheetController.create({
        //header: '',
        buttons: [{
            text: 'Sửa tên file',
            handler: () => {
               this.presentAlertPrompt(this.selectedFile.FileImage, 'edit')
            }
        },
        {
            text: 'Chụp ảnh mới',
            handler: () => {
                this.openCamera('edit');
            }
        }, {
            text: 'Hủy',
            icon: 'close',
            role: 'cancel',
            handler: () => {
                console.log('Cancel clicked');
            }
        }]
    });
    await actionSheet.present();
}
async presentAlertPrompt(base64: string, type: string = 'new') {
  const alert = await this.alertController.create({
      header: 'Nhập tên cho tập tin',
      inputs: [
          {
              name: 'name',
              type: "text",
              //placeholder: 'Nhập tên cho tập tin'
          },
      ],
      buttons: [
          {
              text: 'Bỏ qua',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (val) => {
                  console.log(val)
              }
          }, {
              text: 'Đồng ý',
              handler: (val) => {
                  console.log(val)
                  if (type == 'new') {
                      this.submitImage(base64, val.name)
                  } else if (type == 'edit') {
                      this.updateImage(base64, val.name,this.selectedFile)
                  }
              }
          }
      ]
  });

  await alert.present();
}
openCamera(type: string = 'new') {

  const options: CameraOptions = {
      quality: 100,
      targetWidth: 800,
      targetHeight: 800,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      popoverOptions: <CameraPopoverOptions>({ arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY })
  }
  this.camera.getPicture(options).then((imageData) => {
      if (type == 'new') {
          this.presentAlertPrompt(imageData);
      } else if (type == 'edit') {
        this.updateImage(imageData, this.selectedFile.FileName, this.selectedFile)
      }

  }, (err) => {
      //this.dialog.openDialogOK(err);
  });

}

submitImage(base64: string, fileName: string) {
  let newImg:any= {};
  newImg.FileName = `${fileName}.png`;
  newImg.WorkPermitNo = this.selectItem.Item.WorkPermitNo,
  newImg.FileImage = base64,
  newImg.FileSize = 2000,
  newImg.FileType ="png";
  var typeFile=newImg.FileType;
  this.service.saveImageWorkPermit(newImg).subscribe(res => {
     if(res.Data==1)
     {
       this.toastService.success(this.Message.WorkPermit.ImageSuccess);
       this.setImage(base64,typeFile);
       this.getListImage();
     }
     else
     {
      this.toastService.error(this.Message.WorkPermit.ImageError);
     }
     
  });
}
updateImage(base64: string, fileName: string, item: any) {
    var newImg:any={};
    newImg.FileImage = base64;
    var typeFile = item.FileName.split('.').pop().toLowerCase();
    newImg.FileName = `${fileName.split('.').shift()}.${typeFile}`;
    newImg.RecID=this.selectedFile.RecID;
    this.service.EditWorkPermitImage(newImg).subscribe(res => {

       if(res.Data==1)
       {
         this.toastService.success(this.Message.WorkPermit.UpdateImageSuccess);
         this.setImage(base64,typeFile);
         this.getListImage();

       }
       else
       {
        this.toastService.error(this.Message.WorkPermit.ImageError);
       }
       
    });
}

deleteImage() {
 this.service.DeleteWorkPermitImage(this.selectedFile).subscribe(x=>{
    if(x.Data=1)
    {
        this.toastService.success("xóa ảnh thành công");
        this.img="";
        this.selectedFile=null;
        this.getListImage();
    }
 })
}
  close(status) {
    this.modalCtrl.dismiss(status);
  }

btnAddClicked() {
   
    this.presentActionSheetAdd();
}

btnEditClicked() {
    this.presentActionSheetEdit();
}

btnDelClicked() {
    this.dialog.warn('Bạn có muốn xóa file này không?').then(val => {
        if (val) {
            this.deleteImage();
        }
    })
}
}