import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnboardDemoPage } from './onboard-demo.page';

describe('OnboardDemoPage', () => {
  let component: OnboardDemoPage;
  let fixture: ComponentFixture<OnboardDemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardDemoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
