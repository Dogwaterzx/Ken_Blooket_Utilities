if (!blooketUtility.prefs.customMaps) {
  blooketUtility.prefs.customMaps = {
    title: "Custom Maps",
    description: "Custom tower defense maps",
    value: {
      islands: {
        title: "Islands (Ken)",
        description:
          "A custom map created by Ken. Will load into the Sunny Meadows map slot.",
        value: false,
      },
      volatileVolcano: {
        title: "Volatile Volcano (Ken)",
        description:
          "A custom map created by Ken. Will load into the Abandoned Mine map slot.",
        value: false,
      },
    },
  };
}
if (!blooketUtility.prefs.customMaps.value.yoshiMeadow) {
  blooketUtility.prefs.customMaps.value.yoshiMeadow = {
    title: "Yoshi Meadow",
    description:
      "A custom map created by Ken. Will load into the Sunny Meadows map slot.",
    value: false,
  };
}
if (
  blooketUtility.prefs.customMaps.value.yoshiMeadow.title !==
  "Yoshi Meadow (Ken)"
)
  blooketUtility.prefs.customMaps.value.yoshiMeadow.title =
    "Yoshi Meadow (Ken)";
