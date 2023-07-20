import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from "primeng/password";
import { StepsModule } from 'primeng/steps';
import { ConfirmBoxComponent } from 'src/app/core/confirm-box/confirm-box.component';
import { GenerictableComponent } from 'src/app/core/generictable/generictable.component';
import { SidebarComponent } from 'src/app/core/sidebar/sidebar.component';
import { ToastComponent } from 'src/app/core/toast/toast.component';
import { FilterComponent } from 'src/app/core/filter/filter.component';
import { SuperGridComponent } from 'src/app/core/super-grid/super-grid.component';
import { FormComponent } from 'src/app/core/form/form.component';
import { TabularFormsComponent } from 'src/app/core/tabular-forms/tabular-forms.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PopupComponent } from 'src/app/core/popup/popup.component';
import { ReEnterComponent } from 'src/app/core/form/re-enter/re-enter.component';
import { TabViewModule } from 'primeng/tabview';
import { HeaderComponent } from 'src/app/core/master/header/header.component';
import { FooterComponent } from 'src/app/core/master/footer/footer.component';
import { SideNavComponent } from 'src/app/core/master/side-nav/side-nav.component';
import { MasterComponent } from 'src/app/core/master/master.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CaptchaModule } from 'primeng/captcha';
import { ImageModule } from 'primeng/image';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { CaptchaComponent } from 'src/app/core/form/captcha/captcha.component';
import { StepperFormComponent } from 'src/app/core/stepper-form/stepper-form.component';
import { LoginComponent } from 'src/app/core/session/login/login.component';
import { ForgotPasswordComponent } from 'src/app/core/session/forgot-password/forgot-password.component';
import { SessionComponent } from 'src/app/core/session/session.component';
import { PageNotFoundComponent } from 'src/app/core/page-not-found/page-not-found.component';
import { PaginatorModule } from "primeng/paginator";
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { DecodePipe, EncodePipe } from '../pipes/encode-decode.pipe';
import { DependentDropdownComponent } from 'src/app/core/form/dependent-dropdown/dependent-dropdown.component';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { ChartsComponent } from 'src/app/core/charts/charts.component';
import { MoreandlessComponent } from 'src/app/core/moreandless/moreandless.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { FormService } from '../service/form.service';
import { DecryptPipe, EncryptPipe, RMWhiteSpaces } from '../pipes/encrypt-decrypt.pipe';
import { CustomDatePipe } from '../pipes/custom-date.pipe';
import { UserService } from '../service/user.service';
import { SuperFormComponent } from '../../super-form/super-form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CardsComponent } from '../../cards/cards.component';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { PickListModule } from 'primeng/picklist';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { EmailConfigurationComponent } from '../../email-configuration/email-configuration.component';
import { SmsConfigurationComponent } from '../../sms-configuration/sms-configuration.component';
import { VerticalTabularComponent } from '../../vertical-tabular/vertical-tabular.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HomePageComponent } from 'src/app/core/home-page/home-page.component';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SettingsComponent } from 'src/app/features/core-features/settings/settings.component';
import { Settings } from '@cornerstonejs/core';
import { PersonalizationComponent } from 'src/app/features/core-features/personalization/personalization.component';
import { EditProfileComponent } from 'src/app/features/core-features/edit-profile/edit-profile.component';
import { Interceptor } from '../service/interceptor';
import { CommonService } from '../service/common.service';
import { AccordionModule } from 'primeng/accordion';
import { AccordionComponent } from '../../accordion/accordion.component';

