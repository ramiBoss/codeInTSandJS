# Code in TypeScript and JavaScript

A comprehensive collection of algorithms, data structures, and coding problem solutions implemented in both TypeScript and JavaScript.

## 📁 Repository Structure

```
├── Algorithms/                 # Core algorithms implementation
│   ├── BFS/                   # Breadth-First Search
│   ├── DFS/                   # Depth-First Search
│   ├── DivideAndConquer/      # Divide and conquer algorithms
│   ├── Greedy/                # Greedy algorithms
│   ├── Searching/             # Search algorithms
│   └── Sorting/               # Sorting algorithms
├── DataStructure/             # Data structure implementations
│   ├── Arrays/                # Array operations
│   ├── BST/                   # Binary Search Tree
│   ├── DoublyLinkedList/      # Doubly linked list
│   ├── LinkedList/            # Singly linked list
│   ├── Queue/                 # Queue implementation
│   └── Stack/                 # Stack implementation
├── leetcode/                  # Coding problem solutions (JavaScript)
├── TSLeetcode/               # Coding problem solutions (TypeScript)
└── lld/                      # Low-Level Design examples
```

## 🚀 Features

### Algorithms
- **Graph Traversal**: BFS and DFS implementations
- **Sorting**: Multiple sorting algorithms including:
  - Bubble Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Selection Sort
- **Searching**: Various search algorithms
- **Divide and Conquer**: Classic algorithmic paradigm implementations
- **Greedy**: Greedy algorithm solutions

### Data Structures
- **Linear Data Structures**:
  - Arrays with common operations
  - Singly and Doubly Linked Lists
  - Stacks and Queues
- **Tree Data Structures**:
  - Binary Search Tree (BST)
- **Advanced Operations**: Insert, delete, search, and traversal operations

### Problem Solving
- **Coding Solutions**: Multiple problems solved in both JavaScript and TypeScript
- **Low-Level Design**: System design patterns and implementations

## 🛠️ Technologies Used

- **TypeScript**: Modern, type-safe JavaScript with enhanced developer experience
- **JavaScript**: ES6+ features for clean and efficient code
- **Node.js**: Runtime environment for executing JavaScript

## 📋 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TypeScript (for TS files)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install TypeScript globally (if not already installed):
```bash
npm install -g typescript
```

### Running the Code

#### JavaScript Files
```bash
node path/to/file.js
```

#### TypeScript Files
```bash
# Compile and run
tsc path/to/file.ts && node path/to/file.js

# Or use ts-node for direct execution
npx ts-node path/to/file.ts
```

## 📚 Code Examples

### Data Structure Usage
```typescript
// Example: Using any tree data structure
const dataStructure = new TreeStructure();
dataStructure.insert(value);
dataStructure.delete(value);
console.log(dataStructure.search(value));
```

### Algorithm Implementation
```typescript
// Example: Graph traversal algorithms
const result = algorithmFunction(inputData);
console.log(result); // Output based on algorithm
```

### Problem Solutions
```javascript
// Example: Common coding problems
const input = [/* your input data */];
const target = /* target value */;
const result = solutionFunction(input, target);
console.log(result); // Solution output
```

## 🎯 Problems Included

This repository contains solutions to various coding problems including:
- Array manipulation problems
- String processing challenges
- Tree and graph algorithms
- Dynamic programming solutions
- Mathematical computations
- Data structure implementations
- System design problems
- And many more algorithmic challenges...

## 🏗️ System Design Examples

The repository includes low-level design implementations that demonstrate:
- **Object-Oriented Design**: Proper class structure and encapsulation
- **Design Patterns**: Common software design patterns
- **System Architecture**: Modular and scalable system designs
- **Best Practices**: Clean code and separation of concerns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and structure
- Add comments for complex algorithms
- Include test cases where applicable
- Update documentation as needed

## 📝 Code Style

- **TypeScript**: Strong typing, interfaces, and modern ES6+ features
- **JavaScript**: ES6+ syntax, consistent naming conventions
- **Comments**: Comprehensive documentation for complex algorithms
- **Structure**: Organized by algorithm/data structure type

## 📖 Learning Resources

This repository serves as:
- **Interview Preparation**: Common algorithms and data structures
- **Reference Material**: Well-documented implementations
- **Practice Platform**: LeetCode and coding challenges
- **Design Patterns**: Low-level system design examples

## 🔧 Future Enhancements

- [ ] Add unit tests for all implementations
- [ ] Include time and space complexity analysis
- [ ] Add more advanced algorithms (Dynamic Programming, Graph algorithms)
- [ ] Implement more data structures (Heap, Trie, Graph)
- [ ] Add interactive examples and visualizations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Feel free to reach out if you have any questions or suggestions!

---

⭐ **Star this repository if you find it helpful!** ⭐

## 🌐 GitHub Pages Deployment

This repository is configured for GitHub Pages deployment. To set up your own GitHub Pages site:

### Automatic Deployment
1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **main** branch and **/ (root)** folder
4. Your site will be available at: `https://yourusername.github.io/repository-name`

### Local Development
```bash
# Install Jekyll (one-time setup)
gem install bundler jekyll

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# View at http://localhost:4000
```

### Site Structure
- `index.md` - Homepage
- `algorithms.md` - Algorithms documentation
- `data-structures.md` - Data structures guide  
- `problems.md` - Problem solutions catalog
- `contributing.md` - Contribution guidelines
- `_config.yml` - Jekyll configuration
