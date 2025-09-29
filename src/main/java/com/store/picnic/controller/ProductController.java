package com.store.picnic.controller;


import com.store.picnic.model.Product;
import com.store.picnic.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService proser;

    public ProductController(ProductService proser) {
        this.proser = proser;
    }
    @GetMapping
    public List<Product> getAllProducts(){
        return proser.getAllProducts();
    }

    @GetMapping("/category/{id}")
    public List<Product> getproductbycategoryid(@PathVariable Long id){
        return proser.getProductById(id);
    }









}
