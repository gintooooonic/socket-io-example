function fmtDate(date) {
  const dateObj = new Date(date);
  const h = dateObj.getHours();
  const hour = h < 12 ? (h == 0 ? 12 : h) : h - 12 == 0 ? 12 : h - 12;
  const m = dateObj.getMinutes();
  const min = m < 10 ? "0" + m : m;
  return `${h < 12 ? "오전" : "오후"} ${hour}:${min}`;
}

const setCookie = (name, value, exp) => {
  const date = new Date();
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 24);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};
