window.onload = () => {
  let name = getCookie("name");
  while (!name) {
    name = prompt("사용할 닉네임을 입력해주세요.");
    if (name) {
      setCookie("name", name, 30);
      break;
    }
  }
};

const setCookie = (name, value, exp) => {
  const date = new Date();
  date.setTime(date.getTime() + exp * 1000 * 60 * 60 * 24);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};
