// Show custom alert message
function showAlert(message) {
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("customModal").style.display = "flex";
}

// Close the modal
function closeModal() {
  document.getElementById("customModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("customModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Sleep function for animations - makes code wait
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
