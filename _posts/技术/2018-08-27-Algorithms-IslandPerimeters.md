---
layout: post
title: Algorithms IslandPerimeters
category: 技术
tags: Interview Algorithms
keywords: 
description: 
---

{% raw %}

Island Perimeters

```$xslt
/*
1 0 0 1 1 1
1 0 0 1 1 1
0 0 0 0 1 1
周长7
*/

public class IslandPerimeters {

    int result = 0;

    public int islandPerimeters(int[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                dfs(grid, i, j);
            }
        }
        return result;
    }

    private void dfs(int[][] grid, int i, int j) {
        int m = grid.length, n = grid[0].length;
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] != 1) {
            return;
        }
        if (i == 0 || j == 0 || i == m - 1 || j == n - 1 ||
                grid[i - 1][j] == 0 || grid[i][j - 1] == 0 ||
                grid[i + 1][j] == 0 || grid[i][j + 1] == 0) {
            result++;
        }
        grid[i][j] = 2;
        int[][] dirs = new int[][]{{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
        for (int[] dir : dirs) {
            dfs(grid, i + dir[0], j + dir[1]);
        }
    }

    public static void main(String[] args) {
        int[][] grid = new int[][]{{1, 0, 1, 1, 1}, {1, 0, 1, 1, 1}, {0, 0, 0, 1, 1}};
        System.out.println(new IslandPerimeters().islandPerimeters(grid));
    }

}
```
    
{% endraw %}
