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

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public List<Product> getAllProducts(){
        return proser.getAllProducts();
    }


    @GetMapping("/category/{id}")
    public List<Product> getproductbycategoryid(@PathVariable Long id){
        return proser.getProductById(id);
    }









}
