import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppServiceService } from 'src/app/services/app-service.service';


const close = `
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>
`;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  // form
  empform: FormGroup

  // const
  showModel: boolean = true;
  showclose: boolean = false;
  editModel: boolean = false;

  // vars
  name: string;
  position: string;
  department: string;
  id: string

  // array
  Employees = []

  // gobal var
  item_id:string
  

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private empService: AppServiceService, private fb: FormBuilder) {
    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral('close', sanitizer.bypassSecurityTrustHtml(close));
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  onAddEmployee() {
    this.showModel = false
    console.log(this.showModel)
    this.getEmployees();
  }

  close() {
    this.showModel = true
    this.editModel = false
  }

  deleteEmployee(id) {
    console.log(id)
    // to get data before delete
    this.getEmployees();

    this.empService.deleteEmployee(id).subscribe()

    // to get data after delete
    this.getEmployees();
  }

  getEmployees() {
    this.empService.getEmployees().subscribe((res: any) => {
      console.log(res)
      this.Employees = res
    })
  }

  onEditEmployee(item,item_id) {
    this.showModel = false
    this.editModel = true
    console.log("item",item)
    console.log("itemid",item_id)
    this.item_id = item_id

    
  }

  onSubmit(data) {
    if (this.editModel) {
      this.getEmployees();
      console.log("editModel",this.editModel)
      console.log("this.item_id",this.item_id)
      this.empService.updateEmployee([data.value,this.item_id]).subscribe()
      this.getEmployees();
      this.showModel = true
    }
    else {
      console.log("editModel",this.editModel)
      this.getEmployees();
      console.log(data.value)
      this.empService.addEmployee(data.value).subscribe()
      this.getEmployees();
      this.showModel = true
    }
  }

}
