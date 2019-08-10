// JS Goes here - ES6 supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  });
}

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

window.toggleMenu = () => {
  const mu = document.getElementById("off-canvas");
  const ni = document.getElementById("nav-icon");
  mu.classList.toggle("active");
  ni.classList.toggle("open");
};

// Sticky Nav Functionality in Vanilla JS

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

var header = document.getElementById("header");

window.toggleDiv = function(modal) {
  var div = document.getElementById(modal);
  if (hasClass(div, "dn")) {
    removeClass(div, "dn");
    removeClass(document.body, "overflow-y-scroll");
    addClass(div, "db");
    addClass(document.body, "overflow-y-hidden");
  }
  else {
    removeClass(div, "db");
    removeClass(document.body, "overflow-y-hidden");
    addClass(div, "dn");
    addClass(document.body, "overflow-y-scroll");
  }
};

window.closeDiv = function(modal, iframe) {
  var div = document.getElementById(modal);
  var frame = document.getElementById(iframe);
  frame.src = frame.src;
  if (hasClass(div, "dn")) {
    removeClass(div, "dn");
    removeClass(document.body, "overflow-y-scroll");
    addClass(div, "db");
    addClass(document.body, "overflow-y-hidden");
  }
  else {
    removeClass(div, "db");
    removeClass(document.body, "overflow-y-hidden");
    addClass(div, "dn");
    addClass(document.body, "overflow-y-scroll");
  }
};

window.onscroll = function() {

  var currentWindowPos = document.documentElement.scrollTop || document.body.scrollTop;

  if (currentWindowPos > 27) {
    addClass(header, "scrolled");
  } else {
    removeClass(header, "scrolled");
  }
};
