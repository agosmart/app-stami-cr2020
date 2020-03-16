import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DossiersPage } from './dossiers.page';

describe('DossiersPage', () => {
  let component: DossiersPage;
  let fixture: ComponentFixture<DossiersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossiersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DossiersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
