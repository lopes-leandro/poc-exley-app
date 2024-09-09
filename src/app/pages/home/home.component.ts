import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HomeService } from './home.service';

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
  users!: User[];

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getUsers():void {
    const homeObs = this.homeService.getUsers().pipe(takeUntil(this.destroy$));
    homeObs.subscribe({
      next: (data: User[]) => {
        console.log(data);
        this.users = data;
      }
    })
  }
}
