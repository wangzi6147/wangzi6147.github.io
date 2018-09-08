---
layout: post
title: Algorithms IndexOfAnagram
category: 技术
tags: Interview Algorithms
keywords: 
description: 
---

{% raw %}

Given main string, target string return indexOf(), but anagram is also OK. eg 123456 654 return 3

```$xslt

public class IndexOfAnagram {

    public int indexOfAnagram(String s, String p) {
        int[] map = new int[256];
        for (char c : p.toCharArray()) {
            map[c]++;
        }
        int i = 0, j = 0;
        while (j < s.length()) {
            if (map[s.charAt(j)] == 0) {
                i = ++j;
                continue;
            }
            while (j < s.length() && map[s.charAt(j)] > 0) {
                map[s.charAt(j++)]--;
            }
            if (j - i == p.length()) {
                return i;
            }
            if (j == s.length()) {
                break;
            }
            while (i < j && map[s.charAt(j)] <= 0) {
                map[s.charAt(i++)]++;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(new IndexOfAnagram().indexOfAnagram("123456", "456"));
        System.out.println(new IndexOfAnagram().indexOfAnagram("123456", "654"));
        System.out.println(new IndexOfAnagram().indexOfAnagram("123456", "436"));
        System.out.println(new IndexOfAnagram().indexOfAnagram("123456", "43"));
        System.out.println(new IndexOfAnagram().indexOfAnagram("1234434456", "3445"));
    }

}

```

{% endraw %}
