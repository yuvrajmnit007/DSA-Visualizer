let head = null; // Start of linked list
let animating = false; // Prevent multiple animations at once

// Create a new linked list from user input
function createList() {
  const input = document.getElementById("inputValue").value;

  // Check if input is empty
  if (!input.trim()) {
    showAlert("Please enter values to create a linked list!");
    return;
  }

  // Split input by comma and clean up
  const values = input
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v);

  if (values.length === 0) {
    showAlert("Please enter valid values!");
    return;
  }

  // Create first node
  head = {
    value: values[0],
    next: null,
    id: 0,
  };

  // Add remaining nodes
  let currentNode = head;
  for (let i = 1; i < values.length; i++) {
    currentNode.next = {
      value: values[i],
      next: null,
      id: i,
    };
    currentNode = currentNode.next;
  }

  document.getElementById("inputValue").value = "";
  renderList();
  showAlert(`Linked list created with ${values.length} node(s)!`);
}

// Insert a new node at the beginning
async function insertAtHead() {
  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const input = document.getElementById("inputValue").value;
  if (!input.trim()) {
    showAlert("Please enter a value to insert!");
    return;
  }

  animating = true;

  // Create new node
  const newNode = {
    value: input.trim(),
    next: head,
    id: Date.now(),
  };

  head = newNode;
  document.getElementById("inputValue").value = "";

  // Show animation
  await renderListWithAnimation(newNode.id, "active");
  await sleep(500);
  renderList();

  animating = false;
}

// Insert a new node at the end
async function insertAtTail() {
  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const input = document.getElementById("inputValue").value;
  if (!input.trim()) {
    showAlert("Please enter a value to insert!");
    return;
  }

  animating = true;

  // If list is empty, insert at head
  if (!head) {
    await insertAtHead();
    return;
  }

  // Go to the last node
  let currentNode = head;
  while (currentNode.next) {
    await highlightNode(currentNode.id, "visited");
    await sleep(300);
    currentNode = currentNode.next;
  }

  await highlightNode(currentNode.id, "visited");
  await sleep(300);

  // Create and attach new node
  const newNode = {
    value: input.trim(),
    next: null,
    id: Date.now(),
  };

  currentNode.next = newNode;
  document.getElementById("inputValue").value = "";

  await renderListWithAnimation(newNode.id, "active");
  await sleep(500);
  renderList();

  animating = false;
}

// Insert a node at specific position
async function insertAtPosition() {
  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const input = document.getElementById("inputValue").value;
  const posInput = document.getElementById("positionValue").value;

  if (!input.trim() || !posInput) {
    showAlert("Please enter both value and position!");
    return;
  }

  const position = parseInt(posInput);
  if (isNaN(position) || position < 0) {
    showAlert("Please enter a valid position (0 or greater)!");
    return;
  }

  animating = true;

  // Position 0 means insert at head
  if (position === 0) {
    await insertAtHead();
    return;
  }

  // If list is empty
  if (!head) {
    showAlert("List is empty! Creating list with this value.");
    await insertAtHead();
    return;
  }

  // Navigate to position
  let currentNode = head;
  let index = 0;

  while (currentNode && index < position - 1) {
    await highlightNode(currentNode.id, "visited");
    await sleep(300);
    currentNode = currentNode.next;
    index++;
  }

  if (!currentNode) {
    showAlert("Position exceeds list length!");
    animating = false;
    return;
  }

  // Insert new node
  const newNode = {
    value: input.trim(),
    next: currentNode.next,
    id: Date.now(),
  };

  currentNode.next = newNode;
  document.getElementById("inputValue").value = "";
  document.getElementById("positionValue").value = "";

  await renderListWithAnimation(newNode.id, "active");
  await sleep(500);
  renderList();

  animating = false;
}

