---
layout: post
title: Algorithms MinimumIntervals
category: 技术
tags: Interview Algorithms
keywords: 
description: 
---

{% raw %}


```$xslt
import java.util.*;

public class MinimumIntervals {

    class Node {
        int start, end, min;
        Node left, right;
        Node(int start, int end) {
            this.start = start;
            this.end = end;
            this.min = Integer.MAX_VALUE;
        }
    }

    Node root;

    // 给一堆interval, 和一个target interval, 返回能cover target的最少interval数量
    // O(mlogn) m为interval个数, n为target范围
    int minimum(List<int[]> intervals, int[] target) {
        root = initSegTree(target[0], target[1]);
        Collections.sort(intervals, (a, b) -> (a[1] - b[1]));
        int n = intervals.size();
        for (int[] interval : intervals) {
            if (interval[1] < target[0]) {
                continue;
            }
            int val = Integer.MAX_VALUE;
            if (interval[0] <= target[0]) {
                val = 0;
            } else {
                val = query(root,interval[0] - 1, target[1]);
            }
            if (val < Integer.MAX_VALUE) {
                update(Math.min(target[1], interval[1]), val + 1);
            }
        }
        int result = query(root, target[1], target[1]);
        return result == Integer.MAX_VALUE ? -1 : result;
    }

    private int query(Node node, int low, int high) {
        if (node.start == low && node.end == high) {
            return node.min;
        }
        int mid = node.start + (node.end - node.start) / 2;
        if (low > mid) {
            return query(node.right, low, high);
        } else if (high <= mid) {
            return query(node.left, low, high);
        } else {
            return Math.min(query(node.left, low, mid), query(node.right, mid + 1, high));
        }
    }

    private void update(int key, int val) {
        Node cur = root;
        while (cur.start <= cur.end) {
            cur.min = Math.min(cur.min, val);
            if (cur.start == cur.end) {
                break;
            }
            int mid = cur.start + (cur.end - cur.start) / 2;
            if (key <= mid) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
    }

    private Node initSegTree(int low, int high) {
        if (low == high) {
            return new Node(low, high);
        }
        Node result = new Node(low, high);
        int mid = low + (high - low) / 2;
        result.left = initSegTree(low, mid);
        result.right = initSegTree(mid + 1, high);
        return result;
    }

    public static void main(String[] args) {
        MinimumIntervals mi = new MinimumIntervals();
        List<int[]> l = new ArrayList<>();
        l.add(new int[]{20, 30});
        l.add(new int[]{1, 10});
        l.add(new int[]{11, 20});
        l.add(new int[]{21, 30});
        l.add(new int[]{15, 25});
        l.add(new int[]{30, 40});
        System.out.println(mi.minimum(l, new int[]{1, 40}));
    }

}


```

{% endraw %}

