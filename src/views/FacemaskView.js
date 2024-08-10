export class FacemaskView {
  constructor() {
    this.buttons = {
      1: document.querySelectorAll(
        ".fmbutton-container-1 button"
      ),
      2: document.querySelectorAll(
        ".fmbutton-container-2 button"
      ),
      3: document.querySelectorAll(
        ".fmbutton-container-3 button"
      ),
      4: document.querySelectorAll(
        ".fmbutton-container-4 button"
      ),
      5: document.querySelectorAll(
        ".fmbutton-container-5 button"
      ),
      6: document.querySelectorAll(
        ".fmbutton-container-6 button"
      ),
      7: document.querySelectorAll(
        ".fmbutton-container-7 button"
      ),
      8: document.querySelectorAll(
        ".fmbutton-container-8 button"
      ),
    };
    this.events = {};
  }

  getButtonContainers() {
    return this.buttons;
  }

  getImageElements(containerKey) {
    return document.querySelectorAll(
      `.FMimg-el-container-${containerKey} img`
    );
  }

  updateImages(images, srcs) {
    images.forEach((image, index) => {
      if (srcs[index]) {
        image.src = srcs[index];
      }
    });
  }

  toggleButtonBorder(button, add) {
    if (add) {
      button.classList.add("color-div-border");
    } else {
      button.classList.remove("color-div-border");
    }
  }

  bindButtonClick(handler) {
    Object.entries(this.buttons).forEach(
      ([containerKey, buttonContainer]) => {
        buttonContainer.forEach((button) => {
          button.addEventListener("click", () => {
            handler(button, containerKey);
          });
        });
      }
    );
  }

  // Publisher-Subscriber methods
  subscribe(event, handler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((handler) =>
        handler(data)
      );
    }
  }
}
