import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioModalPage } from './usuario-modal.page';

describe('UsuarioModalPage', () => {
  let component: UsuarioModalPage;
  let fixture: ComponentFixture<UsuarioModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
