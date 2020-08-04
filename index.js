async function myFunction(id, name) {
  const data = await (
    await fetch(
      `https://raw.githubusercontent.com/vhnam/sample-music/master/${id}.json`
    )
  ).json();

  // console.log(data);

  let contentCategory = document.getElementById("content-category");
  document.querySelector("#content-category").innerHTML = "";
  let categoryLenght = "";
  categoryLenght += `<div class="content-category__wrap">
  <div class="content-category__name">${name}</div>
  <div class="content-category__number">
    <i class="fab fa-spotify"></i>
    <span>${data.total}</span>
  </div>
</div>
<hr class="content-category__line" />`;
  contentCategory.insertAdjacentHTML("beforeend", categoryLenght);

  let content = "";
  data.items.forEach((item) => {
    let artists = [];
    const musicList = document.querySelector("#content-category");

    item.track.artists.forEach((artist) => {
      artists.push(artist.name);
    });
    content += `
    <div class="music-item">
    <div class="music-item__wrap"><img  src="${
      item.track.album.images[0]?.url
    }"  class="music-item__img"></img>
    <div class="music-item__infor">
        <div class="music-item__songname">${item.track.album.name}</div>
        <div class="music-item__singer">${artists.join()}</div>
    </div></div>
    <div class="music-item__timeplay">

    </div>
</div> 
<hr class="music__line">`;
    musicList.insertAdjacentHTML("beforeend", content);
    content = "";
  });

  document.querySelector(`#header-category-${id} img`).style.filter = "none";
}

window.addEventListener("load", async () => {
  const { items } = await (
    await fetch(
      "https://raw.githubusercontent.com/vhnam/sample-music/master/playlists.json"
    )
  ).json();
  const musicCategory = document.querySelector("#header-category");

  // console.log(items);

  let header = "";
  items.forEach(({ images, name, id }) => {
    header += `<div onclick="myFunction('${id}', '${name}')"  id="header-category-${id}" data-id=${id} class="header-category__musickind">
    <img src="${images[0].url}" alt="${name}" class="header-category__img"></img>
    <p class="header-category__name">${name}</p>
</div>`;

    musicCategory.insertAdjacentHTML("beforeend", header);
    header = "";
  });
});
