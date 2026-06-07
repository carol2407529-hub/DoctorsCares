const emailInput = document.getElementById("email");
const status = document.getElementById("email-status");

emailInput.addEventListener("input", async () => {
  const email = emailInput.value.trim();

  if (!email) {
    status.style.display = "none";
    return;
  }

  status.style.display = "inline";
  status.innerHTML = '<i class="fas fa-circle-notch fa-spin loading"></i>';

  try {
    const response = await fetch(
      `/auth/check-email?email=${encodeURIComponent(email)}`,
    );
    const data = await response.json();
    if (data.available) {
      status.innerHTML = '<i class="fas fa-check-circle success"></i>';
    } else {
      status.innerHTML = '<i class="fas fa-times-circle error"></i>';
    }
  } catch (err) {
    status.innerHTML = '<i class="fas fa-times-circle error"></i>';
  }
});
