// ==================== SORTING ALGORITHMS ====================
let array = [];
let animating = false;

// Create array for sorting
function createArray() {
  const input = document.getElementById("inputValue").value;

  if (!input.trim()) {
    showAlert("Please enter values to create an array!");
    return;
  }

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

// Start sorting with selected algorithm
async function startSort() {
  if (array.length === 0) {
    showAlert("Array is empty! Please create an array first.");
    return;
  }

  if (animating) {
    showAlert("Sorting in progress. Please wait!");
    return;
  }

  const algorithm = document.getElementById("algorithmSelect").value;
  animating = true;

  const sortButton = document.getElementById("sortButton");
  sortButton.disabled = true;
  sortButton.textContent = "Sorting...";

  // Call the selected sorting algorithm
  if (algorithm === "bubble") {
    await bubbleSort();
  } else if (algorithm === "selection") {
    await selectionSort();
  } else if (algorithm === "insertion") {
    await insertionSort();
  } else if (algorithm === "merge") {
    await mergeSort();
  }

  sortButton.disabled = false;
  sortButton.textContent = "Start Sort";
  animating = false;
}

// Bubble Sort: Compare adjacent elements and swap
async function bubbleSort() {
  const n = array.length;

  // Go through array multiple times
  for (let i = 0; i < n - 1; i++) {
    // Compare adjacent elements
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight elements being compared
      highlightComparing([j, j + 1]);
      await sleep(300);

      // Swap if in wrong order
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray();
        await sleep(300);
      }

      clearHighlights();
    }

    // Mark last element as sorted
    markSorted(n - i - 1);
  }

  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    markSorted(i);
  }

  showAlert("Bubble Sort completed!");
}

// Selection Sort: Find minimum and place at beginning
async function selectionSort() {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find minimum element in remaining array
    for (let j = i + 1; j < n; j++) {
      highlightComparing([minIndex, j]);
      await sleep(300);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }

      clearHighlights();
    }

    // Swap minimum with first element
    if (minIndex !== i) {
      highlightComparing([i, minIndex]);
      await sleep(300);

      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      renderArray();
      await sleep(300);
    }

    markSorted(i);
    clearHighlights();
  }

  markSorted(n - 1);
  showAlert("Selection Sort completed!");
}

// Insertion Sort: Insert each element in correct position
async function insertionSort() {
  const n = array.length;
  markSorted(0);

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    highlightComparing([i]);
    await sleep(300);

    // Shift elements greater than key to right
    while (j >= 0 && array[j] > key) {
      highlightComparing([j, j + 1]);
      await sleep(300);

      array[j + 1] = array[j];
      renderArray();
      j--;
    }

    // Insert key at correct position
    array[j + 1] = key;
    renderArray();
    markSorted(i);
    clearHighlights();
    await sleep(300);
  }

  showAlert("Insertion Sort completed!");
}

// Merge Sort: Divide and conquer approach
async function mergeSort() {
  await mergeSortHelper(0, array.length - 1);

  // Mark all as sorted
  for (let i = 0; i < array.length; i++) {
    markSorted(i);
  }

  showAlert("Merge Sort completed!");
}

async function mergeSortHelper(left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Sort left half
    await mergeSortHelper(left, mid);
    // Sort right half
    await mergeSortHelper(mid + 1, right);
    // Merge both halves
    await merge(left, mid, right);
  }
}

async function merge(left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temporary arrays
  const leftArray = array.slice(left, mid + 1);
  const rightArray = array.slice(mid + 1, right + 1);

  let i = 0,
    j = 0,
    k = left;

  // Merge the arrays
  while (i < n1 && j < n2) {
    highlightComparing([k]);
    await sleep(200);

    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }

    renderArray();
    k++;
  }

  // Copy remaining elements
  while (i < n1) {
    highlightComparing([k]);
    array[k] = leftArray[i];
    renderArray();
    await sleep(200);
    i++;
    k++;
  }

  while (j < n2) {
    highlightComparing([k]);
    array[k] = rightArray[j];
    renderArray();
    await sleep(200);
    j++;
    k++;
  }

  clearHighlights();
}

// Display sorting array as bars
function renderArray() {
  const visualArea = document.getElementById("visualArea");

  if (array.length === 0) {
    visualArea.innerHTML =
      '<p class="empty-state">Create an array to get started</p>';
    return;
  }

  const maxValue = Math.max(...array);
  const maxHeight = 400;

  let html =
    '<div style="display: flex; gap: 5px; align-items: flex-end; justify-content: center;">';

  for (let i = 0; i < array.length; i++) {
    const height = (array[i] / maxValue) * maxHeight;
    const width = Math.max(30, 500 / array.length);

    html += `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div class="array-bar" id="bar-${i}" 
                     style="width: ${width}px; height: ${height}px; min-height: 40px;">
                    ${array[i]}
                </div>
            </div>
        `;
  }

  html += "</div>";
  visualArea.innerHTML = html;
}

// Highlight elements being compared
function highlightComparing(indices) {
  clearHighlights();

  indices.forEach((index) => {
    const bar = document.getElementById(`bar-${index}`);
    if (bar) {
      bar.classList.add("comparing");
    }
  });
}

// Mark element as sorted
function markSorted(index) {
  const bar = document.getElementById(`bar-${index}`);
  if (bar) {
    bar.classList.remove("comparing");
    bar.classList.add("sorted");
  }
}

// Remove highlights from all unsorted elements
function clearHighlights() {
  for (let i = 0; i < array.length; i++) {
    const bar = document.getElementById(`bar-${i}`);
    if (bar && !bar.classList.contains("sorted")) {
      bar.classList.remove("comparing");
    }
  }
}

// Initialize on page load
window.onload = function () {
  renderArray();
};
