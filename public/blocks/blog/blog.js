fetch('./data/blog-metadata.json') // atau IPFS fetch
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("blog-canvas");
    data.posts.forEach(post => {
      const div = document.createElement("div");
      div.classList.add("blog-block");

      div.innerHTML = `
        <img src="${post.image}" alt="${post.title}" />
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <a href="${post.link}" class="btn">Baca Selengkapnya</a>
      `;

      container.appendChild(div);
    });
  });
