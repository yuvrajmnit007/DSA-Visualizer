// ==================== BINARY TREE ====================
let tree = null; // Root of the tree
let animating = false;

// Build tree from array of values
function buildTree(values) {
  if (values.length === 0 || values[0] === null) {
    return null;
  }

  // Create root node
  const root = {
    value: values[0],
    left: null,
    right: null,
    id: 0,
  };

  const nodeQueue = [root];
  let valueIndex = 1;

  // Build tree level by level
  while (nodeQueue.length > 0 && valueIndex < values.length) {
    const currentNode = nodeQueue.shift();

    // Add left child
    if (valueIndex < values.length && values[valueIndex] !== null) {
      currentNode.left = {
        value: values[valueIndex],
        left: null,
        right: null,
        id: valueIndex,
      };
      nodeQueue.push(currentNode.left);
    }
    valueIndex++;

    // Add right child
    if (valueIndex < values.length && values[valueIndex] !== null) {
      currentNode.right = {
        value: values[valueIndex],
        left: null,
        right: null,
        id: valueIndex,
      };
      nodeQueue.push(currentNode.right);
    }
    valueIndex++;
  }

  return root;
}

// Create tree from user input
function createTree() {
  const input = document.getElementById("inputValue").value;

  if (!input.trim()) {
    showAlert("Please enter values to create a tree!");
    return;
  }

  // Parse input values
  const values = input.split(",").map((v) => {
    const trimmed = v.trim().toLowerCase();
    return trimmed === "" || trimmed === "null" ? null : trimmed;
  });

  tree = buildTree(values);
  document.getElementById("inputValue").value = "";
  document.getElementById("traversalTitle").textContent = "";
  document.getElementById("traversalValues").textContent = "";

  renderTree();
  showAlert(
    `Binary tree created with ${values.filter((v) => v !== null).length} nodes!`
  );
}

// Clear the tree
function clearTree() {
  if (!tree) {
    showAlert("Tree is already empty!");
    return;
  }

  tree = null;
  document.getElementById("traversalTitle").textContent = "";
  document.getElementById("traversalValues").textContent = "";
  renderTree();
  showAlert("Tree cleared successfully!");
}

