import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DossierInfoPage } from './dossier-info.page';

describe('DossierInfoPage', () => {
  let component: DossierInfoPage;
  let fixture: ComponentFixture<DossierInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DossierInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
