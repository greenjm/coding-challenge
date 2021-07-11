import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public editProductForm!: FormGroup;
  public productName: string = '';

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const name = params.name;
      this.productService.getProductDetail(name)
        .subscribe(p => {
          this.productName = p.name;
          this.initializeForm(p)
        });
    });
  }

  initializeForm(product: Product) {
    this.editProductForm = this.formBuilder.group({
      description: [product.description, [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      price: [product.price, Validators.required],
    });
  }

  onSubmit(): void {
    const product: Product = {
      name: this.productName,
      description: this.editProductForm.get('description')?.value,
      price: this.editProductForm.get('price')?.value
    };

    this.productService.updateProduct(product)
      .subscribe(numModified => {
        if (numModified === 1) {
          this.router.navigate(['list']);
        }
      });
  }

}
