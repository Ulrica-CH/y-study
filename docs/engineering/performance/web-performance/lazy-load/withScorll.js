const imgList = document.querySelectorAll("[data-lazyload]");

window.addEventListener("scroll", () => {
  imgList.forEach((img) => {
    if (img.getAttribute("data-loaded")) return;

    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      img.src = img.getAttribute("data-src");
      img.setAttribute("data-loaded", "true");
    }
  });
});

// <img data-lazyload data-src="/example-image.jpg" />