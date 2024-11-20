// ==UserScript==
// @name         ATK Downloader
// @namespace    https://github.com/xdegeneratex
// @version      1.0.2
// @author       xdegeneratex
// @description  Download videos and photosets from various sites across the ATK network.
// @icon         https://www.atkpremium.com/css/images/logo.png
// @homepageURL  https://github.com/xdegeneratex/atk-downloader
// @supportURL   https://github.com/xdegeneratex/atk-downloader/raw/main/dist/build.user.js
// @downloadURL  https://github.com/xdegeneratex/atk-downloader/raw/main/dist/build.user.js
// @updateURL    https://github.com/xdegeneratex/atk-downloader/raw/main/dist/build.user.js
// @match        https://*.atkhairy.com
// @match        https://*.atkpremium.com
// @match        https://*.atkgirlfriends.com
// @match        https://*.atkarchives.com
// @match        https://*.atkpetites.com
// @match        https://*.atkexotics.com
// @match        https://*.amkingdom.com
// @match        https://*.atkhairy.com/*
// @match        https://*.atkpremium.com/*
// @match        https://*.atkgirlfriends.com/*
// @match        https://*.atkarchives.com/*
// @match        https://*.atkpetites.com/*
// @match        https://*.atkexotics.com/*
// @match        https://*.amkingdom.com/*
// ==/UserScript==

