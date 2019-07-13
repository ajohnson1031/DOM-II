class Block {
  constructor(element, i) {
    this.element = element;
    this.blocks = document.querySelectorAll(".block");
    this.element.style.order = 0;
    this.element.style.position = "relative";
    this.element.style.left = 0;
    this.myInterval;
    this.time = 0;
    this.maxTime = 125;
    this.element.addEventListener("click", this.rocket.bind(this));
    this.element.addEventListener("mousedown", this.traveler.bind(this));
    document.addEventListener("mouseup", this.reverseTraveler.bind(this));
  }

  rocket(e) {
    e.stopImmediatePropagation();
    this.blocks.forEach(b => {
      b.style.order = (Number(b.style.order) + 1).toString();
    });
    this.element.style.order = 0;
  }

  traveler(e) {
    e.stopImmediatePropagation();

    clearInterval(this.myInterval);
    this.myInterval = setInterval(() => {
      this.time++;

      if (this.time >= this.maxTime) {
        this.time = this.maxTime;
        if (this.element.style.left.split("px")[0] <= 500) {
          this.element.style.left = `${Number(
            this.element.style.left.split("px")[0]
          ) + 1}px`;
        }
      }
    }, 1);
  }

  reverseTraveler() {
    clearInterval(this.myInterval);
    this.myInterval = setInterval(() => {
      if (this.element.style.left === "0px") {
        clearInterval(this.myInterval);
        this.time = 0;
      } else {
        this.element.style.left = `${Number(
          this.element.style.left.split("px")[0]
        ) - 1}px`;
      }
    }, 1);
  }
}

const blocks = document
  .querySelectorAll(".block")
  .forEach((b, i) => (b = new Block(b, i)));
