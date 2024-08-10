export class PillowcaseModel {
  constructor() {
    this.pillowcaseSrcs = {
      azure: [
        azureMain,
        azureSecondary,
        azureTertiary,
      ],
      white: [
        whiteQueenPrimary,
        whiteQueenSecondary,
        whiteQueenTertiary,
      ],
      niceWhite: [
        whiteFancyPrimary,
        whiteFancySecondary,
        whiteFancyTertiary,
      ],
      seashell: [
        seashellPrimary,
        seashellSecondary,
        seashellTertiary,
      ],
      seabreeze: [
        seabreezePrimary,
        seabreezeSecondary,
        seabreezeTertiary,
      ],
      pink: [
        pinkPrimary,
        pinkSecondary,
        pinkTertiary,
      ],
      coral: [
        coralPrimary,
        coralSecondary,
        coralTertiary,
      ],
      petal: [
        petalPrimary,
        petalSecondary,
        petalTertiary,
      ],
      // ... other colors
    };
    this.currentSelectedButtons = {
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eighth: null,
    };
  }

  getImagesByColor(color) {
    return this.pillowcaseSrcs[color] || [];
  }

  getSelectedButton(containerKey) {
    return this.currentSelectedButtons[
      containerKey
    ];
  }

  setSelectedButton(containerKey, button) {
    this.currentSelectedButtons[containerKey] =
      button;
  }
}
