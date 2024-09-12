import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotarComponent } from './cotar.component';

describe('CotarComponent', () => {
  let component: CotarComponent;
  let fixture: ComponentFixture<CotarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotarComponent]
    });
    fixture = TestBed.createComponent(CotarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