(function () {
  'use strict';

  const getVideoSource = (imgSource, quality = "hd") => imgSource.replace(/cdn\d+/, "content").replace("/sm_", "/").replace(/\.jpg.*/, `_${quality}.mp4`);
  const getImageSet = (imgSource) => {
    const matches = /(\d+)\/thumbs/.exec(imgSource);
    if (!matches || !matches.length) {
      return null;
    }
    const setID = matches[1];
    return imgSource.replace(/cdn\d+/, "content").replace("/thumbs", "/3000").replace(/_\d+\.jpg/, ".jpg").replace(/\.jpg.*/, `_${setID}_3000_all.zip`);
  };
  const pathname$2 = document.location.pathname;
  const updateBadges$2 = (container, imgSource) => {
    [...container.querySelectorAll(".pagination > li > a")].forEach((anchorEl) => {
      var _a, _b;
      const label = (((_a = anchorEl.textContent) == null ? void 0 : _a.trim()) || "").toLowerCase();
      if (label.includes("wmv") || label.includes("phone")) {
        (_b = anchorEl.parentElement) == null ? void 0 : _b.remove();
      }
      let quality = "hd";
      if (label === "" || label.includes("4k")) {
        quality = "4k";
        anchorEl.textContent = "4K";
      } else if (label.includes("hd")) {
        quality = "hd";
      } else {
        quality = "sd";
      }
      const mediaURL = getVideoSource(imgSource, quality);
      anchorEl.href = mediaURL;
    });
  };
  const handleMoviesIndexPage$2 = () => {
    if (/^\/tour\/movies/.test(pathname$2)) {
      [...document.querySelectorAll(".img-polaroid")].forEach((container) => {
        const imageEl = container.querySelector("img");
        if (!imageEl) {
          return;
        }
        const src = imageEl.src;
        if (!src) {
          return;
        }
        const vidCountEl = container.querySelector(".vid-count") || container.querySelector(".date");
        if (!vidCountEl) {
          return;
        }
        const mediaURL = getVideoSource(src, "hd");
        const anchorElContainter = document.createElement("div");
        anchorElContainter.className = "date left clear";
        anchorElContainter.style.marginRight = "20px";
        const hdAnchorEl = document.createElement("a");
        hdAnchorEl.href = mediaURL;
        hdAnchorEl.style.textDecoration = "underline";
        hdAnchorEl.innerHTML = `Download`;
        hdAnchorEl.style.fontSize = "12px";
        hdAnchorEl.style.fontWeight = "bold";
        hdAnchorEl.style.color = "darkgreen";
        anchorElContainter.append(hdAnchorEl);
        vidCountEl.insertAdjacentElement("afterend", anchorElContainter);
      });
      const videoEl = document.querySelector("video");
      if (!videoEl) {
        return;
      }
      const poster = videoEl.poster;
      if (!poster) {
        return;
      }
      updateBadges$2(document.body, poster);
    }
  };
  const handleMoviePage$2 = () => {
    var _a;
    if (/^\/tour\/movie\/\d+/.test(pathname$2)) {
      const videoEl = document.querySelector("video");
      let poster = videoEl ? videoEl.poster : (_a = document.querySelector(".is-splash")) == null ? void 0 : _a.getAttribute("style");
      if (!poster) {
        return;
      }
      poster = poster.replace("background-image:url('", "").replace(");", "").trim();
      updateBadges$2(document.body, poster);
    }
  };
  const handleModelPage$2 = () => {
    if (/^\/tour\/model\/[a-zA-Z]/.test(pathname$2)) {
      [...document.querySelectorAll(".panel-default")].forEach((contentContainer) => {
        const image = contentContainer.querySelector("img");
        if (!image) {
          return;
        }
        const src = image.src;
        updateBadges$2(contentContainer, src);
      });
      [...document.querySelectorAll(".model-photoset-row .col-md-6")].forEach((contentContainer) => {
        const image = contentContainer.querySelector("img");
        if (!image) {
          return;
        }
        const src = image.src;
        const setURL = getImageSet(src);
        if (!setURL) {
          return;
        }
        const setElHTML = (el) => {
          if (!el) {
            return;
          }
          el.innerHTML += `<br /><a href="${setURL}" style="color: #86edff" target="_blank">Download</a>`;
        };
        setElHTML(contentContainer.querySelector(".panel-title"));
      });
    }
  };
  const handleModelPhotosetPage$2 = () => {
    if (/^\/tour\/photo\/\d+/.test(pathname$2)) {
      const imgEl = document.querySelector(".photo_holder img");
      if (!imgEl) {
        return;
      }
      const src = imgEl.src;
      const setURL = getImageSet(src);
      if (!setURL) {
        return;
      }
      const joinNowEl = document.querySelector(".btn-success");
      if (!joinNowEl) {
        const header = document.querySelector(".content-header");
        if (header) {
          header.innerHTML += `<br /><a href="${setURL}" style="color: darkgreen" target="_blank">Download Album</a>`;
        }
        return;
      }
      joinNowEl.innerHTML = "Download";
      joinNowEl.href = setURL;
    }
  };
  const handleATKExotics = () => {
    handleMoviesIndexPage$2();
    handleModelPage$2();
    handleModelPhotosetPage$2();
    handleMoviePage$2();
  };
  const pathname$1 = document.location.pathname;
  const updateBadges$1 = (container, imgSource) => {
    [...container.querySelectorAll(".pagination > li > a")].forEach((anchorEl) => {
      var _a;
      const label = (((_a = anchorEl.textContent) == null ? void 0 : _a.trim()) || "").toLowerCase();
      let quality = "hd";
      if (label === "" || label.includes("4k")) {
        quality = "4k";
        anchorEl.textContent = "4K";
      } else if (label.includes("hd")) {
        quality = "hd";
      } else {
        quality = "sd";
      }
      const mediaURL = getVideoSource(imgSource, quality);
      anchorEl.href = mediaURL;
    });
  };
  const handleMoviesIndexPage$1 = () => {
    if (/^\/tour\/movies/.test(pathname$1)) {
      [...document.querySelectorAll(".img-polaroid")].forEach((container) => {
        const imageEl = container.querySelector("img");
        if (!imageEl) {
          return;
        }
        const src = imageEl.src;
        if (!src) {
          return;
        }
        const vidCountEl = container.querySelector(".vid-count");
        if (!vidCountEl) {
          return;
        }
        const mediaURL = getVideoSource(src, "hd");
        const anchorElContainter = document.createElement("div");
        anchorElContainter.className = "vid-count right";
        anchorElContainter.style.marginRight = "20px";
        const hdAnchorEl = document.createElement("a");
        hdAnchorEl.href = mediaURL;
        hdAnchorEl.style.textDecoration = "underline";
        hdAnchorEl.innerHTML = `Download`;
        hdAnchorEl.style.fontSize = "12px";
        hdAnchorEl.style.fontWeight = "bold";
        hdAnchorEl.style.color = "darkgreen";
        anchorElContainter.append(hdAnchorEl);
        container.querySelector(".vid-count").insertAdjacentElement(
          "afterend",
          anchorElContainter
        );
      });
      const videoEl = document.querySelector("video");
      if (!videoEl) {
        return;
      }
      const poster = videoEl.poster;
      if (!poster) {
        return;
      }
      updateBadges$1(document.body, poster);
    }
  };
  const handleMoviePage$1 = () => {
    if (/^\/tour\/movie\/\d+/.test(pathname$1)) {
      const videoEl = document.querySelector("video");
      if (!videoEl) {
        return;
      }
      const poster = videoEl.poster;
      if (!poster) {
        return;
      }
      updateBadges$1(document.body, poster);
    }
  };
  const handleModelPage$1 = () => {
    if (/^\/tour\/model\/[a-zA-Z]/.test(pathname$1)) {
      [...document.querySelectorAll(".img-polaroid")].forEach((contentContainer) => {
        const image = contentContainer.querySelector("img");
        if (!image) {
          return;
        }
        const src = image.src;
        updateBadges$1(contentContainer, src);
      });
    }
  };
  const handleModelPhotosetPage$1 = () => {
    if (/^\/tour\/photo\/\d+/.test(pathname$1)) {
      const imgEl = document.querySelector(".photo_holder img");
      if (!imgEl) {
        return;
      }
      const src = imgEl.src;
      const setURL = getImageSet(src);
      if (!setURL) {
        return;
      }
      const joinNowEl = document.querySelector(".btn-success");
      if (!joinNowEl) {
        return;
      }
      joinNowEl.innerHTML = "Download";
      joinNowEl.href = setURL;
    }
  };
  const handleATKGirlfriends = () => {
    handleMoviesIndexPage$1();
    handleModelPage$1();
    handleModelPhotosetPage$1();
    handleMoviePage$1();
  };
  const pathname = document.location.pathname;
  const updateBadges = (container, imgSource) => {
    [...container.querySelectorAll("#badges > li")].forEach((listEl) => {
      let anchorEl = listEl.querySelector("a");
      const imgEl = (anchorEl == null ? void 0 : anchorEl.querySelector("img")) || listEl.querySelector("img");
      if (!imgEl) {
        return;
      }
      const url = imgEl.src;
      if (url.includes("wmv") || url.includes("phone") || url.includes("stream")) {
        listEl.remove();
        return;
      }
      imgEl.addEventListener("mouseenter", () => {
        imgEl.style.filter = "drop-shadow(2px 4px 2px black)";
      });
      imgEl.addEventListener("mouseleave", () => {
        imgEl.style.filter = "none";
      });
      let quality = url.includes("sd_") ? "sd" : "hd";
      quality = url.includes("4k_") ? "4k" : quality;
      const mediaURL = getVideoSource(imgSource, quality);
      if (!anchorEl) {
        anchorEl = document.createElement("a");
        anchorEl.href = mediaURL;
        anchorEl.appendChild(imgEl);
        listEl.append(anchorEl);
        return;
      }
      anchorEl.href = mediaURL;
    });
  };
  const handleMoviesIndexPage = () => {
    if (/^\/tour\/movies/.test(pathname)) {
      [...document.querySelectorAll(".movieImageHolder")].forEach((container) => {
        const imageEl = container.querySelector("img");
        if (!imageEl) {
          return;
        }
        const src = imageEl.src;
        if (!src) {
          return;
        }
        const durationEl = container.querySelector(".video_duration");
        if (!durationEl) {
          return;
        }
        const isHD = container.querySelector(".uiHD") !== null;
        const mediaURL = getVideoSource(src, isHD ? "hd" : "sd");
        const anchorElContainter = document.createElement("span");
        const hdAnchorEl = document.createElement("a");
        hdAnchorEl.href = mediaURL;
        hdAnchorEl.style.textDecoration = "underline";
        hdAnchorEl.innerHTML = `Download`;
        hdAnchorEl.style.fontSize = "12px";
        hdAnchorEl.style.fontWeight = "bold";
        hdAnchorEl.style.color = "darkgreen";
        anchorElContainter.append(hdAnchorEl);
        container.querySelector(".video_duration").insertAdjacentElement(
          "beforebegin",
          anchorElContainter
        );
        const statusContainer = container.querySelector(".video_info");
        statusContainer.style.display = "flex";
        statusContainer.style.alignItems = "center";
        statusContainer.style.justifyContent = "space-between";
      });
      const videoEl = document.querySelector("video");
      if (!videoEl) {
        return;
      }
      const poster = videoEl.poster;
      if (!poster) {
        return;
      }
      updateBadges(document.body, poster);
    }
  };
  const handleMoviePage = () => {
    if (/^\/tour\/movie\/\d+/.test(pathname)) {
      const videoEl = document.querySelector("video");
      if (!videoEl) {
        return;
      }
      const poster = videoEl.poster;
      if (!poster) {
        return;
      }
      updateBadges(document.body, poster);
    }
  };
  const handleModelPage = () => {
    if (/^\/tour\/model\/[a-zA-Z]/.test(pathname)) {
      [...document.querySelectorAll(".profileContent")].forEach((contentContainer) => {
        const image = contentContainer.querySelector(".videoImage > img");
        if (!image) {
          return;
        }
        const src = image.src;
        updateBadges(contentContainer, src);
      });
      [...document.querySelectorAll(".profileContentPhotos")].forEach((contentContainer) => {
        const image = contentContainer.querySelector("img");
        if (!image) {
          return;
        }
        const src = image.src;
        const setURL = getImageSet(src);
        if (!setURL) {
          return;
        }
        const setElHTML = (el) => {
          if (!el) {
            return;
          }
          el.innerHTML = `<a href="${setURL}" style="color: darkgreen" target="_blank">Download ${el.innerText}</a>`;
        };
        const prevSiblingEl = contentContainer.previousElementSibling;
        if (!prevSiblingEl) {
          return;
        }
        setElHTML(prevSiblingEl.querySelector(".imageContent"));
      });
    }
  };
  const handleModelPhotosetPage = () => {
    if (/^\/tour\/photo\/\d+/.test(pathname)) {
      const imgEl = document.querySelector(".image-holder img");
      if (!imgEl) {
        return;
      }
      const src = imgEl.src;
      const setURL = getImageSet(src);
      if (!setURL) {
        return;
      }
      const container = document.querySelector(".photoSetWrap.left");
      if (!container) {
        return;
      }
      const joinNowEl = container.querySelector("span");
      if (!joinNowEl) {
        return;
      }
      joinNowEl.innerHTML = "Download";
      joinNowEl.style.borderBottom = "none";
      joinNowEl.style.color = "darkgreen";
      joinNowEl.style.textDecoration = "underline";
      const btnDownload = document.createElement("a");
      btnDownload.href = setURL;
      btnDownload.append(joinNowEl);
      container.prepend(btnDownload);
    }
  };
  const handleATKPremium = () => {
    handleMoviesIndexPage();
    handleModelPage();
    handleModelPhotosetPage();
    handleMoviePage();
  };
  (function() {
    const hostname = document.location.hostname.toLowerCase();
    if (hostname.includes("atkpremium") || hostname.includes("atkhairy") || hostname.includes("atkarchives") || hostname.includes("atkpetites")) {
      handleATKPremium();
    } else if (hostname.includes("atkgirlfriends")) {
      handleATKGirlfriends();
    } else if (hostname.includes("atkexotics") || hostname.includes("amkingdom")) {
      handleATKExotics();
    } else {
      console.error(`${hostname} not supported by this userscript!`);
    }
  })();

})();
