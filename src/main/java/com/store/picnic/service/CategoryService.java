package com.store.picnic.service;

import com.store.picnic.model.Category;
import com.store.picnic.repository.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepo categoryrepository;

    public CategoryService(CategoryRepo categoryrepository) {
        this.categoryrepository = categoryrepository;
    }

    public List<Category> getAllCategories() {
        return categoryrepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryrepository.save(category);
    }
}
