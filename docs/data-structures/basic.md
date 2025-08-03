# 基础数据结构

## 概述

数据结构是计算机存储、组织数据的方式，是算法的基础。掌握基础数据结构对于解决编程问题至关重要。

## 数组 (Array)

数组是最基础的数据结构，它是一块连续的内存空间，用于存储相同类型的数据。

### 数组的特点
- **随机访问**：O(1) 时间复杂度
- **插入删除**：O(n) 时间复杂度（需要移动元素）
- **连续存储**：内存空间连续

### 数组操作
```javascript
// 数组基本操作
const arr = [1, 2, 3, 4, 5];

// 访问元素
console.log(arr[0]); // 1

// 插入元素
arr.splice(2, 0, 6); // [1, 2, 6, 3, 4, 5]

// 删除元素
arr.splice(2, 1); // [1, 2, 3, 4, 5]

// 查找元素
const index = arr.indexOf(3); // 2
```

## 栈 (Stack)

栈是一种后进先出(LIFO)的数据结构，只能在栈顶进行插入和删除操作。

### 栈的特点
- **后进先出**：最后入栈的元素最先出栈
- **只能在一端操作**：栈顶
- **应用场景**：函数调用栈、括号匹配、表达式求值

### 栈的实现
```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  // 入栈
  push(element) {
    this.items.push(element);
  }
  
  // 出栈
  pop() {
    if (this.isEmpty()) {
      return "栈为空";
    }
    return this.items.pop();
  }
  
  // 查看栈顶元素
  peek() {
    if (this.isEmpty()) {
      return "栈为空";
    }
    return this.items[this.items.length - 1];
  }
  
  // 判断栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  
  // 获取栈的大小
  size() {
    return this.items.length;
  }
  
  // 清空栈
  clear() {
    this.items = [];
  }
}

// 使用示例
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
```

### 栈的应用
```javascript
// 括号匹配
function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}
```

## 队列 (Queue)

队列是一种先进先出(FIFO)的数据结构，只能在队尾插入，在队首删除。

### 队列的特点
- **先进先出**：最先入队的元素最先出队
- **两端操作**：队尾插入，队首删除
- **应用场景**：任务调度、广度优先搜索、消息队列

### 队列的实现
```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  // 入队
  enqueue(element) {
    this.items.push(element);
  }
  
  // 出队
  dequeue() {
    if (this.isEmpty()) {
      return "队列为空";
    }
    return this.items.shift();
  }
  
  // 查看队首元素
  front() {
    if (this.isEmpty()) {
      return "队列为空";
    }
    return this.items[0];
  }
  
  // 判断队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  
  // 获取队列的大小
  size() {
    return this.items.length;
  }
  
  // 清空队列
  clear() {
    this.items = [];
  }
}
```

### 优先级队列
```javascript
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  // 入队（带优先级）
  enqueue(element, priority) {
    const queueElement = { element, priority };
    
    if (this.isEmpty()) {
      this.items.push(queueElement);
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(queueElement);
      }
    }
  }
  
  // 出队
  dequeue() {
    if (this.isEmpty()) {
      return "队列为空";
    }
    return this.items.shift().element;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}
```

## 链表 (Linked List)

链表是由一系列节点组成的数据结构，每个节点包含数据和指向下一个节点的指针。

### 链表的特点
- **动态内存分配**：不需要连续的内存空间
- **插入删除**：O(1) 时间复杂度（已知位置）
- **随机访问**：O(n) 时间复杂度

### 单链表实现
```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // 在链表末尾添加节点
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  
  // 在指定位置插入节点
  insert(position, data) {
    if (position < 0 || position > this.size) {
      return false;
    }
    
    const newNode = new Node(data);
    
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      
      newNode.next = current;
      previous.next = newNode;
    }
    this.size++;
    return true;
  }
  
  // 删除指定位置的节点
  removeAt(position) {
    if (position < 0 || position >= this.size) {
      return null;
    }
    
    let current = this.head;
    
    if (position === 0) {
      this.head = current.next;
    } else {
      let previous = null;
      let index = 0;
      
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      
      previous.next = current.next;
    }
    
    this.size--;
    return current.data;
  }
  
  // 查找元素
  indexOf(data) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1;
  }
  
  // 判断链表是否为空
  isEmpty() {
    return this.size === 0;
  }
  
  // 获取链表大小
  getSize() {
    return this.size;
  }
  
  // 转换为字符串
  toString() {
    let current = this.head;
    let string = '';
    
    while (current) {
      string += current.data + (current.next ? ' -> ' : '');
      current = current.next;
    }
    
    return string;
  }
}
```

### 循环链表
```javascript
class CircularLinkedList extends LinkedList {
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
    this.size++;
  }
}
```

