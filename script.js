console.log("KĀĀlĀĀ script initiated");

function popup(mylink, windowname, w, h){
  if (! window.focus)return true;
  var href;
  if (typeof(mylink) == 'string')
     href=mylink;
  else
     href=mylink.href;
  window.open(href, windowname, "width="+w+",height="+h+",scrollbars=yes,toolbar=no" );
  return false;
}

// add information i need to claim the reward
// popup("https://kaalaa-ios-pwa.vercel.app/campaign/", 'Title', '400', '500')

//base urls
const url = [
  "https://kaalaa-server.com/",
  "http://localhost:5050/",
  "https://3e14-154-160-18-118.eu.ngrok.io/",
];
const baseURL = url[0];
const auth = {
  username: "a2FhbGFhX2FjY2VzcyB1c2VybmFtZQ==",
  password: "a2FhbGFhX2FjY2VzcyBwYXNzd29yZA==",
};
let selector = [];
let shareSelector = [];
let animation = 10;

//Gloval variables
const domain = window.location.hostname;
let passUrl = "";
let loadingView = false;
let globalClaim = null;
const isMobile =
  navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i);
let images = [];
let activeImages = [];
let active = "";
let user = {};
let current_reward = {};

//Global elements
const stopTime = `<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="5.5" stroke="white"/>
<path d="M8 5V8" stroke="white" stroke-linecap="round"/>
</svg>
`;

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

const shareIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.35355 1.14652L6 0.792969L5.64645 1.14652L3.39645 3.39652L3.04289 3.75008L3.75 4.45718L4.10355 4.10363L5.5 2.70718V7.50008V8.00008H6.5V7.50008V2.70718L7.89645 4.10363L8.25 4.45718L8.95711 3.75008L8.60355 3.39652L6.35355 1.14652ZM2.75 6.75008V6.25008H1.75V6.75008V9.75008C1.75 10.4404 2.30964 11.0001 3 11.0001H9C9.69036 11.0001 10.25 10.4404 10.25 9.75008V6.75008V6.25008H9.25V6.75008V9.75008C9.25 9.88815 9.13807 10.0001 9 10.0001H3C2.86193 10.0001 2.75 9.88815 2.75 9.75008V6.75008Z" fill="white"/>
</svg>
`;

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
  console.log(user)
  return user;
};

function kaalaaTimerHandler(name) {
  return `<svg xmlns:svg="http://www.w3.org/2000/svg" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.0" width="64px" height="64px" 
  viewBox="0 0 128 128" xml:space="preserve" class="${name}">
  <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0)"/>
  <g>
  <path d="M63.88 0A63.88 63.88 0 1 1 0 63.88 63.88 63.88 0 0 1 63.88 0zm0 11.88a52 52 0 1 1-52 52 52 52 0 0 1 52-52zm0 46.2a5.8 5.8 0 1 1-5.8 5.8 5.8 5.8 0 0 1 5.8-5.8z" fill-rule="evenodd" fill="#FFFFFF"/>
  <path d="M58.25 5h11.3v59h-11.3V5z" fill="#FFFFFF"/>
  <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="5s" repeatCount="indefinite"/>
  </g>
  </svg>`;
}

const moveTime = "zoom-in-out-box";
const maxTime = "kaalaa_max_timer";

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
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-Security-Policy": "upgrade-insecure-requests",
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
  timerWrapper.style.opacity = 0;
  timerWrapper.id = img.data.src + "-" + img.index;
  if (img.share) timerWrapper.setAttribute("data-image", img.data.src);
  timerWrapper.setAttribute("data-share", img.share ? "yes" : "no");
  timerWrapper.setAttribute("data-amount", img.amount);
  timerWrapper.setAttribute("data-selector", img.selector);

  timerWrapper.innerHTML = kaalaaTimerHandler(moveTime);

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

        // if (currImg[existImages].timer - 1 === 0)
        //   request("track/add", {
        //     itemId: id,
        //     userId: getCookie("Kaalaa"),
        //   });
        // console.log(img.data.src + "-" + img.index, timer)

        const button = getElementById(img.index + "_product_button");

        if (timer) {
          if (images[existImages].timer === 0) {
            const share = images[existImages].share;
            const amount = images[existImages].amount;
            const active = img.data.matches(":hover");

            const claimed = timer.dataset.claimed;
            button ? (button.style.display = "flex") : null;
            // timer.style.width = "max-content";
            if (isMobile) {
              timer.style.opacity = 1;
            } else {
              if (active) timer.style.opacity = 1;
            }
            if (globalClaimCheck(timer)) return;

            timer.style.cursor = "pointer";
            timer.style.whiteSpace = "nowrap";
            if (!timer.dataset.reward) {
              timer.innerHTML = share ? shareIcon : newReward;
              setTimeout(() => {
                timer.style.width = share ? "170px" : "100px";
                timer.innerHTML += claimed
                  ? ""
                  : ` ${share ? "Share to get $" + amount : "Earn $" + amount}`;
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
          if (images[existImages].found !== true) createWrapper(img);
        }
      } else {
        if (isMobile) {
          if (timer) timer.style.opacity = 0;
        }
      }
    });
  }, 1000);
}

function formatTimerToEarn(img) {
  if (images[img.index].timer === 0) {
    const share = images[img.index].share;
    const amount = images[img.index].amount;
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
    if (globalClaimCheck(timer)) return;
    if (!timer.dataset.reward) {
      timer.innerHTML = share ? shareIcon : newReward;
      setTimeout(() => {
        timer.style.width = share ? "170px" : "100px";
        timer.innerHTML += claimed
          ? ""
          : ` ${share ? "Share to get $" + amount : "Earn $" + amount}`;
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

function globalClaimCheck(timer) {
  if (globalClaim) {
    timer.style.width = "min-content";
    timer.innerHTML = newReward;
    return true;
  }
  return false;
}

function addImage(img, timer) {
  if (!images.some((e) => e.data.src === img.src) && img.src) {
    const valid = validSelector(img.classList);
    if (valid) {
      const index = images.length + 1;
      const imagePayload = {
        share: valid.share ? true : false,
        selector: valid.selector,
        amount: valid.amount,
        data: img,
        index,
        timer,
        active: false,
        itemId: img.src + "-" + index,
      };
      // console.log({ imagePayload });
      images.push(imagePayload);
    }
  }
}

function validSelector(arr1) {
  let found = false;
  selector.forEach((e) =>
    arr1.contains(e.name)
      ? (found = { share: false, amount: e.amount, selector: e.name })
      : null
  );
  shareSelector.forEach((e) =>
    arr1.contains(e.name)
      ? (found = { share: true, amount: e.amount, selector: e.name })
      : null
  );
  return found;
}

async function getAllImages(timer) {
  await Array.prototype.map.call(document.images, function (i) {
    addImage(i, timer);
  });

  if (globalClaim) {
    const timers = document.getElementsByClassName("timer_container");
    if (timers.length > 0) {
      setTimeout(() => {
        for (var i = 0; i < timers.length; i++) {
          timers[i].setAttribute("data-claimed", "yes");
          timers[i].style.width = "min-content";
          timers[i].innerHTML = newReward;
        }
      }, 500);
    }
  }
}

document.onreadystatechange = async () => {
  // console.log("Platform Mobile: ", isMobile);
  if (document.readyState === "complete") {
    // getAllImages();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("sw.js")
        .then((e) => console.log("Service worker:", e))
        .catch((e) => console.error("Service worker:", e));
    }
    getMeta();

    let cookie = getCookie("Kaalaa");
    if (!cookie) {
      if (localStorage.getItem("Kaalaa")) {
        console.log({ userId: localStorage.getItem("Kaalaa") });
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
              passUrl = res?.passUrl;
              const wallet = getElementById("install");
              if (wallet) wallet.style.display = "block";
            }
          })
          .catch((e) => console.error(e));
    } else {
      if (!localStorage.getItem("Kaalaa")) {
        localStorage.setItem("Kaalaa", getCookie("Kaalaa"));
      }
      createDownload();
    }

    const req = await request("reward/review", {
      userId: getCookie("Kaalaa"),
      domain,
    });
    if (req.status && req.found === false) {
      selector = req.brand.selector || [];
      shareSelector = req.brand.shareSelector || [];
      animation = req.brand.animation;
      getAllImages(animation);
      startTimer();
    }
    // getPassUrl();
  }
};

/*
async function getPassUrl() {
  const res = await request("user/get", { userId: getCookie("Kaalaa") });
  if (res.status) {
    passUrl = "https://pub1.pskt.io/" + res.data[0].passId;
    const wallet = getElementById("install");
    if (wallet) wallet.style.display = "block";
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  var deferredPrompt = e;
  console.log("Ready to install");
  // Update UI to notify the user they can add to home screen
  const addBtn = document.getElementById("install");

  addBtn.addEventListener("click", (e) => {
    // hide our user interface that shows our A2HS button

    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
        addBtn.style.display = "none";
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
*/

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

  const downloadlink3 = document.createElement("button");
  downloadlink3.className = "modal-button";
  downloadlink3.innerText = "QR scan reward";
  downloadlink3.id = "Kaalaa_share_image";

  // const Installlink = document.createElement("button");
  // Installlink.className = "modal-button";
  // Installlink.id = "install";
  // Installlink.innerText = "Add to homescreen";

  const Installlink = document.createElement("button");
  Installlink.className = "modal-button";
  Installlink.id = "install";
  Installlink.style.display = "none";
  Installlink.innerText = "Download wallet";

  await generateQRCode(getCookie("Kaalaa"));
  document.body.appendChild(newdiv);

  newdiv.appendChild(downloadlink);
  newdiv.appendChild(downloadlink2);
  newdiv.appendChild(downloadlink3);
  newdiv.appendChild(Installlink);
}

window.onscroll = async function (e) {
  getAllImages(animation);
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

//Mouse events
document.addEventListener("mouseover", (e) => {
  const id = e.target.id;
  const idPlain = splitGetIndex(id);

  if (id.includes("_")) {
    const started = images.findIndex((e) => e.index?.toString() === idPlain);
    // console.log("Started: ", started);
    if (started !== -1 && images[started].timer < animation) {
      console.log("Skid: ", true);
      onHover(e, idPlain);
      if (images[started].timer === 0) {
        formatTimerToEarn(images[started]);
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
  if (timer && !e.target.classList.contains("timer_container")) {
    const claimed = timer.dataset.claimed;
    timer.style.opacity = 0;
    if (timer.classList.contains("kaalaa_animate_timer_container"))
      timer.classList.remove("kaalaa_animate_timer_container");
    // timer.style.width === "max-content"
    //   ? newReward + (claimed ? "" : "Earn $1")
    //   : stopTime;
  }
});

document.addEventListener("click", async (e) => {
  const id = e.target.id;

  const itemId = e.target.dataset.timer;
  const rewardClaim = e.target.dataset.reward;

  const share = e.target.dataset.share === "yes" ? true : false;
  const selector = e.target.dataset.selector;

  // console.log({ share, selector });

  if (!e.target.href || e.target.href === "") e.preventDefault();

  if (id === "install") {
    window.open(passUrl, "_blank").focus();
    return;
  }

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

  if (id === "Kaalaa_share_image") {
    // window.FB.ui(
    //   {
    //     method: "share",
    //     href: "https://drive.google.com/uc?id=1C-LIFfdiqOp6tVc2s-X1Lyn-2ygLqw1S",
    //   },
    //   (response) => {
    //     if (response && !response.error_message) {
    //       imageShareModal(true);
    //     } else {
    //       imageShareModal(false);
    //     }
    //   }
    // );
    return qrmodalDisplay();
  }

  if (e.target.dataset.image) {
    // console.log({ src: e.target.dataset.image });
    const amount = e.target.dataset.amount;
    return shareToFaceBook(e.target.dataset.image)
      .then((e) =>
        e ? modalDisplay(amount, share, selector) : imageShareModal(false)
      )
      .catch((e) => console.error("Not shared"));
  }

  if (itemId && rewardClaim) {
    e.preventDefault();
    current_reward = { itemId, amount: 1 };
    const amount = e.target.dataset.amount;
    modalDisplay(amount, share, selector);
    return;
  }

  if (id === "claim_reward_button") {
    e.preventDefault();
    const modalStatus = getElementById("modalStatusContainer");
    if (modalStatus) {
      modalStatus.innerHTML = request_loader;
    }
    const payload = {
      itemId: domain,
      domain,
      userId: getCookie("Kaalaa"),
      share,
      selector,
      OS: window.navigator.platform,
    };

    console.log({ payload });

    const req = await request("reward/add", payload);

    const timer = getElementById(current_reward?.itemId);
    if (timer && req.status) {
      if (req.status) {
        globalClaim = true;
        const timers = document.getElementsByClassName("timer_container");
        if (timers.length > 0) {
          setTimeout(() => {
            for (var i = 0; i < timers.length; i++) {
              timers[i].setAttribute("data-claimed", "yes");
              timers[i].style.width = "min-content";
              timers[i].innerHTML = newReward;
            }
          }, 500);
        }
        if (isMobile) {
          if (navigator.userAgent.match(/Android/i)) {
            // window
            //   .open(
            //     `https://kalaa-client-git-dev-jebo4real.vercel.app/?userId=${getCookie(
            //       "Kaalaa"
            //     )}&callback=${window.location.href}`,
            //     "_blank"
            //   )
            //   .focus();

            popup(`https://kaalaa-ios-pwa.vercel.app/campaign/?userId=${getCookie("Kaalaa")}`, 'Kaalaa', '400', '500')
          } else
            try {
              if (req.data.buffer.data) {
                const blob = await new Blob(
                  [new Uint8Array(req.data.buffer.data)],
                  {
                    type: req.data.type,
                  }
                );
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = `${getCookie("Kaalaa")}.pkpass`;
                a.click();
              }
            } catch (e) {
              console.error(e);
            }
        }
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

  // console.log("Claim: ", timer_container.dataset.claimed);

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
  if (active) {
    timer_container.style.opacity = 1;
    if (images[imagesExist].timer !== 0) {
      if (!timer_container.classList.contains("kaalaa_animate_timer_container"))
        timer_container.classList.add("kaalaa_animate_timer_container");

      timer_container.innerHTML = kaalaaTimerHandler(
        "kaalaa_max_timer zoom-in-out-box"
      );
    }
  }
}

