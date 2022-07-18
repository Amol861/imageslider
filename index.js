const imageSource = [
    "https://images.pexels.com/photos/12715975/pexels-photo-12715975.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/12310381/pexels-photo-12310381.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/12383337/pexels-photo-12383337.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",

  ];
  
  const main = () => {
    const slider = document.getElementById("slider");
    const left = document.getElementById("left");
    const right = document.getElementById("right");
    const dots = document.getElementById("dots");
  
    const len = imageSource.length;
  
    const index = {
      left: len - 1,
      active: 0,
      right: 1,
    };
  
    const elements = [];
  
    let activeDot = null;
  
    const setActiveDot = (index) => {
      activeDot?.classList.remove("active");
      activeDot = dots.childNodes[index];
      activeDot.classList.add("active");
    };
  
    const animate = (el, animation) => {
      el.classList.add(animation);
  
      setTimeout(() => el.classList.remove(animation), 500);
    };
  
    const slide = {
      left: () => {
        elements[index.right].classList.remove("right");
  
        index.right = index.active;
        index.active = index.left;
        index.left = (index.left + len - 1) % len;
  
        elements[index.right].classList.remove("active");
        elements[index.right].classList.add("right");
        animate(elements[index.right], "exit-right");
  
        elements[index.active].classList.remove("left");
        elements[index.active].classList.add("active");
        animate(elements[index.active], "enter-left");
  
        elements[index.left].classList.add("left");
  
        setActiveDot(index.active);
      },
      right: () => {
        elements[index.left].classList.remove("left");
  
        index.left = index.active;
        index.active = index.right;
        index.right = (index.right + 1) % len;
  
        elements[index.left].classList.remove("active");
        elements[index.left].classList.add("left");
        animate(elements[index.left], "exit-left");
  
        elements[index.active].classList.remove("right");
        elements[index.active].classList.add("active");
        animate(elements[index.active], "enter-right");
  
        elements[index.right].classList.add("right");
  
        setActiveDot(index.active);
      },
    };
  
    imageSource.forEach((src, i) => {
      const img = document.createElement("img");
      const dot = document.createElement("span");
  
      img.src = src;
      img.classList.add("slider-img");
      img.id = "slider-img";
      dot.classList.add("dot");
  
      slider.appendChild(img);
      dots.appendChild(dot);
      elements.push(img);
  
      if (i === index.left) img.classList.add("left");
      if (i === index.right) img.classList.add("right");
      if (i === index.active) {
        img.classList.add("active");
        setActiveDot(i);
      }
    });
  
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
          slide.right();
          break;
        case "ArrowLeft":
          slide.left();
          break;
      }
    });
  
    left.addEventListener("click", slide.left);
    right.addEventListener("click", slide.right);
  };
  
  document.addEventListener("DOMContentLoaded", main);