### 双端链表
```javascript
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  // 在头部添加节点
  addToHead(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }
  
  // 在尾部添加节点
  addToTail(data) {
    const newNode = new Node(data);
    
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }
}
```

## 哈希表 (Hash Table)

哈希表是一种通过键值对存储数据的数据结构，通过哈希函数将键映射到数组索引。

### 哈希表的特点
- **快速查找**：平均 O(1) 时间复杂度
- **键值对存储**：每个元素都有键和值
- **哈希冲突**：需要处理键冲突问题

### 哈希表实现
```javascript
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }
  
  // 哈希函数
  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    
    return total;
  }
  
  // 设置键值对
  set(key, value) {
    let index = this._hash(key);
    
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    
    // 检查是否已存在相同的键
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        this.keyMap[index][i][1] = value;
        return;
      }
    }
    
    this.keyMap[index].push([key, value]);
  }
  
  // 获取值
  get(key) {
    let index = this._hash(key);
    
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    
    return undefined;
  }
  
  // 获取所有键
  keys() {
    let keysArr = [];
    
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    
    return keysArr;
  }
  
  // 获取所有值
  values() {
    let valuesArr = [];
    
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    
    return valuesArr;
  }
}
```

## 树 (Tree)

树是一种层次化的数据结构，由节点和边组成，每个节点可以有多个子节点。

### 树的基本概念
- **根节点**：树的顶部节点
- **父节点**：有子节点的节点
- **子节点**：被父节点指向的节点
- **叶子节点**：没有子节点的节点
- **深度**：从根到节点的路径长度
- **高度**：树中节点的最大深度

### 二叉树
```javascript
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // 插入节点
  insert(data) {
    const newNode = new TreeNode(data);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    this._insertNode(this.root, newNode);
  }
  
  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }
  
  // 中序遍历
  inOrder(node = this.root) {
    if (node) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  }
  
  // 前序遍历
  preOrder(node = this.root) {
    if (node) {
      console.log(node.data);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }
  
  // 后序遍历
  postOrder(node = this.root) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.data);
    }
  }
}
```

### 二叉搜索树 (BST)
```javascript
class BinarySearchTree extends BinaryTree {
  // 查找节点
  search(data) {
    return this._searchNode(this.root, data);
  }
  
  _searchNode(node, data) {
    if (!node) {
      return false;
    }
    
    if (data < node.data) {
      return this._searchNode(node.left, data);
    } else if (data > node.data) {
      return this._searchNode(node.right, data);
    } else {
      return true;
    }
  }
  
  // 删除节点
  remove(data) {
    this.root = this._removeNode(this.root, data);
  }
  
  _removeNode(node, data) {
    if (!node) {
      return null;
    }
    
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      // 叶子节点
      if (!node.left && !node.right) {
        return null;
      }
      
      // 只有一个子节点
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      
      // 有两个子节点
      const minNode = this._findMinNode(node.right);
      node.data = minNode.data;
      node.right = this._removeNode(node.right, minNode.data);
      return node;
    }
  }
  
  _findMinNode(node) {
    if (!node.left) {
      return node;
    }
    return this._findMinNode(node.left);
  }
}
```

### 满二叉树
- 每一层节点都是满的
- 深度为 k，那么总节点数就是 2^k - 1

### 完全二叉树
- 节点都紧凑靠左排列，且除了最后一层，其他每层都必须是满的
- 完全二叉树的左右子树中，至少有一棵是满二叉树

### 高度平衡二叉树 (HBT)
- 每个节点的左右子树的高度差不超过 1
- 假设高度平衡二叉树中共有 N 个节点，那么高度平衡二叉树的高度是 O(logN)

### 自平衡二叉树
- 很多种实现方式，最经典的就是红黑树，一种自平衡的二叉搜索树

## 堆 (Heap)

堆是一种特殊的完全二叉树，分为最大堆和最小堆。

### 堆的特点
- **完全二叉树**：除了最后一层，其他层都是满的
- **堆序性**：最大堆中父节点大于等于子节点，最小堆中父节点小于等于子节点

### 最大堆实现
```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }
  
  // 获取父节点索引
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  
  // 获取左子节点索引
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  
  // 获取右子节点索引
  getRightChildIndex(index) {
    return 2 * index + 2;
  }
  
  // 交换元素
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
  
  // 向上调整
  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      
      if (this.heap[currentIndex] <= this.heap[parentIndex]) {
        break;
      }
      
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }
  
  // 向下调整
  heapifyDown() {
    let currentIndex = 0;
    
    while (this.getLeftChildIndex(currentIndex) < this.heap.length) {
      let largestChildIndex = this.getLeftChildIndex(currentIndex);
      
      if (this.getRightChildIndex(currentIndex) < this.heap.length &&
          this.heap[this.getRightChildIndex(currentIndex)] > this.heap[largestChildIndex]) {
        largestChildIndex = this.getRightChildIndex(currentIndex);
      }
      
      if (this.heap[currentIndex] >= this.heap[largestChildIndex]) {
        break;
      }
      
      this.swap(currentIndex, largestChildIndex);
      currentIndex = largestChildIndex;
    }
  }
  
  // 插入元素
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  
  // 删除最大值
  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }
    
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    
    return max;
  }
  
  // 获取最大值
  peek() {
    return this.heap[0] || null;
  }
  
  // 获取堆的大小
  size() {
    return this.heap.length;
  }
  
  // 判断堆是否为空
  isEmpty() {
    return this.heap.length === 0;
  }
}
```

