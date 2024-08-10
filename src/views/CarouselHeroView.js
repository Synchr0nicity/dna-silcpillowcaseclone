export class CarouselHeroView {
  constructor(hero1Images, hero1Container) {
    this.hero1Images = hero1Images;
    this.hero1Container = hero1Container;
    this.currentSlide = 0;
    this.init();
  }

  init() {
    this.hero1Container.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaX !== 0) {
          e.preventDefault();
        }
      }
    );

    this.startInterval();
  }

  updateSlide() {
    if (this.hero1Images.length > 0) {
      this.hero1Container.style.transform = `translateX(${
        -this.currentSlide * 100
      }vw)`;
    }
  }

  startInterval() {
    this.intervalHero = setInterval(() => {
      this.currentSlide =
        (this.currentSlide + 1) %
        this.hero1Images.length;
      this.updateSlide();
    }, 5000);
  }
}
