let stack = []; // Array to store stack items
let animating = false;

// Push item onto stack
async function push() {
  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const input = document.getElementById("inputValue").value;
  if (!input.trim()) {
    showAlert("Please enter a value to push!");
    return;
  }

  animating = true;

  // Create new item
  const newItem = {
    value: input.trim(),
    id: Date.now(),
  };

  stack.push(newItem);
  document.getElementById("inputValue").value = "";

  renderStack();

  // Animate the new item
  await sleep(100);
  const newElement = document.getElementById(`stack-${newItem.id}`);
  if (newElement) {
    newElement.classList.add("active");
  }

  await sleep(500);

  if (newElement) {
    newElement.classList.remove("active");
  }

  animating = false;
}

// Pop item from stack
async function pop() {
  if (stack.length === 0) {
    showAlert("Stack is empty! Nothing to pop.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  // Get top item
  const topItem = stack[stack.length - 1];
  const topElement = document.getElementById(`stack-${topItem.id}`);

  // Highlight it
  if (topElement) {
    topElement.classList.add("active");
  }

  await sleep(500);

  // Remove it
  const poppedValue = stack.pop().value;
  renderStack();

  showAlert(`Popped value: ${poppedValue}`);
  animating = false;
}

// View top item without removing
async function peek() {
  if (stack.length === 0) {
    showAlert("Stack is empty! Nothing to peek.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  const topItem = stack[stack.length - 1];
  const topElement = document.getElementById(`stack-${topItem.id}`);

  // Highlight top item
  if (topElement) {
    topElement.classList.add("active");
  }

  await sleep(1000);

  if (topElement) {
    topElement.classList.remove("active");
  }

  showAlert(`Top value: ${topItem.value}`);
  animating = false;
}

// Clear all items from stack
function clearStack() {
  if (stack.length === 0) {
    showAlert("Stack is already empty!");
    return;
  }

  stack = [];
  renderStack();
  showAlert("Stack cleared successfully!");
}

// Display the stack
function renderStack() {
  const container = document.getElementById("stackContainer");
  const emptyMsg = document.getElementById("emptyMessage");

  if (stack.length === 0) {
    container.innerHTML = "";
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  let html = "";

  // Show items from top to bottom
  for (let i = stack.length - 1; i >= 0; i--) {
    html += `<div class="stack-item" id="stack-${stack[i].id}">${stack[i].value}</div>`;
  }

  container.innerHTML = html;
}

// Initialize on page load
window.onload = function () {
  renderStack();
};
