import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { DecryptPipe, EncryptPipe } from '../pipes/encrypt-decrypt.pipe';
import { DashboardComponent } from 'src/app/features/dashboard/dashboard.component';
import { DicomImageViewerComponent } from 'src/app/dicom-image-viewer/dicom-image-viewer.component';
import { UserManagementComponent } from 'src/app/features/user-management/user-management.component';
import { WorklistComponent } from 'src/app/features/worklist/worklist.component';
import { MasterPageComponent } from 'src/app/features/master-page/master-page.component';
import { WorklistModule } from 'src/app/features/worklist/worklist.module';
import { UserManagementModule } from 'src/app/features/user-management/user-management.module';
import { DicomImageViewerModule } from 'src/app/dicom-image-viewer/dicom-image-viewer.module';
import { DashboardModule } from 'src/app/features/dashboard/dashboard.module';
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
    SharedModule
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
