# 🎯 DSA Visualizer

An interactive **Data Structures and Algorithms Visualizer** built using  
**HTML, CSS, and Vanilla JavaScript** to help understand algorithms through
step-by-step animations.

![License](https://img.shields.io/badge/License-MIT-green.svg)
![HTML](https://img.shields.io/badge/HTML-5-orange.svg)
![CSS](https://img.shields.io/badge/CSS-3-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)

---

## 🔥 Features

### 📌 Data Structures

#### **Linked List**
- Create from comma-separated array input
- **Insert** (head, tail, position)
- **Delete** (head, position)
- **Search** with animated traversal
- **Find Middle** using slow & fast pointer technique
- **Reverse** with detailed step-by-step animation

#### **Stack**
- **Push**, **Pop**, **Peek** operations
- Visualized as a vertical container with **TOP** pointer
- Clear stack functionality

#### **Queue**
- **Enqueue**, **Dequeue** operations
- **Front** and **Rear** value inspection
- Visualized as a horizontal container with **FRONT** & **REAR** pointers
- Clear queue functionality

#### **Binary Tree**
- Build tree from array input (level-order)
- **Inorder Traversal** (Left → Root → Right)
- **Preorder Traversal** (Root → Left → Right)
- **Postorder Traversal** (Left → Right → Root)
- **Level Order Traversal** (Breadth-First)
- Live value display during traversals
- Animated node highlighting

---

### 📊 Array & Algorithms

#### **Search Algorithms**
- **Linear Search** - Animated sequential traversal
- **Binary Search** - Visual representation with LOW, MID, HIGH pointers

#### **Sorting Algorithms**
- **Bubble Sort** - Compare and swap adjacent elements
- **Selection Sort** - Find minimum and place at beginning
- **Insertion Sort** - Insert elements in correct position
- **Merge Sort** - Divide and conquer approach

All sorting algorithms feature:
- Real-time comparison highlighting
- Bar chart visualization
- Color-coded sorted elements
- Step-by-step animation

---

## 🛠 Tech Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Logic, DOM manipulation, and async animations
- **SVG** - Binary tree visualization
- **No external libraries** - Pure vanilla JavaScript!

---

## 📂 Project Structure

```
dsa-visualizer/
│
├── index.html              # Main dashboard page
├── linkedlist.html         # Linked List visualizer
├── stack.html              # Stack visualizer
├── queue.html              # Queue visualizer
├── tree.html               # Binary Tree visualizer
├── array.html              # Array search algorithms
├── sorting.html            # Sorting algorithms
│
├── style.css               # Complete styling
│
├── common.js               # Shared utilities (modal, sleep)
├── linkedlist.js           # Linked List logic
├── stack.js                # Stack logic
├── queue.js                # Queue logic
├── tree.js                 # Binary Tree & traversals
├── array.js                # Search algorithms logic
├── sorting.js              # Sorting algorithms logic
│
├── README.md               # Project documentation
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
└── CHANGELOG.md            # Version history
```

---

## 🌐 Live Demo

**🔗 [Try it live here!](https://yuvrajmnit007.github.io/DSA-Visualizer/)**

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yuvrajmnit007/DSA-Visualizer.git
   cd DSA-Visualizer
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended):
   
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. **Access the application**
   ```
   Open: http://localhost:8000
   ```

---

## 🎮 How to Use

### Linked List
1. Enter comma-separated values (e.g., `1,2,3,4,5`)
2. Click **Create List**
3. Use operations: Insert Head/Tail, Delete, Search, Find Middle, Reverse
4. Watch the animated visualization!

### Stack & Queue
1. Enter a value
2. Click **Push/Enqueue** to add
3. Click **Pop/Dequeue** to remove
4. Use **Peek/Front/Rear** to view without removing

### Binary Tree
1. Enter level-order values (e.g., `1,2,3,4,5,null,6`)
2. Use `null` for empty nodes
3. Click **Create Tree**
4. Try different traversals and watch step-by-step animations

### Array Search & Sorting
1. Enter comma-separated numbers
2. Click **Create Array**
3. For search: Enter value to find
4. For sorting: Select algorithm and click **Start Sort**
5. Watch the algorithm in action!

---

## 🎨 Color Coding

- **🔵 Cyan/Blue** - Currently active/being processed
- **🟢 Green** - Found/Completed/Sorted
- **🔷 Light Blue** - Visited/Checked
- **🔵 Blue Border** - LOW pointer (Binary Search)
- **🟡 Yellow Border** - MID pointer (Binary Search)
- **🔴 Red Border** - HIGH pointer (Binary Search)

---

## 🎯 Learning Outcomes

- ✅ **Visual Understanding** of how algorithms work step-by-step
- ✅ **Pointer-Based Operations** (slow-fast pointer, two-pointer technique)
- ✅ **Time Complexity Intuition** by watching algorithm execution
- ✅ **Debugging Skills** through visual representation
- ✅ **Algorithm Comparison** by trying different sorting methods
- ✅ **Tree Traversal Mastery** with animated node visits
- ✅ **Clean Code Practices** from well-organized, commented codebase

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📝 Future Enhancements

- [ ] Graph algorithms (BFS, DFS, Dijkstra)
- [ ] AVL Tree with rotations
- [ ] Hash Table visualization
- [ ] Algorithm complexity analysis display
- [ ] Dark/Light theme toggle
- [ ] Animation speed control
- [ ] Mobile app version
- [ ] Export visualization as GIF

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Yuvraj Choudhary**

- 🌐 GitHub: [@yuvrajmnit007](https://github.com/yuvrajmnit007)
- 💼 LinkedIn: [Yuvraj Choudhary](https://www.linkedin.com/in/yuvrajchoudhary007/)
- 📧 Email: yuvraj.choudhary@example.com *(Update with your actual email)*

---

## 🙏 Acknowledgments

- Inspired by algorithm visualization tools like VisuAlgo
- Built with ❤️ for students learning Data Structures & Algorithms
- Thanks to the open-source community for inspiration

---

## ⭐ Show Your Support

If this project helped you learn DSA concepts, please give it a ⭐ on GitHub!

**Star the repo** · **Share with friends** · **Report bugs** · **Suggest features**

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yuvrajmnit007/DSA-Visualizer?style=social)
![GitHub forks](https://img.shields.io/github/forks/yuvrajmnit007/DSA-Visualizer?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yuvrajmnit007/DSA-Visualizer?style=social)

---

**Made with 💙 by Yuvraj Choudhary** | **Last Updated: December 2025**