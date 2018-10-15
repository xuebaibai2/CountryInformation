import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';

const appRoutes: Routes = [
    {path: '', component: SearchBoxComponent },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
