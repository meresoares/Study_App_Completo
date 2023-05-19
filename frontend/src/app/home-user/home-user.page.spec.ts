import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MessageComponentModule } from '../message/message.module';

import { HomeUserPage } from './home-user.page';

describe('UserPage', () => {
  let component: HomeUserPage;
  let fixture: ComponentFixture<HomeUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUserPage],
      imports: [IonicModule.forRoot(), MessageComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
