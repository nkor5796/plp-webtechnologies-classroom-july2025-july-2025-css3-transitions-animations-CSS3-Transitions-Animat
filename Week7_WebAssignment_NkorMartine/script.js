document.getElementById('animation-builder-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('animation-name').value || 'customAnimation';
  const duration = document.getElementById('animation-duration').value || 1;
  const type = document.getElementById('animation-type').value;
  const trigger = document.getElementById('trigger-type').value;

  const preview = document.getElementById('preview-element');
  preview.className = "w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"; // reset

  // Map types to existing classes
  const animationMap = {
    fade: "fade-in",
    slide: "slide-in-up",
    rotate: "rotate-360",
    scale: "pulse",
    bounce: "bounce",
    shake: "shake",
    flip: "flip"
  };

  const chosenClass = animationMap[type];

  // Handle triggers
  if (trigger === "load") {
    preview.style.setProperty('--base-duration', duration + 's');
    preview.classList.add(chosenClass);
  } else if (trigger === "hover") {
    preview.onmouseenter = () => {
      preview.style.setProperty('--base-duration', duration + 's');
      preview.classList.add(chosenClass);
    };
  } else if (trigger === "click") {
    preview.onclick = () => {
      preview.style.setProperty('--base-duration', duration + 's');
      preview.classList.add(chosenClass);
    };
  } else if (trigger === "submit") {
    // replay when form is submitted
    preview.style.setProperty('--base-duration', duration + 's');
    preview.classList.add(chosenClass);
  }

  // Output the generated CSS
  const cssOutput = `
@keyframes ${name} {
  /* define your ${type} keyframes here */
}
.${name} {
  animation: ${name} ${duration}s ease forwards;
}`;
  document.getElementById('generated-css').textContent = cssOutput;
  Prism.highlightAll();
});
