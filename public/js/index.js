(() => {
  if (!window.location.hash && !localStorage.getItem("token")) {
    document.getElementById("login").style.display = "bloack";
    document.getElementsByClassName("button-container")[0].style.display =
      "none";
  } else {
    if (!localStorage.getItem("token")) {
      let accessToken = window.location.hash
        .split("&")[0]
        .replace("#access_token=", "");
      window.location.hash = "";

      localStorage.setItem("token", accessToken);
    }
    document.getElementById("login").style.display = "none";
    document.getElementsByClassName("button-container")[0].style.display =
      "block";
  }
})();

const getTracks = () => {
  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/me/top/tracks",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  }).then(resp => {
    let tracksDiv = document.createElement("div");
    tracksDiv.classList.add("tracks");

    resp.items.map(t => {
      let trackDiv = document.createElement("div");
      trackDiv.classList.add("track", "col-md-4");

      let p = document.createElement("p");
      p.append(t.name);
      let img = document.createElement("img");
      let audio = document.createElement("audio");
      audio.setAttribute("controls", "controls");
      trackDiv.append(p);

      trackDiv.append(img);
      trackDiv.append(audio);

      tracksDiv.append(trackDiv);
    });

    document.getElementsByClassName("container")[0].append(tracksDiv);

    let imgTags = document.getElementsByTagName("img");

    for (let i = 0; i < imgTags.length; i++) {
      imgTags[i].src = resp.items[i].album.images[0].url;
    }

    let audioTags = document.getElementsByTagName("audio");

    for (let i = 0; i < audioTags.length; i++) {
      audioTags[i].src = resp.items[i].preview_url;
    }
  });
};
