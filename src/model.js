import { images, FMImages } from "./images.js";

export class PillowcaseModel {
  constructor() {
    this.pillowcaseSrcs = {
      azure: [
        images.azure.primary,
        images.azure.secondary,
        images.azure.tertiary,
      ],
      whiteNormal: [
        images.whiteNormal.primary,
        images.whiteNormal.secondary,
        images.whiteNormal.tertiary,
      ],
      whiteFancy: [
        images.whiteFancy.primary,
        images.whiteFancy.secondary,
        images.whiteFancy.tertiary,
      ],
      seashell: [
        images.seashell.primary,
        images.seashell.secondary,
        images.seashell.tertiary,
      ],
      seabreeze: [
        images.seabreeze.primary,
        images.seabreeze.secondary,
        images.seabreeze.tertiary,
      ],
      pink: [
        images.pink.primary,
        images.pink.secondary,
        images.pink.tertiary,
      ],
      coral: [
        images.coral.primary,
        images.coral.secondary,
        images.coral.tertiary,
      ],
      petal: [
        images.petal.primary,
        images.petal.secondary,
        images.petal.tertiary,
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

export class FacemaskModel {
  constructor() {
    this.facemaskSrcs = {
      aquarius: [
        FMImages.aquarius.primary,
        FMImages.aquarius.secondary,
        FMImages.aquarius.tertiary,
      ],
      pisces: [
        FMImages.pisces.primary,
        FMImages.pisces.secondary,
        FMImages.pisces.tertiary,
      ],
      aries: [
        FMImages.aries.primary,
        FMImages.aries.secondary,
        FMImages.aries.tertiary,
      ],
      taurus: [
        FMImages.taurus.primary,
        FMImages.taurus.secondary,
        FMImages.taurus.tertiary,
      ],
      gemini: [
        FMImages.gemini.primary,
        FMImages.gemini.secondary,
        FMImages.gemini.tertiary,
      ],
      cancer: [
        FMImages.cancer.primary,
        FMImages.cancer.secondary,
        FMImages.cancer.tertiary,
      ],
      leo: [
        FMImages.leo.primary,
        FMImages.leo.secondary,
        FMImages.leo.tertiary,
      ],
      virgo: [
        FMImages.virgo.primary,
        FMImages.virgo.secondary,
        FMImages.virgo.tertiary,
      ],
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
    return this.facemaskSrcs[color] || [];
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
