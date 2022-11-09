console.log("KĀĀlĀĀ script initiated");

const url = ["https://kaalaa-app.herokuapp.com/", "http://localhost:5050/"];
const baseURL = url[0];
const auth = {
  username: "a2FhbGFhX2FjY2VzcyB1c2VybmFtZQ==",
  password: "a2FhbGFhX2FjY2VzcyBwYXNzd29yZA==",
};

const isMobile =
  navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i);
let images = [];
let activeImages = [];
let active = "";
let user = {};
const stopTime = `<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="5.5" stroke="white"/>
<path d="M8 5V8" stroke="white" stroke-linecap="round"/>
</svg>
`;
const moveTime = `<svg xmlns:svg="http://www.w3.org/2000/svg" 
xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink"
version="1.0" width="64px" height="64px" 
viewBox="0 0 128 128" xml:space="preserve" class="zoom-in-out-box">
<rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0)"/>
<g>
<path d="M63.88 0A63.88 63.88 0 1 1 0 63.88 63.88 63.88 0 0 1 63.88 0zm0 11.88a52 52 0 1 1-52 52 52 52 0 0 1 52-52zm0 46.2a5.8 5.8 0 1 1-5.8 5.8 5.8 5.8 0 0 1 5.8-5.8z" fill-rule="evenodd" fill="#FFFFFF"/>
<path d="M58.25 5h11.3v59h-11.3V5z" fill="#FFFFFF"/>
<animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="2880ms" repeatCount="indefinite"/>
</g>
</svg>`;
const reward = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="8" r="2.5" stroke="black"/>
<path d="M10.5248 1.81414C10.2332 1.52854 9.76679 1.52854 9.4752 1.81414L8.02577 3.23379L5.99702 3.25485C5.5889 3.25908 5.25908 3.5889 5.25485 3.99702L5.23379 6.02577L3.81414 7.4752C3.52854 7.76679 3.52854 8.23321 3.81414 8.5248L5.23379 9.97423L5.25485 12.003C5.25908 12.4111 5.5889 12.7409 5.99702 12.7452L8.02577 12.7662L9.4752 14.1859C9.76679 14.4715 10.2332 14.4715 10.5248 14.1859L11.9742 12.7662L14.003 12.7452C14.4111 12.7409 14.7409 12.4111 14.7452 12.003L14.7662 9.97423L16.1859 8.5248C16.4715 8.23321 16.4715 7.76679 16.1859 7.4752L14.7662 6.02577L14.7452 3.99702C14.7409 3.5889 14.4111 3.25908 14.003 3.25485L11.9742 3.23379L10.5248 1.81414Z" stroke="black" stroke-linejoin="round"/>
<path d="M7 12.5V18.5L10 17.0333M13 12.5V18.5L10 17.0333M10 17.0333V14.1667" stroke="black" stroke-linejoin="round"/>
</svg>
`;
const newReward = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 3V2C9 1.44772 9.44772 1 10 1C10.5523 1 11 1.44772 11 2C11 2.55228 10.5523 3 10 3H9ZM10 0C11.1046 0 12 0.895431 12 2C12 3.10457 11.1046 4 10 4H9H8H7H6C4.89543 4 4 3.10457 4 2C4 0.895431 4.89543 0 6 0C7.10457 0 8 0.895431 8 2C8 0.895431 8.89543 0 10 0ZM2.5 5C2.22386 5 2 5.22386 2 5.5V8H3L7.5 8V5H2.5ZM7.5 9H3V13.5C3 13.7761 3.22386 14 3.5 14H7.5V9ZM8.5 9H13V13.5C13 13.7761 12.7761 14 12.5 14H8.5V9ZM8.5 8V5H13.5C13.7761 5 14 5.22386 14 5.5V8H13H8.5ZM7 2V3H6C5.44772 3 5 2.55228 5 2C5 1.44772 5.44772 1 6 1C6.55228 1 7 1.44772 7 2Z" fill="white"/>
</svg>
`;
const rewardModal = `<svg width="96" height="96" viewBox="0 0 96 96" fill="rgba(0,0,0,0)" xmlns="http://www.w3.org/2000/svg">
<rect width="96" height="96" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M43 28V22C43 18.6863 40.3137 16 37 16C33.6863 16 31 18.6863 31 22C31 25.3137 33.6863 28 37 28H43ZM37 8C29.268 8 23 14.268 23 22C23 24.9745 23.9276 27.7323 25.5094 30H16C13.7909 30 12 31.7909 12 34V50C12 52.2091 13.7909 54 16 54L16 84C16 86.2091 17.7909 88 20 88H76C78.2091 88 80 86.2091 80 84V54C82.2091 54 84 52.2091 84 50V34C84 31.7909 82.2091 30 80 30H70.4906C72.0724 27.7323 73 24.9745 73 22C73 14.268 66.732 8 59 8C54.5381 8 50.5637 10.0873 48 13.3388C45.4363 10.0873 41.4619 8 37 8ZM20 38V46H44V38H20ZM52 38V46H76V38H52ZM44 56H24V80H44V56ZM52 80V56H72V80H52ZM53 22V28H59C62.3137 28 65 25.3137 65 22C65 18.6863 62.3137 16 59 16C55.6863 16 53 18.6863 53 22Z" fill="#222222"/>
</svg>
`;
const closeModal = `<svg id="kaalaa_claim_close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0111 6.05016L18.4807 6.58049L13.0613 11.9999L18.4807 17.4193L19.0111 17.9497L17.9504 19.0103L17.4201 18.48L12.0006 13.0606L6.58122 18.48L6.05089 19.0103L4.99023 17.9497L5.52056 17.4193L10.94 11.9999L5.52057 6.58049L4.99024 6.05016L6.0509 4.9895L6.58123 5.51983L12.0006 10.9392L17.4201 5.51983L17.9504 4.9895L19.0111 6.05016Z" fill="black"/>
</svg>
`;
const request_loader = `<div style="width: 232px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: white; display: block; shape-rendering: auto;" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#1d0e0b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"/>
</circle>
<!-- [ldio] generated by https://loading.io/ --></svg></div>`;

