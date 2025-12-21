// ==================== QUEUE ====================
let queue = []; // Array to store queue items
let animating = false;

// Add item to queue (at rear)
async function enqueue() {
  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const input = document.getElementById("inputValue").value;
  if (!input.trim()) {
    showAlert("Please enter a value to enqueue!");
    return;
  }

  animating = true;

  // Create new item
  const newItem = {
    value: input.trim(),
    id: Date.now(),
  };

  queue.push(newItem);
  document.getElementById("inputValue").value = "";

  renderQueue();

  // Animate the new item
  await sleep(100);
  const newElement = document.getElementById(`queue-${newItem.id}`);
  if (newElement) {
    newElement.classList.add("active");
  }

  await sleep(500);

  if (newElement) {
    newElement.classList.remove("active");
  }

  animating = false;
}

// Remove item from queue (from front)
async function dequeue() {
  if (queue.length === 0) {
    showAlert("Queue is empty! Nothing to dequeue.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  // Get front item
  const frontItem = queue[0];
  const frontElement = document.getElementById(`queue-${frontItem.id}`);

  // Highlight it
  if (frontElement) {
    frontElement.classList.add("active");
  }

  await sleep(500);

  // Remove it
  const dequeuedValue = queue.shift().value;
  renderQueue();

  showAlert(`Dequeued value: ${dequeuedValue}`);
  animating = false;
}

// View front item without removing
async function front() {
  if (queue.length === 0) {
    showAlert("Queue is empty! No front element.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  const frontItem = queue[0];
  const frontElement = document.getElementById(`queue-${frontItem.id}`);

  // Highlight front item
  if (frontElement) {
    frontElement.classList.add("active");
  }

  await sleep(1000);

  if (frontElement) {
    frontElement.classList.remove("active");
  }

  showAlert(`Front value: ${frontItem.value}`);
  animating = false;
}

// View rear item without removing
async function rear() {
  if (queue.length === 0) {
    showAlert("Queue is empty! No rear element.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  const rearItem = queue[queue.length - 1];
  const rearElement = document.getElementById(`queue-${rearItem.id}`);

  // Highlight rear item
  if (rearElement) {
    rearElement.classList.add("active");
  }

  await sleep(1000);

  if (rearElement) {
    rearElement.classList.remove("active");
  }

  showAlert(`Rear value: ${rearItem.value}`);
  animating = false;
}

// Clear all items from queue
function clearQueue() {
  if (queue.length === 0) {
    showAlert("Queue is already empty!");
    return;
  }

  queue = [];
  renderQueue();
  showAlert("Queue cleared successfully!");
}

// Display the queue
function renderQueue() {
  const container = document.getElementById("queueContainer");
  const emptyMsg = document.getElementById("emptyMessage");

  if (queue.length === 0) {
    container.innerHTML = "";
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  let html = "";

  // Show items from front to rear
  for (let i = 0; i < queue.length; i++) {
    html += `<div class="queue-item" id="queue-${queue[i].id}">${queue[i].value}</div>`;
  }

  container.innerHTML = html;
}

// Initialize on page load
window.onload = function () {
  renderQueue();
};
