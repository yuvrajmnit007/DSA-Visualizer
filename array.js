// ==================== ARRAY ALGORITHMS ====================
let array = []; // Store array elements
let animating = false;

// Create array from user input
function createArray() {
  const input = document.getElementById("inputValue").value;

  if (!input.trim()) {
    showAlert("Please enter values to create an array!");
    return;
  }

  // Parse and filter valid numbers
  const values = input
    .split(",")
    .map((v) => parseInt(v.trim()))
    .filter((v) => !isNaN(v));

  if (values.length === 0) {
    showAlert("Please enter valid numbers!");
    return;
  }

  array = values;
  document.getElementById("inputValue").value = "";

  renderArray();
  showAlert(`Array created with ${values.length} elements!`);
}

// Linear Search: Check each element one by one
async function linearSearch() {
  if (array.length === 0) {
    showAlert("Array is empty! Please create an array first.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const searchInput = document.getElementById("searchValue").value;
  if (!searchInput.trim()) {
    showAlert("Please enter a value to search!");
    return;
  }

  const target = parseInt(searchInput.trim());
  if (isNaN(target)) {
    showAlert("Please enter a valid number!");
    return;
  }

  animating = true;
  renderArray();

  // Check each element
  for (let i = 0; i < array.length; i++) {
    // Highlight current element
    highlightElement(i, "active");
    await sleep(500);

    // Check if this is the target
    if (array[i] === target) {
      // Found it!
      highlightElement(i, "found");
      await sleep(1000);
      showAlert(`Value ${target} found at index ${i}!`);
      renderArray();
      animating = false;
      return;
    }

    // Mark as checked
    highlightElement(i, "visited");
  }

  // Not found
  renderArray();
  showAlert(`Value ${target} not found in the array.`);
  animating = false;
}

// Binary Search: For sorted arrays only
async function binarySearch() {
  if (array.length === 0) {
    showAlert("Array is empty! Please create an array first.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const searchInput = document.getElementById("searchValue").value;
  if (!searchInput.trim()) {
    showAlert("Please enter a value to search!");
    return;
  }

  const target = parseInt(searchInput.trim());
  if (isNaN(target)) {
    showAlert("Please enter a valid number!");
    return;
  }

  // Check if array is sorted
  const isSorted = array.every((val, i) => i === 0 || val >= array[i - 1]);
  if (!isSorted) {
    showAlert(
      "Binary search requires a sorted array! Please use a sorted array."
    );
    return;
  }

  animating = true;
  renderArray();

  let low = 0;
  let high = array.length - 1;

  // Keep dividing the array in half
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Show low, mid, and high pointers
    highlightPointers(low, mid, high);
    await sleep(1000);

    // Check if mid is the target
    if (array[mid] === target) {
      // Found it!
      renderArray();
      highlightElement(mid, "found");
      await sleep(1000);
      showAlert(`Value ${target} found at index ${mid}!`);
      renderArray();
      animating = false;
      return;
    }
    // Target is in right half
    else if (array[mid] < target) {
      low = mid + 1;
    }
    // Target is in left half
    else {
      high = mid - 1;
    }

    await sleep(400);
  }

  // Not found
  renderArray();
  showAlert(`Value ${target} not found in the array.`);
  animating = false;
}

// Display the array
function renderArray() {
  const visualArea = document.getElementById("visualArea");

  if (array.length === 0) {
    visualArea.innerHTML =
      '<p class="empty-state">Create an array to get started</p>';
    return;
  }

  let html =
    '<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; align-items: flex-end;">';

  for (let i = 0; i < array.length; i++) {
    html += `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <div class="array-bar" id="array-${i}" style="position: relative;">
                    ${array[i]}
                </div>
                <div style="color: #64748b; font-size: 0.85rem;">${i}</div>
            </div>
        `;
  }

  html += "</div>";
  visualArea.innerHTML = html;
}

// Highlight a single element
function highlightElement(index, className) {
  const element = document.getElementById(`array-${index}`);
  if (element) {
    element.classList.remove("active", "visited", "found");
    element.classList.add(className);
  }
}

// Show low, mid, and high pointers for binary search
function highlightPointers(low, mid, high) {
  renderArray();

  const lowElement = document.getElementById(`array-${low}`);
  const midElement = document.getElementById(`array-${mid}`);
  const highElement = document.getElementById(`array-${high}`);

  // Highlight LOW pointer (blue)
  if (lowElement) {
    lowElement.style.border = "3px solid #3b82f6";
    lowElement.style.boxShadow = "0 0 15px rgba(59, 130, 246, 0.6)";
    const label = document.createElement("div");
    label.className = "pointer-label pointer-low";
    label.textContent = "LOW";
    label.style.position = "absolute";
    label.style.top = "-25px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    lowElement.appendChild(label);
  }

  // Highlight MID pointer (yellow)
  if (midElement) {
    midElement.style.border = "3px solid #fbbf24";
    midElement.style.boxShadow = "0 0 15px rgba(251, 191, 36, 0.6)";
    const label = document.createElement("div");
    label.className = "pointer-label pointer-mid";
    label.textContent = "MID";
    label.style.position = "absolute";
    label.style.top = "-25px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    midElement.appendChild(label);
  }

  // Highlight HIGH pointer (red)
  if (highElement) {
    highElement.style.border = "3px solid #ef4444";
    highElement.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.6)";
    const label = document.createElement("div");
    label.className = "pointer-label pointer-high";
    label.textContent = "HIGH";
    label.style.position = "absolute";
    label.style.top = "-25px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    highElement.appendChild(label);
  }
}

// Initialize on page load
window.onload = function () {
  renderArray();
};
