---
layout: post
title: Facebook电面面经 TrieTree
category: 技术
tags: Interview Facebook
keywords: 
description: 
---

Implement TrieTree

```$xslt

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class TrieTree {

    class Node {
         boolean isWord;
         Node[] children;
         Set<String> set;
         Node() {
             set = new HashSet<>();
             children = new Node[128];
         }
    }

    private Node root;

    public TrieTree(String[] dict) {

        root = new Node();
        for (String s : dict) {
            root.set.add(s);
            Node cur = root;
            for (int i = 0; i < s.length(); i++) {
                int index = s.charAt(i);
                if (cur.children[index] == null) {
                    cur.children[index] = new Node();
                }
                cur = cur.children[index];
                cur.set.add(s);
            }
            cur.isWord = true;
        }

    }

    public List<String> query(String prefix) {
        Node cur = root;
        for (int i = 0; i < prefix.length(); i++) {
            int index = prefix.charAt(i);
            if (cur.children[index] == null) {
                return new ArrayList<>();
            }
            cur = cur.children[index];
        }
        return new ArrayList<>(cur.set);
    }

    public static void main(String[] args) {
        TrieTree t = new TrieTree(new String[]{"abc", "abcd", "bcd", "ab111111", "a1", "", "aaa", "abab", "abc", "abcd"});
        System.out.println(t.query("ab"));
        System.out.println(t.query(""));
    }

}

```
