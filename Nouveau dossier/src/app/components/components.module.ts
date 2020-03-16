import { NgModule } from "@angular/core";
import { NotificationComponent } from './notification/notification.component';
import { IonicModule, } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@NgModule({

    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [NotificationComponent],
    exports: [NotificationComponent],
})
export class ComponentsModule { }

