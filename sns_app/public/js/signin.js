// input属性取得
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit');

// すべてのinputに入力されているか
function checkFormState() {
  const isUsernameValid = emailInput.value.trim() !== '';
  const isPasswordValid = passwordInput.value.trim() !== '';
  submitButton.disabled = !(isUsernameValid && isPasswordValid);
}

// 入力が変更されたときにチェックするイベントリスナーを登録
emailInput.addEventListener('input', checkFormState);
passwordInput.addEventListener('input', checkFormState);
