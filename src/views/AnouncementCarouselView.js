export class AnouncementCarouselView {
  constructor(anouncements, carouselContainer) {
    this.anouncements = anouncements;
    this.carouselContainer = carouselContainer;
    this.currentSlide = 0;

    this.intervalAnouncement = setInterval(() => {
      this.run();
    }, 6000);
  }

  run() {
    this.currentSlide++;

    this.changeAnouncement();
  }

  changeAnouncement() {
    if (
      this.currentSlide >
      this.anouncements.length - 1
    ) {
      this.currentSlide = 0;
    } else if (this.currentSlide < 0) {
      this.currentSlide =
        this.anouncements.length - 1;
    }

    this.carouselContainer.style.transform = `translateX(${
      -this.currentSlide * 1430
    }px)`;
  }
}
