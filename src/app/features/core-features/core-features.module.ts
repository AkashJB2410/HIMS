import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
const routes: Routes = [
  {path:'' , component: SettingsComponent},
  
  // {path:'dicom-viewer' , component: DicomImageViewerComponent}
];


@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreFeaturesModule { }
