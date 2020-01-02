import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CudtListPage } from './cudt-list.page';

describe('CudtListPage', () => {
  let component: CudtListPage;
  let fixture: ComponentFixture<CudtListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CudtListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CudtListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
