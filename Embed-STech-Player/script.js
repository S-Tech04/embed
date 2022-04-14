const wrapper = document.querySelector(".wrapper"),
  src = wrapper.querySelector(".form .src"),
  thumbnail = wrapper.querySelector(".form .thumbnail"),
  generateCode = wrapper.querySelector(".form button.subBtn"),
  progressColor = wrapper.querySelector(".form #progressColor"),
  controlsColor = wrapper.querySelector(".form #controlsColor"),
  previewBtn = wrapper.querySelector(".form .btn.preBtn"),
  addtrack = wrapper.querySelector(".form .btn.trBtn");
const iframe = document.querySelector("iframe");
const form = wrapper.querySelector("form");
// generateCode = wrapper.querySelector(".form button");
String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    return s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";";
  });
};

function addNew() {
  addtrack.insertAdjacentHTML(
    "beforebegin",
    `<div class="subtitles">
      <label>
          Subtitles <i class="fa-solid fa-xmark close"></i>
      </label>
      <input type="text" placeholder="https://example.com/subtitle.vtt" class="src" required/>
      <input type="text" placeholder="Kind" value="subtitle" class="kind" required/>
      <input type="text" placeholder="Label" class="label" required/>
      <input type="text" placeholder="en" class="srclang" required/>
  </div>`
  );
  close();
}
addtrack.addEventListener("click", addNew);

function fun() {
  let subtitles2 = new Set();
  let subtitles = document.querySelectorAll(".subtitles");
  let links2 = src.value.split(",");
  let sources = links2;
  for (let i = 0; i < subtitles.length; i++) {
    let src = subtitles[i].querySelector(".src").value;
    let kind = subtitles[i].querySelector(".kind").value;
    let label = subtitles[i].querySelector(".label").value;
    let srclang = subtitles[i].querySelector(".srclang").value;
    subtitles2.add(createObject(src, kind, label, srclang));
  }
  let controls = [
    {
      poster: thumbnail.value,
      color: controlsColor.value,
      progressColor: progressColor.value,
    },
  ];

  const embed = createEmbed(sources, subtitles2, controls);
  const embeded = window.btoa(JSON.stringify(embed));
  return embeded;
}

function close() {
  var closeBtn = document.querySelectorAll(".close");
  closeBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.target.parentNode.parentNode.remove();
    });
});
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let code = fun();
  let video_preview = document.querySelector(".video_preview");
  let iframe_p_html = `<div class="iframe_code">
  <label>
    Copy Code <i class="fa-solid fa-xmark close"></i>
  </label>
  <pre></pre>
</div>`;
  video_preview.insertAdjacentHTML("afterend", iframe_p_html);
  const getCode = document.querySelector(".iframe_code pre");
  let html = `<iframe src="https://s-tech04.github.io/embed/index.html?v=${code}"frameborder="0" width="720" height="400"></iframe>`;
  getCode.innerHTML = html.toHtmlEntities();
  getCode.parentNode.style.display = "flex";
  close();
});

function preview() {
  let embeded = fun();
  iframe.src = `https://s-tech04.github.io/embed/index.html?v=${embeded}`;
  iframe.parentNode.style.display = "flex";
}

previewBtn.addEventListener("click", preview);

function createEmbed([...sources], [...subtitle], [...controls]) {
  const j = {};
  j.sources = [...sources];
  j.subtitles = [...subtitle];
  j.controls = [...controls];
  return j;
}
function createObject(src, kind, label, srclang) {
  const k = {};
  k.src = src;
  k.kind = kind;
  k.label = label;
  k.srclang = srclang;
  return k;
}
