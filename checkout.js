console.log("KĀĀlĀĀ checkout script initiated");

let rewards = 0;
const url = ["https://kaalaa-app.herokuapp.com/", "http://localhost:5050/"];
const baseURL = url[0];
const auth = {
  username: "a2FhbGFhX2FjY2VzcyB1c2VybmFtZQ==",
  password: "a2FhbGFhX2FjY2VzcyBwYXNzd29yZA==",
};
const reward = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="8" r="2.5" stroke="black"/>
<path d="M10.5248 1.81414C10.2332 1.52854 9.76679 1.52854 9.4752 1.81414L8.02577 3.23379L5.99702 3.25485C5.5889 3.25908 5.25908 3.5889 5.25485 3.99702L5.23379 6.02577L3.81414 7.4752C3.52854 7.76679 3.52854 8.23321 3.81414 8.5248L5.23379 9.97423L5.25485 12.003C5.25908 12.4111 5.5889 12.7409 5.99702 12.7452L8.02577 12.7662L9.4752 14.1859C9.76679 14.4715 10.2332 14.4715 10.5248 14.1859L11.9742 12.7662L14.003 12.7452C14.4111 12.7409 14.7409 12.4111 14.7452 12.003L14.7662 9.97423L16.1859 8.5248C16.4715 8.23321 16.4715 7.76679 16.1859 7.4752L14.7662 6.02577L14.7452 3.99702C14.7409 3.5889 14.4111 3.25908 14.003 3.25485L11.9742 3.23379L10.5248 1.81414Z" stroke="black" stroke-linejoin="round"/>
<path d="M7 12.5V18.5L10 17.0333M13 12.5V18.5L10 17.0333M10 17.0333V14.1667" stroke="black" stroke-linejoin="round"/>
</svg>
`;
const rewardModal = `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="48" cy="40" r="14.5" stroke="black" stroke-width="3"/>
<path d="M49.7493 7.61375C48.7774 6.66177 47.2226 6.66177 46.2507 7.61375L37.952 15.7419L26.3364 15.8625C24.976 15.8766 23.8766 16.976 23.8625 18.3364L23.7419 29.952L15.6137 38.2507C14.6618 39.2226 14.6618 40.7774 15.6137 41.7493L23.7419 50.048L23.8625 61.6636C23.8766 63.024 24.976 64.1234 26.3364 64.1375L37.952 64.258L46.2507 72.3862C47.2226 73.3382 48.7774 73.3382 49.7493 72.3863L58.048 64.258L69.6636 64.1375C71.024 64.1234 72.1234 63.024 72.1375 61.6636L72.258 50.048L80.3863 41.7493C81.3382 40.7774 81.3382 39.2226 80.3863 38.2507L72.258 29.952L72.1375 18.3364C72.1234 16.976 71.024 15.8766 69.6636 15.8625L58.048 15.7419L49.7493 7.61375ZM58.1916 15.8826L58.1908 15.8818C58.1911 15.8821 58.1914 15.8823 58.1917 15.8826L57.8418 16.2398L58.1916 15.8826Z" stroke="black" stroke-width="3" stroke-linejoin="round"/>
<path d="M32 65V88L48 80.6667M64 65V88L48 80.6667M48 80.6667V73.3333" stroke="black" stroke-width="3" stroke-linejoin="round"/>
</svg>
`;
const closeModal = `<svg id="kaalaa_claim_close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.0111 6.05016L18.4807 6.58049L13.0613 11.9999L18.4807 17.4193L19.0111 17.9497L17.9504 19.0103L17.4201 18.48L12.0006 13.0606L6.58122 18.48L6.05089 19.0103L4.99023 17.9497L5.52056 17.4193L10.94 11.9999L5.52057 6.58049L4.99024 6.05016L6.0509 4.9895L6.58123 5.51983L12.0006 10.9392L17.4201 5.51983L17.9504 4.9895L19.0111 6.05016Z" fill="black"/>
</svg>
`;
const request_loader = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#1d0e0b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"/>
</circle></svg>`;

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
    if (obj.itemId) {
      hideModal();
    }
    console.error(e);
  }
}

document.onreadystatechange = async () => {
  // console.log("Platform Mobile: ", isMobile);
  if (document.readyState === "complete") {
    let cookie = getCookie("Kaalaa");
    if (cookie) {
      request("reward/history", { userId: cookie }).then((res) => {
        console.log("History results: ", res);
        if (res.status) {
          balance = res.data.balance || balance;
          const redeem = document.getElementById("Kaalaa_redeem");
          if (redeem) redeem.style.display = "block";
        }
      });
    }
  }
};

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

function modalDisplay() {
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
  modalTitle.innerHTML = "$" + balance + " rewards recieved";
  modalTitle.className = "modal-title";

  const modalDesc = document.createElement("p");
  modalDesc.innerHTML = "Input the reward amount you wish to claim below.";
  modalDesc.className = "modal-desc";

  const modalbutton1 = document.createElement("input");
  modalbutton1.placeholder = "$0";
  modalbutton1.id = "claim_reward_value";
  modalbutton1.className = "modal-claim-input";
  modalbutton1.type = "number";

  const modalbutton2 = document.createElement("button");
  modalbutton2.innerHTML = "Claim reward";
  modalbutton2.className = "modal-button";
  modalbutton2.id = "modal-claim-button";
  modalbutton2.style.backgroundColor = "black";
  modalbutton2.style.color = "white";

  const modalStatusWrapper = document.createElement("div");
  modalStatusWrapper.id = "modalStatusContainer";
  modalStatusWrapper.appendChild(modalbutton1);
  modalStatusWrapper.appendChild(modalbutton2);

  const error = document.createElement("p");
  error.style.fontSize = 12;
  error.style.color = "red";
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

document.addEventListener("click", (e) => {
  const id = e.target.id;

  if (id === "Kaalaa_redeem") {
    modalDisplay();
  }
  if (id === "modal-claim-button") {
    let amount = document.getElementById("claim_reward_value");
    if (amount) {
      const error = document.getElementById("modal-error-message");
      amount = amount.value;
      if (amount < 1) {
        error.innerHTML = "amount can't be less that $1.";
        return;
      }
      if (amount > balance) {
        error.innerHTML =
          "The maximum amount you can claim is $" + balance + ".";
        return;
      }

      const reward_container = document.getElementById(
        "Kaalaa_discount_container"
      );
      if (reward_container) {
        reward_container.style.display = "block";
      }
    }
  }
});
