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
        return productrepo.findByCategory_Id(id);
    }

    public Product createProduct(Product product){
        return productrepo.save(product);
    }

    public Product updateProduct(Long id, Product product){
        Product existingProduct = productrepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setImageUrl(product.getImageUrl());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setCategory(product.getCategory());

        return productrepo.save(existingProduct);
    }

    public void deleteProduct(Long id){
        productrepo.deleteById(id);
    }
}