@NgModule({
    declarations: [
        ConfirmBoxComponent,
        FilterComponent,
        FormComponent,
        GenerictableComponent,
        SidebarComponent,
        SuperGridComponent,
        TabularFormsComponent,
        ToastComponent,
        PopupComponent,
        ReEnterComponent,
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        MasterComponent,
        StepperFormComponent,
        CaptchaComponent,
        LoginComponent,
        ForgotPasswordComponent,
        SessionComponent,
        PageNotFoundComponent,
        DependentDropdownComponent,
        EncryptPipe,
        DecryptPipe,
        RMWhiteSpaces,
        EncodePipe,
        DecodePipe,
        CustomDatePipe,
        ChartsComponent,
        MoreandlessComponent,
        SuperFormComponent,
        CardsComponent,
        EmailConfigurationComponent,
        SmsConfigurationComponent,
        VerticalTabularComponent,
        HomePageComponent,
        SettingsComponent,
        PersonalizationComponent,
        EditProfileComponent,
        AccordionComponent
    ],
    imports: [
        CommonModule,
        AvatarModule,
        AvatarGroupModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ConfirmDialogModule,
        TableModule,
        SliderModule,
        InputTextModule,
        InputTextareaModule,
        ProgressSpinnerModule,
        TooltipModule,
        SidebarModule,
        ToastModule,
        RippleModule,
        DropdownModule,
        CheckboxModule,
        RadioButtonModule,
        CalendarModule,
        PasswordModule,
        StepsModule,
        ButtonModule,
        InputNumberModule,
        TabViewModule,
        MultiSelectModule,
        CaptchaModule,
        ImageModule,
        RippleModule,
        PanelMenuModule,
        DialogModule,
        PaginatorModule,
        CardModule,
        SplitButtonModule,
        MenuModule,
        ChartModule,
        OverlayPanelModule,
        DividerModule,
        KeyFilterModule,
        FileUploadModule,
        TieredMenuModule,
        MenubarModule,
        TabMenuModule,
        PickListModule,
        BreadcrumbModule,
        CascadeSelectModule,
        InputSwitchModule,
        BadgeModule,
        MultiSelectModule,
        AvatarModule,
        AvatarGroupModule,
        AccordionModule
    ],
    exports: [
        //============= Core Components =============
        ConfirmBoxComponent,
        FilterComponent,
        FormComponent,
        GenerictableComponent,
        SidebarComponent,
        SuperGridComponent,
        TabularFormsComponent,
        ToastComponent,
        PopupComponent,
        ReEnterComponent,
        HeaderComponent,
        FooterComponent,
        SideNavComponent,
        MasterComponent,
        StepperFormComponent,
        CaptchaComponent,
        LoginComponent,
        ForgotPasswordComponent,
        DependentDropdownComponent,
        SessionComponent,
        EncryptPipe,
        DecryptPipe,
        RMWhiteSpaces,
        EncodePipe,
        DecodePipe,
        CustomDatePipe,
        ChartsComponent,
        MoreandlessComponent,
        SuperFormComponent,
        CardsComponent,
        EmailConfigurationComponent,
        SmsConfigurationComponent,
        VerticalTabularComponent,
        HomePageComponent,
        SettingsComponent,
        PersonalizationComponent,
        EditProfileComponent,
        AccordionComponent,
        //============= Core Imports =============

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ConfirmDialogModule,
        TableModule,
        SliderModule,
        InputTextModule,
        InputTextareaModule,
        ProgressSpinnerModule,
        TooltipModule,
        SidebarModule,
        ToastModule,
        RippleModule,
        DropdownModule,
        CheckboxModule,
        RadioButtonModule,
        CalendarModule,
        PasswordModule,
        StepsModule,
        ButtonModule,
        InputNumberModule,
        MultiSelectModule,
        CaptchaModule,
        ImageModule,
        TabViewModule,
        DialogModule,
        PaginatorModule,
        CardModule,
        SplitButtonModule,
        MenuModule,
        ChartModule,
        OverlayPanelModule,
        DividerModule,
        TieredMenuModule,
        FileUploadModule,
        CardModule,
        MenubarModule,
        TabMenuModule,
        PickListModule,
        BreadcrumbModule,
        CascadeSelectModule,
        BadgeModule,
        MultiSelectModule,
        AvatarModule,
        AvatarGroupModule,
        AccordionModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
        UserService,
        DatePipe,
        EncryptPipe,
        DecryptPipe,
        RMWhiteSpaces,
        EncodePipe,
        DecodePipe,
        CustomDatePipe,
        FormService,
        CommonService,
        {
            "provide": HTTP_INTERCEPTORS,
            multi: true,
            useClass: Interceptor
        }
    ]
})
export class SharedModule { }
