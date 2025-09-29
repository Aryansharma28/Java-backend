package com.store.picnic.service;


import com.store.picnic.model.Product;
import com.store.picnic.repository.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepo productrepo;

    public ProductService(ProductRepo productrepo) {
        this.productrepo = productrepo;
    }

    public List<Product> getAllProducts(){
        return productrepo.findAll();
    }

    public List<Product> getProductById(Long id){
        return productrepo.findByCategoryId(id);
    }
}
