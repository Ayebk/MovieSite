import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedlistPageComponent } from './watchedlist-page.component';

describe('WatchedlistPageComponent', () => {
  let component: WatchedlistPageComponent;
  let fixture: ComponentFixture<WatchedlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchedlistPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
