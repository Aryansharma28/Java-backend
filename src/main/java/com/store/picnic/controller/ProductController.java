package com.store.picnic.controller;


import com.store.picnic.model.Product;
import com.store.picnic.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173/")

public class ProductController {
    private final ProductService proser;

    public ProductController(ProductService proser) {
        this.proser = proser;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public List<Product> getAllProducts(){
        return proser.getAllProducts();
    }

    @GetMapping("/category/{id}")
    public List<Product> getproductbycategoryid(@PathVariable Long id){
        return proser.getProductById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Product createProduct(@RequestBody Product product){
        return proser.createProduct(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product){
        return proser.updateProduct(id, product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        proser.deleteProduct(id);
    }









}
