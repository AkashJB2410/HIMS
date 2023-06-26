import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';
import { EmailConfigurationComponent } from 'src/app/core/email-configuration/email-configuration.component';
import { SmsConfigurationComponent } from 'src/app/core/sms-configuration/sms-configuration.component';

const routes: Routes = [{
  path: '', component: ConfigurationsComponent,
  children: [
    { path: 'email-configuration', component: EmailConfigurationComponent },
    { path: 'sms-configuration', component: SmsConfigurationComponent }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
