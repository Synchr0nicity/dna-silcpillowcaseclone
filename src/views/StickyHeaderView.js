export class StickyHeaderView {
  constructor(stickyAnchor, header, placeholder) {
    this.stickyAnchor = stickyAnchor;
    this.header = header;
    this.placeholder = placeholder;

    this.createObserver();
  }
  createObserver() {
    if (
      this.stickyAnchor &&
      this.header &&
      this.placeholder
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.header.classList.remove(
                "sticky"
              );
              this.placeholder.style.display =
                "none";
              this.placeholder.style.height = "0";
            } else {
              this.header.classList.add("sticky");
              this.placeholder.style.display =
                "block";
              this.placeholder.style.height = `80px`;
            }
          });
        },
        { threshold: [0] }
      );
      observer.observe(this.stickyAnchor);
    } else {
      console.error(
        "Sticky anchor, navigation, or placeholder element not found."
      );
    }
  }
}
