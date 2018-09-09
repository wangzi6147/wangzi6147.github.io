---
layout: post
title: Algorithms IncreasingContainer
category: 技术
tags: Interview Algorithms
keywords: 
description: 
---

{% raw %}

给个container，升序排列，有一个get()，随机出最左或最右，还有个isEmpty()，要求升序输出所有元素


```$xslt
public class IncreasingContainer {

    public List<Integer> rebuild(Container c) {
        List<Integer> result = new LinkedList<>();
        Stack<Integer> stack = new Stack<>();
        while (!c.isEmpty()) {
            int i = c.get();
            while (!stack.isEmpty() && i > stack.peek()) {
                result.add(stack.pop());
            }
            stack.push(i);
        }
        while (!stack.isEmpty()) {
            result.add(stack.pop());
        }
        return result;
    }

}

```

{% endraw %}
