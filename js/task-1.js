const categories = document.querySelectorAll('#categories>li');
console.log(`Number of categories: ${categories.length}`);

categories.forEach(category => {
    const categoryName = category.firstElementChild.textContent.trim();
    const categoryList = category.querySelector("ul");
    const Elements = categoryList ? categoryList.children.length : 0;
    console.log("Category:", `${categoryName}`);
    console.log("Elements:", `${Elements}`);
});