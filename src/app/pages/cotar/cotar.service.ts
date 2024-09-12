import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cover, CoverApi } from './cover.model';
import { CoverViewModel } from './cover.viewmodel';

@Injectable()
export class CotarService {

  private readonly http = inject(HttpClient);

  constructor() { }

  getCovers(): Observable<Cover[]> {
    return this.http.get<CoverApi[]>('/assets/fake-data/covers.json')
      .pipe(
        map(
          (coverApi) => CoverViewModel.fromCoverApi(coverApi)
        ));
  }
}
