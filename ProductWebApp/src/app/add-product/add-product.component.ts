import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public addProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      price: ['', Validators.required],
    });
  }

  isFormInvalid(): boolean {
    return !this.addProductForm.valid;
  }

  onSubmit(): void {
    const product: Product = {
      name: this.addProductForm.get('name')?.value,
      description: this.addProductForm.get('description')?.value,
      price: this.addProductForm.get('price')?.value
    };

    this.productService.addProduct(product)
      .subscribe(p => {
        this.router.navigate(['list']);
      });
  }

}
