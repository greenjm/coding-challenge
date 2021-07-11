import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: "list",
    component: ListProductsComponent,
  },
  {
    path: "create",
    component: AddProductComponent,
  },
  {
    path: "detail",
    component: ProductDetailComponent,
  },
  {
    path: "edit",
    component: EditProductComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ListProductsComponent,
    ProductDetailComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
