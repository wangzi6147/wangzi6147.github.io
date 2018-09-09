---
layout: post
title: Algorithms StringComparator
category: 技术
tags: Interview Algorithms
keywords: 
description: 
---

{% raw %}

给两个字符串，写一个新的comparator。
比如 photo1, photo10, photo2，经过这个comparator排序以后应该变成photo1，photo2，photo10。也就是要按照数字的value从小到大顺序来排。


```$xslt
import java.util.Arrays;
import java.util.Comparator;

public class StringComparator implements Comparator<String>{

    public int compare(String s1, String s2) {

        if (s1 == null && s2 == null) {
            return 0;
        }
        if (s1 == null) {
            return -1;
        }
        if (s2 == null) {
            return 1;
        }

        int i = 0, j = 0;
        while (i < s1.length() && j < s2.length()) {
            char c1 = s1.charAt(i), c2 = s2.charAt(j);
            if (Character.isDigit(c1) && Character.isDigit(c2)) {
                int ii = i, jj = j;
                while (ii < s1.length() && Character.isDigit(s1.charAt(ii))) {
                    ii++;
                }
                while (jj < s2.length() && Character.isDigit(s2.charAt(jj))) {
                    jj++;
                }
                int v1 = Integer.valueOf(s1.substring(i, ii));
                int v2 = Integer.valueOf(s2.substring(j, jj));
                if (v1 == v2) {
                    i = ii;
                    j = jj;
                } else {
                    return Integer.compare(v1, v2);
                }
            } else {
                if (c1 == c2) {
                    i++;
                    j++;
                } else {
                    return Character.compare(c1, c2);
                }
            }
        }

        return s1.compareTo(s2);
    }

    public static void main(String[] args) {
        String[] ss = new String[]{"ab12ab", "ab12a2b", "a121b12", "a12", "a11", "ab12a1b"};
        Arrays.sort(ss, new StringComparator());
        for (String s : ss) {
            System.out.println(s);
        }
    }

}

```

{% endraw %}