// Delete the first node
async function deleteHead() {
  if (!head) {
    showAlert("List is empty! Nothing to delete.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  // Highlight node to be deleted
  await highlightNode(head.id, "active");
  await sleep(500);

  const deletedValue = head.value;
  head = head.next;
  renderList();

  showAlert(`Deleted node with value: ${deletedValue}`);
  animating = false;
}

// Delete node at specific position
async function deleteAtPosition() {
  if (!head) {
    showAlert("List is empty! Nothing to delete.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  const posInput = document.getElementById("positionValue").value;
  if (!posInput) {
    showAlert("Please enter a position to delete!");
    return;
  }

  const position = parseInt(posInput);
  if (isNaN(position) || position < 0) {
    showAlert("Please enter a valid position (0 or greater)!");
    return;
  }

  animating = true;

  // Position 0 means delete head
  if (position === 0) {
    await deleteHead();
    return;
  }

  // Navigate to node before target
  let currentNode = head;
  let index = 0;

  while (currentNode && index < position - 1) {
    await highlightNode(currentNode.id, "visited");
    await sleep(300);
    currentNode = currentNode.next;
    index++;
  }

  if (!currentNode || !currentNode.next) {
    showAlert("Position exceeds list length!");
    animating = false;
    return;
  }

  // Highlight and delete
  await highlightNode(currentNode.next.id, "active");
  await sleep(500);

  const deletedValue = currentNode.next.value;
  currentNode.next = currentNode.next.next;
  document.getElementById("positionValue").value = "";

  renderList();
  showAlert(`Deleted node with value: ${deletedValue}`);
  animating = false;
}

// Search for a value in the list
async function searchInList() {
  if (!head) {
    showAlert("List is empty! Nothing to search.");
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

  animating = true;
  renderList();

  let currentNode = head;
  let position = 0;

  // Go through each node
  while (currentNode) {
    await highlightNode(currentNode.id, "active");
    await sleep(500);

    // Check if this is the value we're looking for
    if (currentNode.value === searchInput.trim()) {
      await highlightNode(currentNode.id, "found");
      await sleep(1000);
      renderList();
      showAlert(`Value "${searchInput.trim()}" found at position ${position}!`);
      animating = false;
      return;
    }

    await highlightNode(currentNode.id, "visited");
    currentNode = currentNode.next;
    position++;
  }

  // Not found
  renderList();
  showAlert(`Value "${searchInput.trim()}" not found in the list.`);
  animating = false;
}

// Find the middle node using slow and fast pointer
async function findMiddle() {
  if (!head) {
    showAlert("List is empty! Cannot find middle.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;
  renderList();

  let slowPointer = head;
  let fastPointer = head;
  let slowPosition = 0;

  // Fast pointer moves 2 steps, slow pointer moves 1 step
  while (fastPointer && fastPointer.next) {
    await highlightPointers(slowPointer.id, fastPointer.id);
    await sleep(800);

    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    slowPosition++;
  }

  // Show the middle node
  await highlightNode(slowPointer.id, "found");
  await sleep(1500);
  renderList();

  showAlert(
    `Middle node found at position ${slowPosition} with value: ${slowPointer.value}`
  );
  animating = false;
}

// Reverse the linked list with detailed animation
async function reverseList() {
  if (!head) {
    showAlert("List is empty! Cannot reverse.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;
  renderList();
  await sleep(500);

  let previousNode = null;
  let currentNode = head;
  let nextNode = null;
  let stepCount = 0;

  // Process each node one by one
  while (currentNode) {
    stepCount++;

    // Highlight current node being processed
    await highlightNode(currentNode.id, "active");
    await sleep(800);

    // Store next node before reversing the link
    nextNode = currentNode.next;

    // Reverse the link - point current to previous
    currentNode.next = previousNode;

    // Show the reversal
    renderList();
    await sleep(800);

    // Mark as processed
    await highlightNode(currentNode.id, "visited");
    await sleep(400);

    // Move pointers forward
    previousNode = currentNode;
    currentNode = nextNode;
  }

  // Update head to the new first node
  head = previousNode;
  renderList();

  showAlert(`List reversed successfully in ${stepCount} steps!`);
  animating = false;
}

// Display the linked list
function renderList() {
  const visualArea = document.getElementById("visualArea");

  if (!head) {
    visualArea.innerHTML =
      '<p class="empty-state">Create a linked list to get started</p>';
    return;
  }

  let html =
    '<div style="display: flex; align-items: center; flex-wrap: wrap; gap: 10px; justify-content: center;">';

  let currentNode = head;
  while (currentNode) {
    html += `<div class="node" id="node-${currentNode.id}">${currentNode.value}</div>`;

    if (currentNode.next) {
      html += '<span class="node-arrow">→</span>';
    }

    currentNode = currentNode.next;
  }

  html += "</div>";
  visualArea.innerHTML = html;
}

// Display list with specific node highlighted
async function renderListWithAnimation(nodeId, className) {
  renderList();
  if (nodeId) {
    const node = document.getElementById(`node-${nodeId}`);
    if (node) {
      node.classList.add(className);
    }
  }
}

// Highlight a specific node
async function highlightNode(nodeId, className) {
  const node = document.getElementById(`node-${nodeId}`);
  if (node) {
    node.classList.remove("active", "visited", "found");
    node.classList.add(className);
  }
}

// Show slow and fast pointers
async function highlightPointers(slowId, fastId) {
  renderList();

  const slowNode = document.getElementById(`node-${slowId}`);
  const fastNode = document.getElementById(`node-${fastId}`);

  if (slowNode) {
    slowNode.style.border = "3px solid #3b82f6";
    slowNode.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.6)";
    const label = document.createElement("div");
    label.className = "slow-pointer";
    label.textContent = "SLOW";
    slowNode.appendChild(label);
  }

  if (fastNode) {
    fastNode.style.border = "3px solid #ef4444";
    fastNode.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.6)";
    const label = document.createElement("div");
    label.className = "fast-pointer";
    label.textContent = "FAST";
    fastNode.appendChild(label);
  }
}

// Initialize on page load
window.onload = function () {
  renderList();
};