## 图 (Graph)

图是由顶点和边组成的数据结构，用于表示对象之间的关系。

### 图的分类
- **无向图**：边没有方向
- **有向图**：边有方向
- **加权图**：边有权重
- **无权图**：边没有权重

### 图的基本概念
- **度**：与顶点相连的边的数量
  - **出度**：有向图中从顶点出发的边数
  - **入度**：有向图中指向顶点的边数
- **连通性**：
  - **连通图**：无向图中，任何两个节点都是可以到达的
  - **强连通图**：有向图中任何两个节点是可以相互到达
  - **连通分量**：无向图中的极大连通子图
  - **强连通分量**：有向图中极大强连通子图

### 图的存储方式

#### 邻接矩阵
```javascript
class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjMatrix = Array(vertices).fill().map(() => Array(vertices).fill(0));
  }
  
  // 添加边
  addEdge(v, w, weight = 1) {
    this.adjMatrix[v][w] = weight;
    this.adjMatrix[w][v] = weight; // 无向图
  }
  
  // 删除边
  removeEdge(v, w) {
    this.adjMatrix[v][w] = 0;
    this.adjMatrix[w][v] = 0;
  }
  
  // 检查是否存在边
  hasEdge(v, w) {
    return this.adjMatrix[v][w] !== 0;
  }
  
  // 获取顶点的邻居
  getNeighbors(vertex) {
    const neighbors = [];
    for (let i = 0; i < this.vertices; i++) {
      if (this.adjMatrix[vertex][i] !== 0) {
        neighbors.push(i);
      }
    }
    return neighbors;
  }
}
```

#### 邻接表
```javascript
class GraphAdjList {
  constructor() {
    this.adjList = new Map();
  }
  
  // 添加顶点
  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }
  
  // 添加边
  addEdge(v, w) {
    this.addVertex(v);
    this.addVertex(w);
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v); // 无向图
  }
  
  // 删除边
  removeEdge(v, w) {
    if (this.adjList.has(v)) {
      const neighbors = this.adjList.get(v);
      const index = neighbors.indexOf(w);
      if (index > -1) {
        neighbors.splice(index, 1);
      }
    }
    
    if (this.adjList.has(w)) {
      const neighbors = this.adjList.get(w);
      const index = neighbors.indexOf(v);
      if (index > -1) {
        neighbors.splice(index, 1);
      }
    }
  }
  
  // 获取顶点的邻居
  getNeighbors(vertex) {
    return this.adjList.get(vertex) || [];
  }
  
  // 获取所有顶点
  getVertices() {
    return Array.from(this.adjList.keys());
  }
}
```

### 图的遍历

#### DFS (深度优先搜索)
```javascript
function dfs(graph, start, visited = new Set()) {
  if (visited.has(start)) {
    return;
  }
  
  visited.add(start);
  console.log(start);
  
  const neighbors = graph.getNeighbors(start);
  for (let neighbor of neighbors) {
    dfs(graph, neighbor, visited);
  }
}
```

#### BFS (广度优先搜索)
```javascript
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  const result = [];
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    const neighbors = graph.getNeighbors(vertex);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}
```

## 数据结构选择指南

| 操作 | 数组 | 链表 | 栈 | 队列 | 哈希表 | 树 | 图 |
|------|------|------|------|------|--------|------|------|
| 访问 | O(1) | O(n) | O(1) | O(1) | O(1) | O(log n) | O(V+E) |
| 搜索 | O(n) | O(n) | O(n) | O(n) | O(1) | O(log n) | O(V+E) |
| 插入 | O(n) | O(1) | O(1) | O(1) | O(1) | O(log n) | O(1) |
| 删除 | O(n) | O(1) | O(1) | O(1) | O(1) | O(log n) | O(1) |

## 学习建议

1. **理解概念** - 先理解每种数据结构的基本概念和特点
2. **手写实现** - 不看代码，自己实现各种数据结构
3. **分析复杂度** - 分析各种操作的时间和空间复杂度
4. **实际应用** - 理解每种数据结构的应用场景
5. **组合使用** - 学会组合使用不同的数据结构解决问题 