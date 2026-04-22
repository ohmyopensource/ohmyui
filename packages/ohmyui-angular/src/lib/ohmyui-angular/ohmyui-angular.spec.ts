import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OhmyuiAngular } from './ohmyui-angular';

describe('OhmyuiAngular', () => {
  let component: OhmyuiAngular;
  let fixture: ComponentFixture<OhmyuiAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OhmyuiAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(OhmyuiAngular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
