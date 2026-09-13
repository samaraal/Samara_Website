// Additional inauguration photographs for the homepage slideshow.
// These are kept separate so future additions do not disturb the original slides.
(() => {
  const slider = document.querySelector('[data-inauguration-slider]');
  const dots = document.querySelector('.inauguration-slider-dots');
  if (!slider || !dots) return;

  const extraSlides = [
    {
      src: './assets/inauguration/20-akila-lamp-lighting.jpg',
      alt: 'Akila lighting the traditional lamp at Samara Assisted Living',
      caption: 'Traditional lamp lighting – Akila'
    },
    {
      src: './assets/inauguration/21-akila-lamp-lighting-2.jpg',
      alt: 'Akila during the traditional lamp lighting at Samara Assisted Living',
      caption: 'Traditional lamp lighting – Akila'
    },
    {
      src: './assets/inauguration/22-rajee-elango-family.jpg',
      alt: 'Rajee Elango with family at the Samara inauguration',
      caption: 'Rajee Elango with family'
    },
    {
      src: './assets/inauguration/23-velan-rajee-lamp-lighting.jpg',
      alt: 'Velan Rajee lighting the traditional lamp at Samara Assisted Living',
      caption: 'Traditional lamp lighting – Velan Rajee'
    },
    {
      src: './assets/inauguration/24-malan-lamp-lighting.jpg',
      alt: 'Malan lighting the traditional lamp at Samara Assisted Living',
      caption: 'Traditional lamp lighting – Malan'
    }
  ];

  const nextButton = slider.querySelector('.next');
  extraSlides.forEach((photo, index) => {
    const figure = document.createElement('figure');
    figure.className = 'inauguration-slide';
    figure.innerHTML = `<img alt="${photo.alt}" loading="lazy" src="${photo.src}"><figcaption>${photo.caption}</figcaption>`;
    slider.insertBefore(figure, nextButton);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show photograph ${20 + index}`);
    dots.appendChild(dot);
  });
})();
