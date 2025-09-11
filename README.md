# Coding Problems with TDD

A Test-Driven Development approach to solving coding problems with comprehensive testing and documentation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode (for TDD)
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test
npm run test:file two-sum

# Build TypeScript
npm run build
```

## 📁 Project Structure

```
src/
├── arrays/                 # Array-based problems
├── strings/               # String manipulation problems  
├── trees/                 # Tree and binary tree problems
├── graphs/                # Graph algorithms
├── dynamic-programming/   # DP problems
├── sorting/              # Sorting algorithms
├── searching/            # Search algorithms
└── utils/                # Helper functions and types
```

## 🧪 TDD Workflow

1. **Red**: Write a failing test first
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests green

### Example TDD Process:

```typescript
// 1. RED: Write failing test
describe('Two Sum', () => {
  it('should find two numbers that add up to target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });
});

// 2. GREEN: Implement minimal solution
export function twoSum(nums: number[], target: number): number[] {
  // Implementation here
}

// 3. REFACTOR: Optimize and improve
```

## 📝 Problem Template

Each problem follows this structure:

```
problem-name/
├── problem-name.ts          # Solution implementation
├── problem-name.test.ts     # Test cases
└── README.md               # Problem description and analysis
```

## 🏃‍♂️ Running Tests

```bash
# All tests
npm test

# Watch mode (recommended for TDD)
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test pattern
npm run test:specific "Two Sum"

# Specific file
npm run test:file arrays/two-sum
```

## 📊 Test Coverage

Coverage reports are generated in the `coverage/` directory. Open `coverage/lcov-report/index.html` in your browser to view detailed coverage.

## 🎯 Problem Categories

- **Arrays & Hash Maps**: Two pointers, sliding window, hash table techniques
- **Strings**: Pattern matching, palindromes, substring problems
- **Trees**: Binary trees, BST, tree traversals
- **Graphs**: BFS, DFS, shortest paths
- **Dynamic Programming**: Memoization, tabulation
- **Sorting & Searching**: Various sorting algorithms and binary search

## 🔧 Development Commands

```bash
npm run dev          # Development mode with nodemon
npm run build        # Compile TypeScript
npm run lint         # Check code style
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run clean        # Clean build artifacts
```

## 📈 Best Practices

- Write tests before implementation (TDD)
- Include time and space complexity analysis
- Add comprehensive test cases including edge cases
- Document algorithm approach and trade-offs
- Use descriptive variable names and comments
