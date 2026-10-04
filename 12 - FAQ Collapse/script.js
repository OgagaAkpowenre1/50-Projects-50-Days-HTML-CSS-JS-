const faqList = document.querySelectorAll(".faq");

faqList.forEach((faq) => {
  faq.addEventListener("click", () => {
    if (faq.classList.contains("active")) {
      faq.classList.remove("active");
    } else {
      faq.classList.add("active");
    }
  });
});
