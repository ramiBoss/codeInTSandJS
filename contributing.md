---
layout: default
title: "Contributing"
permalink: /contributing/
---

# 🤝 Contributing

We welcome contributions to this algorithms and data structures repository! Here's how you can help improve the project.

## 🚀 Getting Started

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/yourusername/codeInTSandJS.git
   cd codeInTSandJS
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # Example: git checkout -b feature/add-heap-implementation
   ```

3. **Make Your Changes**
   - Follow the existing code style and structure
   - Add comprehensive comments for complex algorithms
   - Include time and space complexity analysis where applicable

4. **Test Your Code**
   ```bash
   # For TypeScript files
   npx ts-node path/to/your/file.ts
   
   # For JavaScript files
   node path/to/your/file.js
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Navigate to the original repository on GitHub
   - Click "New Pull Request"
   - Provide a clear description of your changes

## 📋 Contribution Guidelines

### Code Style

#### TypeScript
- Use strong typing with interfaces and type annotations
- Follow camelCase naming convention
- Use modern ES6+ features
- Include comprehensive JSDoc comments

```typescript
/**
 * Represents a node in a binary search tree
 */
interface TreeNode {
    value: number;
    left?: TreeNode;
    right?: TreeNode;
}

/**
 * Inserts a value into the BST
 * @param root - The root node of the tree
 * @param value - The value to insert
 * @returns The updated root node
 */
function insert(root: TreeNode | null, value: number): TreeNode {
    // Implementation here
}
```

#### JavaScript
- Use ES6+ syntax (const/let, arrow functions, destructuring)
- Follow consistent naming conventions
- Add clear comments for complex logic

```javascript
/**
 * Two Sum - Find two numbers that add up to target
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const twoSum = (nums, target) => {
    const map = new Map();
    // Implementation here
};
```

### File Organization

```
Algorithm/Category/
├── AlgorithmName.ts      # TypeScript implementation
├── AlgorithmName.js      # JavaScript implementation (if applicable)
└── README.md            # Algorithm-specific documentation (optional)
```

### What to Include

1. **Algorithm Implementations**
   - Time complexity analysis
   - Space complexity analysis
   - Clear variable names
   - Step-by-step comments

2. **Data Structure Implementations**
   - All basic operations (insert, delete, search, etc.)
   - Edge case handling
   - Usage examples

3. **Problem Solutions**
   - Problem statement (as comment)
   - Approach explanation
   - Test cases
   - Alternative solutions (if applicable)

4. **Documentation**
   - Update README.md if adding new categories
   - Include usage examples
   - Add complexity analysis

## 🎯 Areas for Contribution

### High Priority
- [ ] Unit tests for existing implementations
- [ ] Time/space complexity documentation
- [ ] More comprehensive examples
- [ ] Performance benchmarks

### Algorithm Categories Needed
- [ ] Dynamic Programming algorithms
- [ ] Graph algorithms (Dijkstra, Floyd-Warshall, etc.)
- [ ] String algorithms (KMP, Rabin-Karp, etc.)
- [ ] Advanced sorting (Radix, Counting, Bucket)
- [ ] Tree algorithms (AVL, Red-Black trees)

### Data Structures Needed
- [ ] Heap (Min/Max heap)
- [ ] Trie
- [ ] Graph representations
- [ ] Hash Table implementation
- [ ] Disjoint Set (Union-Find)

### Improvements Needed
- [ ] Add visualization examples
- [ ] Interactive demonstrations
- [ ] Performance comparisons
- [ ] More low-level design patterns

## 🐛 Reporting Issues

When reporting bugs or requesting features:

1. **Check existing issues** first
2. **Use descriptive titles**
3. **Include reproduction steps** for bugs
4. **Provide context** for feature requests
5. **Add relevant labels**

## 📚 Resources

- [Big O Notation Guide](https://www.bigocheatsheet.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JavaScript MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)

## 🏆 Recognition

Contributors will be acknowledged in:
- Repository README
- Individual file headers (for significant contributions)
- Release notes

## 📞 Questions?

Feel free to:
- Open an issue for questions
- Start a discussion in GitHub Discussions
- Reach out to maintainers

Thank you for contributing! 🎉

---

[← Problems](/problems/) | [Home](/)
