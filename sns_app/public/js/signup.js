// input属性取得
const emailInput = document.getElementById('mail');
const passwordInput = document.getElementById('password');
const repasswordInput = document.getElementById('repassword');
const submitButton = document.getElementById('submit');

// すべてのinputに入力されているか
function checkFormState() {
  const isUsernameValid = emailInput.value.trim() !== '';
  const isPasswordValid = passwordInput.value.trim() !== '';
  const isRepasswordValid = repasswordInput.value.trim() != '';
  submitButton.disabled = !(
    isUsernameValid &&
    isPasswordValid &&
    isRepasswordValid
  );
}

// 入力が変更されたときにチェックするイベントリスナーを登録
emailInput.addEventListener('input', checkFormState);
passwordInput.addEventListener('input', checkFormState);
repasswordInput.addEventListener('input', checkFormState);
