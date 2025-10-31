package com.store.picnic.service;

import com.store.picnic.model.Cart;
import com.store.picnic.model.Product;
import com.store.picnic.repository.CartRepo;
import com.store.picnic.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    public List<Cart> getAllItems() {
        return cartRepo.findAll();
    }

    public void DeleteByProduct(Long id){
        cartRepo.deleteById(id);
    }

    public Cart addOrUpdateProduct(Long productId, Long qty){
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<Cart> existingCart = cartRepo.findByProductId(productId);

        if (existingCart.isPresent()) {
            // Update existing cart item
            Cart cart = existingCart.get();
            Long difference = qty - cart.getQuantity();

            if (difference > 0 && difference > product.getQuantity()) {
                throw new RuntimeException("Not enough products in stock");
            }

            product.setQuantity(product.getQuantity() - difference);
            cart.setQuantity(qty);

            productRepo.save(product);
            return cartRepo.save(cart);
        } else {
            // Create new cart item
            if (qty > product.getQuantity()) {
                throw new RuntimeException("Not enough products in stock");
            }

            Cart cart = new Cart();
            cart.setProduct(product);
            cart.setQuantity(qty);

            product.setQuantity(product.getQuantity() - qty);
            productRepo.save(product);

            return cartRepo.save(cart);
        }
    }
}
