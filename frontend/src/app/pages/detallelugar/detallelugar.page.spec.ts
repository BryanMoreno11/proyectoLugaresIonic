import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallelugarPage } from './detallelugar.page';

describe('DetallelugarPage', () => {
  let component: DetallelugarPage;
  let fixture: ComponentFixture<DetallelugarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallelugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
