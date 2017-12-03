import { NgModule } from '@angular/core';
import { UsersOnlineComponent } from './users-online/users-online';
import { MainHomeComponent } from './main-home/main-home';
@NgModule({
	declarations: [UsersOnlineComponent,
    MainHomeComponent],
	imports: [],
	exports: [UsersOnlineComponent,
    MainHomeComponent]
})
export class ComponentsModule {}
