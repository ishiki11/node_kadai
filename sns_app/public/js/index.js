// ボタン要素とモーダル要素の取得
const closeModalButton = document.getElementById('closeModalButton');
const postModal = document.getElementById('postModal');

// 閉じるボタンのクリックイベント
closeModalButton.addEventListener('click', () => {
  postModal.style.display = 'none';
});

// イベント
function home() {
  location.href = '/';
}
function search() {
  // location.href = '/search';
  alert('まだ実装できてません');
}
function bell() {
  // location.href = '/bell';
  alert('まだ実装できてません');
}
function dm() {
  // location.href = '/dm';
  alert('まだ実装できてません');
}
function myprofile() {
  location.href = '/profile';
}
function logout() {
  location.href = '/logout';
}
function send() {
  postModal.style.display = 'block';
}
function profile(data) {
  // alert('まだ実装できてません');
  location.href = `/profile/${data}`;
}
