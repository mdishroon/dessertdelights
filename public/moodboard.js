let zIndexCounter = 10;

window.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("imageUpload");
  const moodboardArea = document.getElementById("moodboardArea");
  const bgPicker = document.getElementById("bgColorPicker");
  const moodboardSize = document.getElementById("moodboardSize");
  const imageBankGrid = document.getElementById("imageBankGrid");
  const zoomLevel = document.getElementById("zoomLevel");

  const recipeImages = [
    { file: "lavacake.png", label: "Chocolate Lava Cake" },
    { file: "nobakecheese.jpg", label: "No-Bake Cheesecake" },
    { file: "classictiramisu.jpg", label: "Classic Tiramisu" },
    { file: "strawberryshortcake.jpg", label: "Strawberry Shortcake" },
    { file: "peanutbuttercups.PNG", label: "Peanut Butter Cups" },
    { file: "neworleans.jpg", label: "New Orleans-Style Beignets" },
    { file: "redvelvetpizookie.jpg", label: "Red Velvet Pizookies" },
    { file: "cakeroll.jpg", label: "Chocolate Strawberry Cake Rolls" },
    { file: "moussecake.jpg", label: "Chocolate Raspberry Mousse Cake" },
    { file: "donut.jpg", label: "S’mores Donut" },
    { file: "caramelcupcake.jpg", label: "Salted Caramel Chocolate Cupcakes" },
    { file: "tiramisu.PNG", label: "Chocolate Cream & Cherries Tiramisu" },
    { file: "macarons.PNG", label: "Raspberry Macarons" },
    { file: "greycreme.jpg", label: "Earl Grey Creme Brulee" },
    { file: "biscofftruffles.jpg", label: "Biscoff Truffles" }
  ];

  moodboardArea.style.backgroundColor = "#ffffff";
  bgPicker.value = "#ffffff";

  zoomLevel.addEventListener("change", updateMoodboardSize);

  function detectZoomChange() {
    const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
    const warning = document.getElementById("zoomWarning");
    warning.style.display = zoom !== 100 ? "block" : "none";
  }

  setInterval(() => {
    const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
    const warning = document.getElementById("zoomWarning");
    warning.style.display = zoom !== 100 ? "block" : "none";
  }, 1000);
  

  window.addEventListener("resize", detectZoomChange);
  window.addEventListener("load", detectZoomChange);

  bgPicker.addEventListener("input", () => {
    moodboardArea.style.backgroundColor = bgPicker.value;
  });

  let baseWidth = 1000;
  let baseHeight = 700;
  
  function applyMoodboardSize() {
    switch (moodboardSize.value) {
      case "portrait-small":
        baseWidth = 600;
        baseHeight = 800;
        break;
      case "portrait-medium":
        baseWidth = 700;
        baseHeight = 1000;
        break;
      case "portrait-large":
        baseWidth = 900;
        baseHeight = 1200;
        break;
      case "landscape-small":
        baseWidth = 800;
        baseHeight = 600;
        break;
      case "landscape-medium":
        baseWidth = 1000;
        baseHeight = 700;
        break;
      case "landscape-large":
        baseWidth = 1200;
        baseHeight = 900;
        break;
    }
  
    updateMoodboardSize();
  }

  function updateMoodboardSize() {
    const zoom = parseFloat(zoomLevel.value);
    moodboardArea.style.width = `${baseWidth * zoom}px`;
    moodboardArea.style.height = `${baseHeight * zoom}px`;
  }
  
  applyMoodboardSize();
  moodboardSize.addEventListener("change", applyMoodboardSize);

  uploadInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        createMoodboardImage(e.target.result);
      };
      reader.readAsDataURL(file);
    });
    uploadInput.value = '';
  });

  function createMoodboardImage(src) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("moodboard-image");
    wrapper.style.left = Math.random() * 60 + "%";
    wrapper.style.top = Math.random() * 60 + "%";
    wrapper.style.width = "200px";
    wrapper.style.height = "200px";
  
    const img = document.createElement("img");
    img.src = src;
    img.draggable = false;
  
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "✖";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      wrapper.remove();
    });
  
    const handle = document.createElement("div");
    handle.classList.add("resize-handle");
  
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(img);
    wrapper.appendChild(handle);
    moodboardArea.appendChild(wrapper);
  
    makeDraggable(wrapper);
  
    wrapper.addEventListener("mousedown", () => bringToFront(wrapper));
  }  

  function makeDraggable(el) {
    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY, startX, startY, startWidth, startHeight;
  
    el.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
  
      bringToFront(el);
  
      if (e.target.classList.contains("resize-handle")) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = el.offsetWidth;
        startHeight = el.offsetHeight;
      } else {
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
      }
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      } else if (isResizing) {
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        el.style.width = `${Math.max(100, newWidth)}px`;
        el.style.height = `${Math.max(100, newHeight)}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
      isResizing = false;
    });
  }  

  function bringToFront(target) {
    zIndexCounter++;
    target.style.zIndex = zIndexCounter;
  }

  document.getElementById("addTextBtn").addEventListener("click", () => {
    const textValue = document.getElementById("textInput").value.trim();
    const color = document.getElementById("textColor").value;
    const size = document.getElementById("fontSize").value;
    const font = document.getElementById("fontFamily").value;
  
    if (!textValue) return;
  
    const wrapper = document.createElement("div");
    wrapper.classList.add("moodboard-text");
    wrapper.style.color = color;
    wrapper.style.fontSize = `${size}px`;
    wrapper.style.fontFamily = font;
    wrapper.textContent = textValue;
    wrapper.style.left = Math.random() * 60 + "%";
    wrapper.style.top = Math.random() * 60 + "%";
  
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "✖";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      wrapper.remove();
    });
  
    wrapper.appendChild(deleteBtn);
    moodboardArea.appendChild(wrapper);
  
    makeDraggable(wrapper);
    bringToFront(wrapper);
  });
  

  document.getElementById("downloadBtn").addEventListener("click", () => {
    const elementsToHide = moodboardArea.querySelectorAll(".delete-btn, .resize-handle");
    elementsToHide.forEach(el => el.style.display = "none");

    const originalTransform = moodboardArea.style.transform;
    moodboardArea.style.transform = "none";
    const originalBoxShadow = moodboardArea.style.boxShadow;
    moodboardArea.style.boxShadow = "none";

    const bgColor = window.getComputedStyle(moodboardArea).backgroundColor;

    htmlToImage.toPng(moodboardArea, {
      backgroundColor: bgColor,
      pixelRatio: 3
    })
    .then((dataUrl) => {
      elementsToHide.forEach(el => el.style.display = "");
      moodboardArea.style.boxShadow = originalBoxShadow;
      moodboardArea.style.transform = originalTransform;

      const link = document.createElement("a");
      link.download = "my-moodboard.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error("Export failed:", error);
      alert("Something went wrong during export!");
    });
  });

  recipeImages.forEach(item => {
    const container = document.createElement("div");
    container.classList.add("image-bank-item");

    const img = document.createElement("img");
    img.src = `images/${item.file}`;
    img.alt = item.label;
    img.title = item.label;

    const caption = document.createElement("p");
    caption.innerText = item.label;

    img.addEventListener("click", () => {
      createMoodboardImage(img.src);
    });

    container.appendChild(img);
    container.appendChild(caption);
    imageBankGrid.appendChild(container);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    const confirmReset = confirm("Are you sure you want to clear your entire moodboard?");
    if (confirmReset) {
      moodboardArea.innerHTML = "";
    }
  });

  detectZoomChange();

});