//QR Code modal display
async function qrmodalDisplay() {
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
  modalRewardIcon.style.marginBottom = "10px";

  const closeRewardIcon = document.createElement("div");
  closeRewardIcon.className = "modal-close";
  closeRewardIcon.innerHTML = closeModal;

  const modalDesc = document.createElement("p");
  modalDesc.innerHTML =
    "Scan the QR code with your smartphone camera to get 1$.";
  modalDesc.className = "modal-desc";

  modalContentWrapper.appendChild(modalRewardIcon);
  modalContentWrapper.appendChild(modalDesc);
  modalContainer.appendChild(modalContentWrapper);

  document.body.appendChild(modalContainer);
  await new QRCode(modalRewardIcon, {
    text: `https://kalaa-client.vercel.app/qrresponse/?userId=${getCookie(
      "Kaalaa"
    )}&callback=${window.location.href}&itemId=${domain}`,
    width: 180, //default 128
    height: 180,
    colorDark: "#6100FF",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

function modalDisplay(amount, share, selector) {
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
  modalDesc.innerHTML = `You have recieved $${amount} for having an interest in the product.`;
  modalDesc.className = "modal-desc";

  const modalbutton1 = document.createElement("button");
  modalbutton1.innerHTML = "ACCEPT";
  modalbutton1.id = "claim_reward_button";
  modalbutton1.className = "modal-button";
  modalbutton1.setAttribute("data-share", share ? "yes" : "no");
  modalbutton1.setAttribute("data-selector", selector);

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

function imageShareModal(status) {
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

  const modalTitle = document.createElement("h2");
  modalTitle.innerHTML = status ? "Success" : "Error";
  modalTitle.className = "modal-title";

  const modalDesc = document.createElement("p");
  modalDesc.innerHTML = `Image sharing ${
    status ? "successful" : "unsuccessful"
  }`;
  modalDesc.className = "modal-desc";
  modalDesc.style.minWidth = "170px";

  modalContentWrapper.appendChild(closeRewardIcon);
  modalContentWrapper.appendChild(modalRewardIcon);
  modalContentWrapper.appendChild(modalTitle);
  modalContentWrapper.appendChild(modalDesc);
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

//Facebook share
window.fbAsyncInit = function () {
  window.FB.init({
    appId: "767283971227392",
    status: true,
    xfbml: true,
    version: "v2.7", // or v2.6, v2.5, v2.4, v2.3
  });

  shareToFaceBook();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

const shareToFaceBook = async function (image) {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus(function (response) {
      console.log("Login response", response);
    });
    if (image) {
      window.FB.ui(
        {
          method: "share",
          href: image,
        },
        (response) => {
          if (response && !response.error_message) {
            resolve(true);
          } else {
            console.log({ response });
            resolve(false);
          }
        }
      );
    } else reject(false);
  });
};
