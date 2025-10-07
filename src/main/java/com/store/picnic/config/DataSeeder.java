package com.store.picnic.config;

import com.store.picnic.model.Category;
import com.store.picnic.model.Product;
import com.store.picnic.repository.CategoryRepo;
import com.store.picnic.repository.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

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

        Product phone = new Product();
        phone.setName("Smartphone");
        phone.setDescription("Latest model smartphone with high-resolution camera.");
        phone.setImageUrl("");
        phone.setPrice(699.99);
        phone.setCategory(electronics);

        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setDescription("Lightweight laptop with long battery life.");
        laptop.setImageUrl("");
        laptop.setPrice(1099.99);
        laptop.setCategory(electronics);

        Product tshirt = new Product();
        tshirt.setName("T-Shirt");
        tshirt.setDescription("Cotton t-shirt, comfortable everyday wear.");
        tshirt.setImageUrl("");
        tshirt.setPrice(19.99);
        tshirt.setCategory(clothing);

        Product jeans = new Product();
        jeans.setName("Jeans");
        jeans.setDescription("Classic denim jeans with slim fit.");
        jeans.setImageUrl("");
        jeans.setPrice(49.99);
        jeans.setCategory(clothing);

        Product blender = new Product();
        blender.setName("Blender");
        blender.setDescription("High-speed blender for smoothies and more.");
        blender.setImageUrl("");
        blender.setPrice(89.99);
        blender.setCategory(home);

        productrepo.saveAll(List.of(phone, laptop, tshirt, jeans, blender));


    }


}
