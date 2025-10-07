package com.store.picnic.config;

import com.store.picnic.model.Category;
import com.store.picnic.model.Product;
import com.store.picnic.repository.CategoryRepo;
import com.store.picnic.repository.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepo productrepo;
    private final CategoryRepo categoryrepo;

    public DataSeeder(ProductRepo productrepo, CategoryRepo categoryrepo) {
        this.productrepo = productrepo;
        this.categoryrepo = categoryrepo;
    }

    @Override
    public void run(String...args) throws Exception{
        productrepo.deleteAll();
        categoryrepo.deleteAll();


        Category electronics = new Category();
        electronics.setName("electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("home and kitchen");

        categoryrepo.saveAll(Arrays.asList(electronics,home,clothing));

        //Create Products

        Random random = new Random();

        Product phone = new Product();
        phone.setName("Smartphone");
        phone.setDescription("Latest model smartphone with high-resolution camera.");
        phone.setImageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400");
        phone.setPrice(699.99);
        phone.setCategory(electronics);
        phone.setQuantity((long) (random.nextInt(50) + 10)); // random 10–59

        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setDescription("Lightweight laptop with long battery life.");
        laptop.setImageUrl("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400");
        laptop.setPrice(1099.99);
        laptop.setCategory(electronics);
        laptop.setQuantity((long) (random.nextInt(30) + 5)); // random 5–34

        Product tshirt = new Product();
        tshirt.setName("T-Shirt");
        tshirt.setDescription("Cotton t-shirt, comfortable everyday wear.");
        tshirt.setImageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400");
        tshirt.setPrice(19.99);
        tshirt.setCategory(clothing);
        tshirt.setQuantity((long) (random.nextInt(100) + 20)); // random 20–119

        Product jeans = new Product();
        jeans.setName("Jeans");
        jeans.setDescription("Classic denim jeans with slim fit.");
        jeans.setImageUrl("https://images.unsplash.com/photo-1542272604-787c3835535d?w=400");
        jeans.setPrice(49.99);
        jeans.setCategory(clothing);
        jeans.setQuantity((long) (random.nextInt(80) + 10)); // random 10–89

        Product blender = new Product();
        blender.setName("Blender");
        blender.setDescription("High-speed blender for smoothies and more.");
        blender.setImageUrl("https://images.unsplash.com/photo-1585515320310-259814833e62?w=400");
        blender.setPrice(89.99);
        blender.setCategory(home);
        blender.setQuantity((long) (random.nextInt(40) + 5)); // random 5–44

        productrepo.saveAll(List.of(phone, laptop, tshirt, jeans, blender));

    }


}