// Inorder Traversal: Left → Root → Right
async function inorderTraversal() {
  if (!tree) {
    showAlert("Tree is empty! Please create a tree first.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  // Set title
  document.getElementById("traversalTitle").textContent =
    "Inorder Traversal (Left → Root → Right):";
  document.getElementById("traversalValues").textContent = "";

  const result = [];
  await inorderHelper(tree, result);

  showAlert("Inorder traversal completed!");
  renderTree();
  animating = false;
}

async function inorderHelper(node, result) {
  if (!node) return;

  // Visit left subtree first
  await inorderHelper(node.left, result);

  // Then visit root
  highlightNode(node.id, "active");
  result.push(node.value);

  // Update display with current value
  document.getElementById("traversalValues").textContent = result.join(" → ");
  await sleep(800);

  highlightNode(node.id, "visited");
  await sleep(400);

  // Finally visit right subtree
  await inorderHelper(node.right, result);
}

// Preorder Traversal: Root → Left → Right
async function preorderTraversal() {
  if (!tree) {
    showAlert("Tree is empty! Please create a tree first.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  // Set title
  document.getElementById("traversalTitle").textContent =
    "Preorder Traversal (Root → Left → Right):";
  document.getElementById("traversalValues").textContent = "";

  const result = [];
  await preorderHelper(tree, result);

  showAlert("Preorder traversal completed!");
  renderTree();
  animating = false;
}

async function preorderHelper(node, result) {
  if (!node) return;

  // Visit root first
  highlightNode(node.id, "active");
  result.push(node.value);

  // Update display with current value
  document.getElementById("traversalValues").textContent = result.join(" → ");
  await sleep(800);

  highlightNode(node.id, "visited");
  await sleep(400);

  // Then visit left subtree
  await preorderHelper(node.left, result);

  // Finally visit right subtree
  await preorderHelper(node.right, result);
}

// Postorder Traversal: Left → Right → Root
async function postorderTraversal() {
  if (!tree) {
    showAlert("Tree is empty! Please create a tree first.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  // Set title
  document.getElementById("traversalTitle").textContent =
    "Postorder Traversal (Left → Right → Root):";
  document.getElementById("traversalValues").textContent = "";

  const result = [];
  await postorderHelper(tree, result);

  showAlert("Postorder traversal completed!");
  renderTree();
  animating = false;
}

async function postorderHelper(node, result) {
  if (!node) return;

  // Visit left subtree first
  await postorderHelper(node.left, result);

  // Then visit right subtree
  await postorderHelper(node.right, result);

  // Finally visit root
  highlightNode(node.id, "active");
  result.push(node.value);

  // Update display with current value
  document.getElementById("traversalValues").textContent = result.join(" → ");
  await sleep(800);

  highlightNode(node.id, "visited");
  await sleep(400);
}

// Level Order Traversal: Level by Level (Breadth-First)
async function levelorderTraversal() {
  if (!tree) {
    showAlert("Tree is empty! Please create a tree first.");
    return;
  }

  if (animating) {
    showAlert("Animation in progress. Please wait!");
    return;
  }

  animating = true;

  // Set title
  document.getElementById("traversalTitle").textContent =
    "Level Order Traversal (Breadth-First):";
  document.getElementById("traversalValues").textContent = "";

  const result = [];
  const nodeQueue = [tree];

  // Process nodes level by level
  while (nodeQueue.length > 0) {
    const currentNode = nodeQueue.shift();

    // Visit current node
    highlightNode(currentNode.id, "active");
    result.push(currentNode.value);

    // Update display with current value
    document.getElementById("traversalValues").textContent = result.join(" → ");
    await sleep(800);

    highlightNode(currentNode.id, "visited");
    await sleep(400);

    // Add left and right children to queue
    if (currentNode.left) nodeQueue.push(currentNode.left);
    if (currentNode.right) nodeQueue.push(currentNode.right);
  }

  showAlert("Level order traversal completed!");
  renderTree();
  animating = false;
}

// Highlight a tree node
function highlightNode(nodeId, className) {
  const allNodes = document.querySelectorAll(".tree-node");

  allNodes.forEach((node) => {
    const dataId = node.getAttribute("data-node-id");
    if (dataId == nodeId) {
      if (className === "active") {
        node.style.fill = "#22d3ee";
        node.style.stroke = "#06b6d4";
      } else if (className === "visited") {
        node.style.fill = "#10b981";
        node.style.stroke = "#059669";
      }
    }
  });
}

// Calculate tree dimensions for rendering
function getTreeDimensions(node, level = 0, position = 0) {
  if (!node) {
    return { width: 0, height: 0 };
  }

  const leftDim = getTreeDimensions(node.left, level + 1, position * 2);
  const rightDim = getTreeDimensions(node.right, level + 1, position * 2 + 1);

  return {
    width: Math.max(leftDim.width, rightDim.width, position + 1),
    height: Math.max(leftDim.height, rightDim.height, level + 1),
  };
}

// Display the tree
function renderTree() {
  const visualArea = document.getElementById("visualArea");

  if (!tree) {
    visualArea.innerHTML =
      '<p class="empty-state">Enter values to create a binary tree</p>';
    return;
  }

  const dimensions = getTreeDimensions(tree);
  const width = Math.max(800, dimensions.width * 100);
  const height = Math.max(400, dimensions.height * 100);

  let svg = `<svg width="${width}" height="${height}" style="margin: 0 auto; display: block;">`;
  svg += drawNode(tree, width / 2, 50, width / 4);
  svg += "</svg>";

  visualArea.innerHTML = svg;
}

// Draw tree nodes recursively
function drawNode(node, x, y, offset) {
  if (!node) return "";

  let svg = "";

  // Draw lines to children first
  if (node.left) {
    const leftX = x - offset;
    const leftY = y + 80;
    svg += `<line x1="${x}" y1="${y}" x2="${leftX}" y2="${leftY}" class="tree-line" />`;
    svg += drawNode(node.left, leftX, leftY, offset / 2);
  }

  if (node.right) {
    const rightX = x + offset;
    const rightY = y + 80;
    svg += `<line x1="${x}" y1="${y}" x2="${rightX}" y2="${rightY}" class="tree-line" />`;
    svg += drawNode(node.right, rightX, rightY, offset / 2);
  }

  // Draw current node
  svg += `
        <circle cx="${x}" cy="${y}" r="25" class="tree-node" data-node-id="${node.id}" />
        <text x="${x}" y="${y}" class="tree-text">${node.value}</text>
    `;

  return svg;
}

// Initialize on page load
window.onload = function () {
  renderTree();
};
