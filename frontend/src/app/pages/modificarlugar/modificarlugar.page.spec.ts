import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarlugarPage } from './modificarlugar.page';

describe('ModificarlugarPage', () => {
  let component: ModificarlugarPage;
  let fixture: ComponentFixture<ModificarlugarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarlugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
