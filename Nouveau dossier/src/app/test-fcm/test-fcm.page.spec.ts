import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestFcmPage } from './test-fcm.page';

describe('TestFcmPage', () => {
  let component: TestFcmPage;
  let fixture: ComponentFixture<TestFcmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFcmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestFcmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
