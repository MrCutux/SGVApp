import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormulariosPage } from './formularios.page';

describe('FormulariosPage', () => {
  let component: FormulariosPage;
  let fixture: ComponentFixture<FormulariosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Usando  SpyOn en el metodo guardar solicitud
  it('deberia guardar la solicitud', () =>{
    spyOn(component, 'guardar').and.stub;
    component.guardar();
  });
});
