import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { debounce, debounceTime, delay, Observable, Subject, takeUntil } from 'rxjs';
import { HomeService } from './home.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

type User = {
  id: number,
  name: string,
  createdAt: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private homeService = inject(HomeService);
  private destroy$ = new Subject<void>();
  private valueChanges!: Observable<User[]>;
  users!: User[];
  formUsers!: FormArray<FormGroup>;

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getUsers(): void {
    const homeObs = this.homeService.getUsers().pipe(takeUntil(this.destroy$));
    homeObs.subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.formUsers = this.loadingFormFromData(data);
        this.getValuesChange();
      }
    })
  }

  private loadingFormFromData(data: User[]): FormArray {
    let formArray = new FormArray<FormGroup>([]);
    data.map((user) => {
      const formGroup = new FormGroup({
        id: new FormControl(user.id),
        name: new FormControl(user.name),
        createdAt: new FormControl(user.createdAt),
      });
      formArray.push(formGroup)
    })
    return formArray;
  }

  getFormGroup(i: number): FormGroup {
    return this.formUsers.controls[i] as FormGroup;
  }

  private getValuesChange(): void {
    this.valueChanges = this.formUsers.valueChanges.pipe(debounceTime(1000), takeUntil(this.destroy$));
    this.valueChanges.subscribe({
      next: (users) => {
        console.log(users);
      }
    })
  }

  onAddUser(): void {
    this.formUsers.push(new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      createdAt: new FormControl(''),
    }))
  }
}
