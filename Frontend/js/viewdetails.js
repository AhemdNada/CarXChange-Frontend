// images big and small scroll
document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    let activeIndex = 0;
  
    const getFileName = (src) => src.split("/").pop();
  
    const mainFileName = getFileName(mainImage.getAttribute("src"));
    thumbnails.forEach((thumb, index) => {
      const thumbFile = getFileName(thumb.getAttribute("src"));
      if (thumbFile === mainFileName) {
        activeIndex = index;
      }
    });
  
    function updateActive(index) {
      activeIndex = index;
  
      mainImage.src = thumbnails[activeIndex].src;
  
      thumbnails.forEach(thumb => {
        thumb.classList.remove("ring-2", "ring-blue-500");
      });
      thumbnails[activeIndex].classList.add("ring-2", "ring-blue-500");
  
      thumbnails[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        updateActive(index);
      });
    });
  
    nextBtn.addEventListener("click", () => {
      const nextIndex = (activeIndex + 1) % thumbnails.length;
      updateActive(nextIndex);
    });
  
    prevBtn.addEventListener("click", () => {
      const prevIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
      updateActive(prevIndex);
    });
  
    updateActive(activeIndex);
  });
  

