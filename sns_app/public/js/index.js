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
function profile() {
  // location.href = '/profile';
  alert('まだ実装できてません');
}
function logout() {
  location.href = '/logout';
}
function send() {
  postModal.style.display = 'block';
}