let current_reward = {};

const getMeta = async () => {
  let res;
  await fetch("https://geolocation-db.com/json/").then(async (e) => {
    await e.json().then((obj) => {
      res = obj;
    });
  });

  const meta = navigator.userAgent;

  const userMata = {
    ip: res?.IPv4,
    metaData: meta.replaceAll(" ", ""),
    location: { latitude: res?.latitude, longitude: res?.longitude },
  };

  user = userMata;
  return user;
};

async function request(url, obj) {
  try {
    // if (!obj.userId && url !== "user") return;
    var credentials = btoa(
      "a2FhbGFhX2FjY2VzcyB1c2VybmFtZQ==" +
        ":" +
        "a2FhbGFhX2FjY2VzcyBwYXNzd29yZA=="
    );

    const response = await fetch(baseURL + url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON?.stringify(obj),
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
    return {
      status: false,
      message: "An error occured, please try again later.",
    };
  }
}

function existArray(data, array) {
  const index = array.findIndex((object) => {
    return object?.data?.src === data?.data?.src;
  });

  return index;
}

function createWrapper(img) {
  const id = /*img.data.src + "-" +*/ img.index;
  let htmlObject = document.createElement("div");
  htmlObject.className = "product_wrapper";
  // htmlObject.id = id + "_mainwrapper";
  htmlObject.setAttribute("data-timer", img.data.src + "-" + img.index);

  let imageWrapper = document.createElement("div");
  imageWrapper.className = "product_image_wrapper";

  const Icon = new Image();
  Icon.className = "product_image";
  Icon.src = "https://cdn-icons-png.flaticon.com/512/833/833655.png";

  let timerWrapper = document.createElement("div");
  timerWrapper.className = "timer_container";
  timerWrapper.id = img.data.src + "-" + img.index;

  timerWrapper.innerHTML = moveTime;

  let image = new Image(img.data.width, img.data.height);
  image.src = img.data.src;
  image.alt = img.data.alt;
  image.id = id + "_mainwrapper";
  image.style.cursor = "pointer";
  image.setAttribute("data-timer", img.data.src + "-" + img.index);
  // image.className = "product_image";
  imageWrapper.appendChild(image);
  imageWrapper.appendChild(timerWrapper);

  let productName = document.createElement("h2");
  productName.innerText = "Product name#";
  productName.className = "product_name";

  let productDesc = document.createElement("p");
  productDesc.innerText = "Descrition of the prodcut";
  productDesc.className = "product_desc";

  let button = document.createElement("button");
  button.innerText = "BUY FOR $1";
  button.className = "product_button";
  button.id = id + "_product_button";
  // button.setAttribute("data-timer", img.data.src + "-" + img.index);

  htmlObject.appendChild(imageWrapper);
  // htmlObject.appendChild(productName);
  // htmlObject.appendChild(productDesc);
  // htmlObject.appendChild(button);

  img.data.replaceWith(htmlObject);
}

function startTimer() {
  setInterval(async () => {
    await images.forEach((img) => {
      const id = img.index;
      const timer = getElementById(img.data.src + "-" + img.index);
      const element = getElementById(img.data.src + "-" + img.index);
      const view = element
        ? elementInViewport(element)
        : elementInViewport(img.data);
      const existImages = existArray(img, images);
      const active = activeImages.findIndex(
        (e) => e === img?.index?.toString()
      );

      if (view && existImages !== -1) {
        let currImg = [...images];
        if (!isMobile) {
          if (active !== -1) {
            timerHandler();
          }
        } else {
          timerHandler();
          if (timer) timer.style.opacity = 1;
        }

        if (currImg[existImages].timer - 1 === 0)
          request("track/add", {
            itemId: id,
            userId: getCookie("Kaalaa"),
          });
        // console.log(img.data.src + "-" + img.index, timer)

        const button = getElementById(img.index + "_product_button");

        if (timer) {
          if (images[existImages].timer === 0) {
            const active = img.data.matches(":hover");

            const claimed = timer.dataset.claimed;
            button ? (button.style.display = "flex") : null;
            // timer.style.width = "max-content";
            if (isMobile) {
              timer.style.opacity = 1;
            } else {
              if (active) timer.style.opacity = 1;
            }

            timer.style.cursor = "pointer";
            timer.style.whiteSpace = "nowrap";
            if (!timer.dataset.reward) {
              timer.innerHTML = newReward;
              setTimeout(() => {
                timer.style.width = "100px";
                timer.innerHTML += claimed ? "" : " Earn $1";
              }, 500);
            }
            timer.setAttribute("data-timer", img.data.src + "-" + img.index);
            timer.setAttribute("data-reward", "yes");
            // anime({
            //   targets: timer,
            //   width: "100px",
            //   easing: "easeInQuad",
            //   direction: "alternate",
            //   loop: true,
            //   duration: 0,
            //   delay: 0,
            // });
          }
        } else {
          createWrapper(img);
        }
      } else {
        if (isMobile) {
          if (timer) timer.style.opacity = 0;
        }
      }
    });
  }, 1000);
}

function formatTimerToEarn (img){
  if (images[img.index].timer === 0) {
    const timer = getElementById(img.data.src + "-" + img.index);
    const active = img.data.matches(":hover");

    const claimed = timer.dataset.claimed;
    // timer.style.width = "max-content";
    if (isMobile) {
      timer.style.opacity = 1;
    } else {
      if (active) timer.style.opacity = 1;
    }

    timer.style.cursor = "pointer";
    timer.style.whiteSpace = "nowrap";
    if (!timer.dataset.reward) {
      timer.innerHTML = newReward;
      setTimeout(() => {
        timer.style.width = "100px";
        timer.innerHTML += claimed ? "" : " Earn $1";
      }, 500);
    }
    timer.setAttribute("data-timer", img.data.src + "-" + img.index);
    timer.setAttribute("data-reward", "yes");
  }
}

function timerHandler() {
  let currImg = [...images];
  const newl = [];
  images.forEach((data) => {
    newl.push({ ...data, timer: data.timer === 0 ? 0 : data.timer - 1 });
    // const currTime = data.timer - 1 === 0 ? true : false;
    // if (currTime) {
    //   const timer = getElementById(data.data.src + "-" + data.index);
    //   const active = data.data.matches(":hover");
    //   if (timer && !active) {
    //     timer.style.cursor = "pointer";
    //     timer.style.whiteSpace = "nowrap";
    //     timer.style.width = "100px";
    //     timer.innerHTML = newReward + " Earn $1";
    //   }
    // }
  });
  currImg = newl;

  images = currImg;
}

function addImage(img) {
  const exist = existArray(img, images);
  // console.log("New image: ", images.some(e => e.data.src === img.src))
  if (!images.some((e) => e.data.src === img.src) && img.src) {
    const size = { width: img.width, height: img.height };
    // console.log("Size: ", img.height !== 180.5 && img.width !== 180.5)
    if (img.height !== 180 && img.width !== 180)
      if (size.height >= 100 && size.width >= 100) {
        const index = images.length + 1;
        images.push({ data: img, index, timer: 10, active: false });
      }
  }
}

async function getAllImages() {
  await Array.prototype.map.call(document.images, function (i) {
    addImage(i);
  });
}

document.onreadystatechange = async () => {
  // console.log("Platform Mobile: ", isMobile);
  if (document.readyState === "complete") {
    // getAllImages();
    getMeta();

    let cookie = getCookie("Kaalaa");
    if (!cookie) {
      if (localStorage.getItem("Kaalaa")) {
        setCookie("Kaalaa", localStorage.getItem("Kaalaa"), 1);
        createDownload();
      } else
        await getMeta()
          .then(async (data) => {
            const res = await request("user", data);
            // console.log("Token: ", res)
            if (res.status) {
              setCookie("Kaalaa", res?.token, 1);
              localStorage.setItem("Kaalaa", res?.token);
              createDownload();
            }
          })
          .catch((e) => console.error(e));
    } else {
      if (!localStorage.getItem("Kaalaa")) {
        localStorage.setItem("Kaalaa", getCookie("Kaalaa"));
      }
      createDownload();
    }

    getAllImages();
    // console.log("Images: ", images);
    startTimer();
  }
};

async function generateQRCode(data) {
  // console.log("QR generator called: ", data);
  const container = document.querySelector("#QRContainer");
  // console.log("Container: ", container);
  const res = await new QRCode(container, {
    text: `${data}`,
    width: 180, //default 128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // console.log("QR resilts: ", res);
  // images[0].data.appendChild(res)
}

async function createDownload() {
  const newdiv = document.createElement("div");
  newdiv.id = "QRContainer";
  newdiv.style.padding = "20px";
  document.body.appendChild(newdiv);

  const downloadlink = document.createElement("a");
  downloadlink.href = `https://play.google.com/store/apps/details?id=com.kaala.kaalaa&referrer=utm_source%3Dgoogle%26utm_campaign%3D${getCookie(
    "Kaalaa"
  )}`;
  downloadlink.target = "_blank";
  downloadlink.className = "modal-button";
  downloadlink.innerText = "Download App";

  const downloadlink2 = document.createElement("button");
  downloadlink2.className = "modal-button";
  downloadlink2.innerText = "Link device";
  downloadlink2.id = "Kaalaa_auto_link";

  await generateQRCode(getCookie("Kaalaa"));
  document.body.appendChild(newdiv);

  newdiv.appendChild(downloadlink);
  newdiv.appendChild(downloadlink2);
}

window.onscroll = async function (e) {
  getAllImages();
};

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

function setCookie(name, value, daysToLive) {
  // Encode value in order to escape semicolons, commas, and whitespace
  var cookie = name + "=" + encodeURIComponent(value);

  if (typeof daysToLive === "number") {
    /* Sets the max-age attribute so that the cookie expires
      after the specified number of days */
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60;

    document.cookie = cookie;
  }
}

document.addEventListener("mouseover", (e) => {
  const id = e.target.id;
  const idPlain = splitGetIndex(id);

  console.log(id, idPlain);

  if (e.target.className === "timer_container") {
    e.target.style.opacity = 1;
  }

  if (id.includes("_")) {
    const started = images.findIndex((e) => e.index?.toString() === idPlain);
    console.log("Started: ", started);
    if (started !== -1 && images[started].timer < 10) {
      console.log("Skid: ", true);
      onHover(e, idPlain);
      if(images[started].timer === 0){
        formatTimerToEarn(images[started])
      }
    } else
      setTimeout(() => {
        onHover(e, idPlain);
      }, 2000);
  }
});

document.addEventListener("mouseout", (e) => {
  const id = e.target.id;
  const idPlain = splitGetIndex(id);
  // console.log("Plain leave: ", idPlain);
  active = "";

  activeImages = activeImages.filter((e) => e !== idPlain);
  const timer = getElementById(e.target.dataset.timer);
  if (timer) {
    const claimed = timer.dataset.claimed;
    timer.style.opacity = 0;
    // timer.style.width === "max-content"
    //   ? newReward + (claimed ? "" : "Earn $1")
    //   : stopTime;
  }
});

document.addEventListener("click", async (e) => {
  const id = e.target.id;

  const itemId = e.target.dataset.timer;
  const rewardClaim = e.target.dataset.reward;

  if (!e.target.href || e.target.href === "") e.preventDefault();

  if (id === "Kaalaa_auto_link") {
    linkModal();
    // modalDisplay()
    return;
  }

  if (id === "modal-pair-button") {
    let token = getElementById("pair_token_value");
    if (!token) return;

    token = token.value;
    const error = getElementById("modal-error-message");
    error.innerHTML = "";
    if (token !== "") {
      const modalStatus = getElementById("modalStatusContainer");
      let prev = "";
      if (modalStatus) {
        prev = modalStatus.innerHTML;
        modalStatus.innerHTML = request_loader;
      }

      const req = await request("user/update", {
        notificationId: token,
        deviceOS: "ios",
        userId: getCookie("Kaalaa"),
      });
      if (req.status) {
        // hideModal();
        modalStatus.innerHTML =
          '<p style="color:green; text-align: center; width: 232px;">Pairing successfull.</p>';
      } else {
        modalStatus.innerHTML = prev;
        const errorContainer = getElementById("modal-error-message");
        if (errorContainer) {
          errorContainer.innerHTML = req.message;
        }
      }
    } else {
      error.innerHTML = "Token value can't be empty.";
    }
    return;
  }

  if (itemId && rewardClaim) {
    e.preventDefault();
    current_reward = { itemId, amount: 1 };
    modalDisplay();
    return;
  }

  if (id === "claim_reward_button") {
    e.preventDefault();
    const modalStatus = getElementById("modalStatusContainer");
    if (modalStatus) modalStatus.innerHTML = request_loader;

    const req = await request("reward/add", {
      ...current_reward,
      userId: getCookie("Kaalaa"),
    });

    const timer = getElementById(current_reward?.itemId);
    if (timer && req.status) {
      if (req.status) {
        timer.setAttribute("data-claimed", "yes");
        setTimeout(() => {
          timer.style.width = "min-content";
          timer.innerHTML = newReward;
        }, 500);
      }
    }
    hideModal();
    return;
  }

  if (id === "kaalaa_claim_close") {
    hideModal();
    return;
  }

  if (id === "kaalaa_claim_modal") e.target.style.display = "none";
});

function onHover(e, idPlain) {
  const timer_container = getElementById(e.target.dataset.timer);
  const active = e.target.matches(":hover");
  const imagesExist = images.findIndex((e) => e?.index?.toString() === idPlain);
  const activeExist = activeImages.findIndex((e) => e === idPlain);

  console.log("Claim: ", timer_container.dataset.claimed);

  if (
    activeExist === -1 &&
    imagesExist !== -1 &&
    idPlain &&
    idPlain !== "" &&
    !isMobile &&
    active
  ) {
    activeImages.push(idPlain);
  }
  if (active) timer_container.style.opacity = 1;
}

function modalDisplay() {
  const modal = getElementById("kaalaa_claim_modal");

  if (modal) modal.remove();

  const modalContainer = document.createElement("div");
  modalContainer.className = "modal";
  modalContainer.id = "kaalaa_claim_modal";
  modalContainer.style.display = "flex";

  const modalContentWrapper = document.createElement("div");
  modalContentWrapper.className = "modal-content";

  const modalRewardIcon = document.createElement("div");
  modalRewardIcon.style.justifySelf = "center";
  modalRewardIcon.innerHTML = rewardModal;

  const closeRewardIcon = document.createElement("div");
  closeRewardIcon.className = "modal-close";
  closeRewardIcon.innerHTML = closeModal;

  const loaderIcon = document.createElement("div");
  loaderIcon.innerHTML = request_loader;

  const modalTitle = document.createElement("h2");
  modalTitle.innerHTML = "Reward For Your Time";
  modalTitle.className = "modal-title";

  const modalDesc = document.createElement("p");
  modalDesc.innerHTML =
    "You have recieved 1$ for having an interest in the product.";
  modalDesc.className = "modal-desc";

  const modalbutton1 = document.createElement("button");
  modalbutton1.innerHTML = "ACCEPT";
  modalbutton1.id = "claim_reward_button";
  modalbutton1.className = "modal-button";

  // const modalbutton2 = document.createElement("button");
  // modalbutton2.innerHTML = "Buy with earnings";
  // modalbutton2.className = "modal-button";
  // modalbutton2.style.backgroundColor = "black";
  // modalbutton2.style.color = "white";

  const modalStatusWrapper = document.createElement("div");
  modalStatusWrapper.id = "modalStatusContainer";
  modalStatusWrapper.className = "modal-status-container";
  modalStatusWrapper.appendChild(modalbutton1);
  // modalStatusWrapper.appendChild(modalbutton2);

  modalContentWrapper.appendChild(closeRewardIcon);
  modalContentWrapper.appendChild(modalRewardIcon);
  modalContentWrapper.appendChild(modalTitle);
  modalContentWrapper.appendChild(modalDesc);
  modalContentWrapper.appendChild(modalStatusWrapper);
  modalContainer.appendChild(modalContentWrapper);

  document.body.appendChild(modalContainer);
}

function linkModal() {
  const modal = document.getElementById("kaalaa_claim_modal");

  if (modal) modal.remove();

  const modalContainer = document.createElement("div");
  modalContainer.className = "modal";
  modalContainer.id = "kaalaa_claim_modal";
  modalContainer.style.display = "flex";

  const modalContentWrapper = document.createElement("div");
  modalContentWrapper.className = "modal-content";

  const modalRewardIcon = document.createElement("div");
  modalRewardIcon.style.justifySelf = "center";
  modalRewardIcon.innerHTML = rewardModal;

  const closeRewardIcon = document.createElement("div");
  closeRewardIcon.className = "modal-close";
  closeRewardIcon.innerHTML = closeModal;

  const loaderIcon = document.createElement("div");
  loaderIcon.innerHTML = request_loader;

  const modalTitle = document.createElement("h2");
  modalTitle.style.fontSize = "18px";
  modalTitle.innerHTML = "Pairing";
  modalTitle.className = "modal-title";

  const modalDesc = document.createElement("p");
  modalDesc.innerHTML = "Input and pair token with the form below.";
  modalDesc.className = "modal-desc";

  const modalbutton1 = document.createElement("input");
  modalbutton1.placeholder = "token";
  modalbutton1.id = "pair_token_value";
  modalbutton1.className = "modal-claim-input";
  modalbutton1.style.fontWeight = "normal";
  modalbutton1.style.textAlign = "left";

  const modalbutton2 = document.createElement("button");
  modalbutton2.innerHTML = "PAIR";
  modalbutton2.className = "modal-button";
  modalbutton2.id = "modal-pair-button";

  const modalStatusWrapper = document.createElement("div");
  modalStatusWrapper.id = "modalStatusContainer";
  modalStatusWrapper.className = "modal-status-container";
  modalStatusWrapper.appendChild(modalbutton1);
  modalStatusWrapper.appendChild(modalbutton2);

  const error = document.createElement("p");
  error.style.fontSize = "14px";
  error.style.color = "red";
  error.style.textAlign = "center";
  error.id = "modal-error-message";

  modalStatusWrapper.appendChild(error);

  modalContentWrapper.appendChild(closeRewardIcon);
  modalContentWrapper.appendChild(modalRewardIcon);
  modalContentWrapper.appendChild(modalTitle);
  modalContentWrapper.appendChild(modalDesc);
  modalContentWrapper.appendChild(modalStatusWrapper);
  modalContainer.appendChild(modalContentWrapper);

  document.body.appendChild(modalContainer);
}

function hideModal() {
  const modal = getElementById("kaalaa_claim_modal");
  if (modal) modal.style.display = "none";
}

function splitGetIndex(id) {
  return id?.split("_")[0];
}

function getElementById(id) {
  const element = document.getElementById(id);

  return element ? element : false;
}
