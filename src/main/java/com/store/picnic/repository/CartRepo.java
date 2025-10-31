package com.store.picnic.repository;

import com.store.picnic.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepo extends JpaRepository<Cart,Long> {
    Optional<Cart> findByProductId(Long productId);
}
