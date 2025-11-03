package com.store.picnic.controller;


import com.store.picnic.model.Cart;
import com.store.picnic.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class CartContoller {
//    when i do any of these operations

    @Autowired
    private CartService cartService;

    @DeleteMapping("/cart/{cartId}")
    public ResponseEntity<Void> deleteitem(@PathVariable Long cartId){
        cartService.DeleteByProduct(cartId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/cart/product/{productId}")
    public ResponseEntity<Cart> addOrUpdateItem(@PathVariable Long productId, @RequestBody Long qty){
        Cart cart = cartService.addOrUpdateProduct(productId, qty);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/cart")
    public ResponseEntity<List<Cart>> getallitem(){
        List<Cart> items = cartService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/orders")
    public void checkout(){
     // need to implement orders
    }



}
