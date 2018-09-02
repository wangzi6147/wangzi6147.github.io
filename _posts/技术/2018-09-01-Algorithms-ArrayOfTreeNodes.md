---
layout: post
title: Algorithms ArrayOfTreeNodes
category: 技术
tags: Interview Algorithms
keywords: 
description: 
---

{% raw %}

给出一个array of treenode，判断array里面的节点是否属于同一棵树并且包含这棵树的所有节点

```$xslt

import java.util.HashSet;
import java.util.Set;

// 给出一个array of treenode，判断array里面的节点是否属于同一棵树并且包含这棵树的所有节点

public class ArrayContainsAllNodesInATree {

    static class Node {
        int val;
        Node left;
        Node right;
        Node(int val) {
            this.val = val;
        }
    }

    public boolean containsAllNodesInATree(Node[] nodes) {
        Set<Node> set = new HashSet<>();
        for (Node n : nodes) {
            if (n.left != null) {
                set.add(n.left);
            }
            if (n.right != null) {
                set.add(n.right);
            }
        }
        if (set.size() != nodes.length - 1) {
            return false;
        }
        int count = 0;
        for (Node n : nodes) {
            if (!set.contains(n)) {
                count++;
                if (count > 1) {
                    return false;
                }
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Node root = new Node(0);
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        Node n3 = new Node(3);
        Node n4 = new Node(4);
        Node n5 = new Node(5);
        root.left = n1;
        root.right = n2;
        n3.left = n4;
        n3.right = n5;
        ArrayContainsAllNodesInATree a = new ArrayContainsAllNodesInATree();
        System.out.println(a.containsAllNodesInATree(new Node[]{n4, n1, n2, root, n3, n5}));
        n2.left = n3;
        System.out.println(a.containsAllNodesInATree(new Node[]{n4, n1, n2, root, n3}));
        System.out.println(a.containsAllNodesInATree(new Node[]{n4, n1, n2, root, n3, n5}));
    }

}
```

{% endraw %}
