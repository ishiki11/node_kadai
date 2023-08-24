/**
 * サイドバーのイベント
 */
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

/**
 * 編集のイベント
 */
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.src = event.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.src = '{{ profile.icon }}';
    imagePreview.style.display = 'none';
  }
});

// アカウント削除
function profileDelete() {
  // is_activeをfalseに
  alert('まだ実装できてません');
}
// 編集取消
function editCancel() {
  location.href = '/profile';
}
