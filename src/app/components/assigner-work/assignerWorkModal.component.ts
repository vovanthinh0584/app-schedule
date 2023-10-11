import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { GetTaskService } from "src/app/services/getTask/get-task.service";
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-assigner-work-modal',
  templateUrl: './assignerWorkModal.component.html',
  styleUrls: ['./assignerWorkModal.component.css']
})
export class AssignerWorkModalComponent implements OnInit {
  @ViewChild('teamComponent') teamComponent: IonicSelectableComponent;
  @ViewChild('workerComponent') workerComponent: IonicSelectableComponent;
  @Input() Language;
  @Input() selectItem: any;
  @Input() Message;
  @Input() CurrentItem: any;
  @Input() toastService: any;
  listLevel:any = [
    {
      levelId: "1",
      levelName: "High"
    },
    {
      levelId: "2",
      levelName: "Medium"
    },
    {
      levelId: "3",
      levelName: "Low"
    }
  ]
  listKindOfWork : any =[
    {
      //MTN Request Form,MTN Request Form;Other,Other;Schedule Work,Schedule Work (Công việc theo kế hoạch)
      value: "MTN Request Form",
      name: "MTN Request Form"
    },
    {
      //MTN Request Form,MTN Request Form;Other,Other;Schedule Work,Schedule Work (Công việc theo kế hoạch)
      value: "Other",
      name: "Other"
    },
    {
      //MTN Request Form,MTN Request Form;Other,Other;Schedule Work,Schedule Work (Công việc theo kế hoạch)
      value: "Schedule Work",
      name: "Schedule Work (Công việc theo kế hoạch)"
    }
  ];
  listClassifications : any =[
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "R",
      name: "Repair"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "PM",
      name: "Preventive maintenance"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "OP",
      name: "Operation"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "SP",
      name: "Support"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "CL",
      name: "Cleaning"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "RP",
      name: "Replace"
    },
    {
      //R, Repair;PM, Preventive maintenance;OP, Operation;SP, Support;CL, Cleaning;RP, Replace;SA, Safety
      value: "SA",
      name: "Safety"
    },
  ];
 listTeam:any=[];
 listWorker:any=[];
 team:any=[];
 worker:any=[];
 strTeam:any="";
 strWorker:any="";
  constructor(private _route: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private service: GetTaskService) {

  }
  ngOnInit() {
    this.service.GetListworker().subscribe(x=>{
      this.listWorker=x.Data;
    })
    this.service.GetListTeam().subscribe(x=>{
      this.listTeam=x.Data;
    })
  }
  
  onChangeWorker($event){

  }
  
 
  onChangeTeam($event){

  }
  
 
  onSave(){
    debugger
    if(this.ValidForm()){
      this.strTeam=this.team.map(x=>x.TeamGroupId).join();
      this.strWorker=this.worker.map(x=>x.WorkerId).join();
      this.CurrentItem.ClassificationName = this.listClassifications.find(x=>x.value == this.CurrentItem.Classification).name;
       var body:any={};
       debugger;
       body.WorkNo=this.CurrentItem.WorkNo;
       body.Team=this.strTeam;
       body.Worker=this.strWorker;
       body.Level=this.CurrentItem.Level;
       body.Classification=this.CurrentItem.Classification;
       body.KindOfWork=this.CurrentItem.KindOfWork;
       this.service.AssignWork(body).subscribe(x=>{
         if(x.Data==1)
         {
            this.toastService.success(this.Message.GetTask.AssignerWork);
            this.close(true);
         }
         else
         {
            this.toastService.success(this.Message.GetTask.AssignerWorkError);
            this.close(false);
         }

       });
    }
  }
  ValidForm() {
    
    if(this.team.length==0)
    {
        this.toastService.warn(this.Message.GetTask.Team);
        return false;
    }
    if(this.worker.length==0)
    {
        this.toastService.warn(this.Message.GetTask.Worker);
        return false;
    }
    if(!this.CurrentItem.Level)
    {
        this.toastService.warn(this.Message.GetTask.Level);
        return false;
    }
    
    

    return true;
  }
  close(item) {
    this.modalCtrl.dismiss(item);
  }

 
}
