import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { DecryptPipe, EncryptPipe } from '../pipes/encrypt-decrypt.pipe';

import { MasterPageComponent } from 'src/app/features/master-page/master-page.component';
import { MasterPageModule } from 'src/app/features/master-page/master-page.module';

@NgModule({
  declarations: [
    // DashboardComponent,
    // DicomImageViewerComponent,
    // UserManagementComponent,
    // WorklistComponent,
    // MasterPageComponent,
  ],
  imports: [
    // DashboardModule,
    // DicomImageViewerModule,
    // UserManagementModule,
    // WorklistModule,
    // MasterPageModule,
    // SharedModule
  ],
  exports: [
    // <---------- Components and their Modules ---------->
    // DashboardComponent,
    // DicomImageViewerComponent,
    // UserManagementComponent,
    // WorklistComponent,
    // MasterPageComponent,

    // WorklistModule,
    // UserManagementModule,
    // DicomImageViewerModule,
    // DashboardModule,
    // SharedModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DatePipe,
    EncryptPipe,
    DecryptPipe,
  ],
})
export class FeatureModule {}
