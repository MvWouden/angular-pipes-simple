import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

interface Project {
  name: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatusCodes = ['Stable', 'Critical', 'Finished'];
  form: FormGroup;
  submitted = false;
  project: Project = {
    name: '',
    email: '',
    status: ''
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      projectName: new FormControl(null, [Validators.required], this.forbiddenProjectNames),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    this.project.name = this.form.value.projectName;
    this.project.email = this.form.value.email;
    this.project.status = this.form.value.projectStatus;
    this.submitted = true;
    this.form.reset();
  }

  forbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({projectNameIsForbidden: true});
        }
        resolve(null);
      }, 500); // simulate server delay
    });
    return promise;
  }
}
