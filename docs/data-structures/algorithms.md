# 算法思想

## 概述

算法思想是解决编程问题的核心思维方式，掌握不同的算法思想能够帮助我们更高效地解决各种问题。

## 递归

递归是一种通过函数调用自身来解决问题的算法思想。

### 递归的特点
- **基本情况**：递归的终止条件
- **递归情况**：问题分解为更小的子问题
- **递归深度**：需要注意栈溢出问题

### 递归示例
```javascript
// 阶乘计算
function factorial(n) {
  if (n <= 1) return 1; // 基本情况
  return n * factorial(n - 1); // 递归情况
}

// 斐波那契数列
function fibonacci(n) {
  if (n <= 1) return n; // 基本情况
  return fibonacci(n - 1) + fibonacci(n - 2); // 递归情况
}
```

## 双指针

双指针是一种通过使用两个指针来遍历数组或链表的技巧。

### 双端指针
两个指针从两端向中间移动，常用于有序数组。

```javascript
// 两数之和 II - 输入有序数组
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}
```

### 快慢指针
两个指针以不同速度移动，常用于链表问题。

```javascript
// 环形链表检测
function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head.next;
  
  while (slow !== fast) {
    if (!fast || !fast.next) return false;
    slow = slow.next;
    fast = fast.next.next;
  }
  return true;
}

// 链表的中间节点
function middleNode(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}
```

### 双指针应用场景
- **环形链表** - 检测链表是否有环
- **环形链表 II** - 找到环的入口点
- **相交链表** - 找到两个链表的交点
- **删除链表的倒数第 N 个节点**
- **合并两个有序链表**
- **合并 k 个升序链表**
- **分隔链表**
- **链表的中间节点**
- **链表中倒数第 k 个节点**
- **两数之和 II - 输入有序数组**
- **删除有序数组中的重复项**
- **移除元素**
- **移动零**
- **反转字符串**
- **最长回文子串**
- **删除排序链表中的重复元素**
- **和为 s 的两个数字**
- **排序数组中两个数字之和**

## 滑动窗口

滑动窗口是一种通过维护一个可变大小的窗口来解决问题的技巧。

### 滑动窗口示例
```javascript
// 无重复字符的最长子串
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// 找到字符串中所有字母异位词
function findAnagrams(s, p) {
  const result = [];
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  
  for (let char of p) {
    pCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }
  
  for (let i = 0; i < s.length; i++) {
    sCount[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
    
    if (i >= p.length) {
      sCount[s[i - p.length].charCodeAt(0) - 'a'.charCodeAt(0)]--;
    }
    
    if (arraysEqual(pCount, sCount)) {
      result.push(i - p.length + 1);
    }
  }
  
  return result;
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
```

### 滑动窗口应用场景
- **无重复字符的最长子串**
- **找到字符串中所有字母异位词**
- **字符串的排列**
- **最小覆盖子串**

## DFS (深度优先搜索)

DFS是一种通过递归或栈来实现的搜索算法。

### DFS示例
```javascript
// 二叉树遍历
function dfs(root) {
  if (!root) return;
  
  // 前序遍历
  console.log(root.val);
  dfs(root.left);
  dfs(root.right);
}

// 图的DFS
function dfsGraph(graph, start, visited = new Set()) {
  if (visited.has(start)) return;
  
  visited.add(start);
  console.log(start);
  
  for (let neighbor of graph[start]) {
    dfsGraph(graph, neighbor, visited);
  }
}
```

## BFS (广度优先搜索)

BFS是一种通过队列来实现的搜索算法。

### BFS示例
```javascript
// 二叉树层序遍历
function bfs(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];
  
  while (queue.length > 0) {
    const level = [];
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}

// 图的BFS
function bfsGraph(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}
```

## 动态规划 (DP)

动态规划是一种通过将问题分解为子问题来解决的算法思想。

### DP示例
```javascript
// 斐波那契数列 (记忆化)
function fibonacciDP(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciDP(n - 1, memo) + fibonacciDP(n - 2, memo);
  return memo[n];
}

// 爬楼梯
function climbStairs(n) {
  if (n <= 2) return n;
  
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}
```

## 贪心算法

贪心算法是一种在每一步选择中都采取当前状态下最好或最优的选择的算法。

### 贪心示例
```javascript
// 分发饼干
function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  
  let i = 0, j = 0;
  let count = 0;
  
  while (i < g.length && j < s.length) {
    if (s[j] >= g[i]) {
      count++;
      i++;
    }
    j++;
  }
  
  return count;
}
```

## 回溯算法

回溯算法是一种通过尝试所有可能的解来解决问题的算法。

### 回溯示例
```javascript
// 全排列
function permute(nums) {
  const result = [];
  
  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      
      used[i] = true;
      path.push(nums[i]);
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }
  
  backtrack([], new Array(nums.length).fill(false));
  return result;
}
```

## 算法选择策略

| 问题类型 | 推荐算法 | 时间复杂度 |
|----------|----------|------------|
| 数组查找 | 二分查找 | O(log n) |
| 排序 | 快速排序 | O(n log n) |
| 图遍历 | DFS/BFS | O(V + E) |
| 最短路径 | Dijkstra | O(V²) |
| 动态规划 | 记忆化/自底向上 | 根据问题而定 |
| 字符串匹配 | KMP | O(n + m) |

## 学习建议

1. **理解思想** - 先理解算法的核心思想
2. **手写实现** - 不看代码，自己实现
3. **分析复杂度** - 分析时间和空间复杂度
4. **实际应用** - 在项目中应用这些算法
5. **持续练习** - 通过刷题巩固算法能力 