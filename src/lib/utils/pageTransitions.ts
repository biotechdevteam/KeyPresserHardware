function fadeInOut() {
  document.documentElement.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 500,
    easing: "ease-in-out",
    fill: "forwards",
    pseudoElement: "::view-transition-old(root)",
  });

  document.documentElement.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 500,
    easing: "ease-in-out",
    fill: "forwards",
    pseudoElement: "::view-transition-new(root)",
  });
}

function slideInOut() {
  document.documentElement.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
    {
      duration: 500,
      easing: "ease-in-out",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
    {
      duration: 500,
      easing: "ease-in-out",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

function slideFadeInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translate(0, 0)",
      },
      {
        opacity: 0,
        transform: "translate(-100px, 0)",
      },
    ],
    {
      duration: 500,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: "translate(100px, 0)",
      },
      {
        opacity: 1,
        transform: "translate(0, 0)",
      },
    ],
    {
      duration: 500,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

export { fadeInOut, slideInOut, slideFadeInOut };
