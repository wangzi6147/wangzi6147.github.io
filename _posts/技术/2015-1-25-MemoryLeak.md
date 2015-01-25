---
layout: post
title: VisualStudio中检查内存泄露方法
category: 技术
tags: VisualStudio Cpp
keywords: 
description: 
---

项目工程中存在内存泄露，被折磨了一晚上，终于查了出来，因为之前没有相关的经验，还比较生疏，在此记录下来，方便以后查找。

##对于malloc出的内存的检测方法

对于C语言中的内存泄露，MSDN给出了详细的方法（找不到原址了，这里给出一篇博客：[http://www.cnblogs.com/skynet/archive/2011/02/20/1959162.html](http://www.cnblogs.com/skynet/archive/2011/02/20/1959162.html)，内容是一样的。）

这篇文章中详细地记录了从检查到找到确定位置到修复的方法，这里不再赘述。但是这是针对于C语言中的malloc方法的，C++中不再推荐使用malloc，取而代之的是new，如果按照这种方法的话，可以检测出内存泄露，但是不能确定到具体的位置。

##对于new方法分配的内存的检查

这里分享一些C++中检测内存泄漏的技巧，与上面的方法不同的是，我们要多定义一个宏命令：*#define _CRTDBG_MAP_ALLOC_NEW*，部分代码如下：

    #define _CRTDBG_MAP_ALLOC
    #define _CRTDBG_MAP_ALLOC_NEW
    #include <crtdbg.h>

这几个是必须的头文件和宏定义，之后在工程出口添加：

    _CrtDumpMemoryLeaks();
    
运行后"输出"窗口会显示内存泄露信息：

![](/public/imgs/MemoryLeak_1.bmp)

但是这里的文件位置还不是准确的，指向的是*crtdbg.h*这个头文件，这里可以用到一个小技巧：双击文件跳转到对应行，添加断点，添加条件，当new的空间大小等于"输出"窗口所显示的空间大小时，触发断点。如图所示：

![](/public/imgs/MemoryLeak_2.bmp)

触发断点后，在“调用堆栈”里就可以看到具体是哪里申请的内存了：

![](/public/imgs/MemoryLeak_3.bmp)

当然，这只是一种“歪门邪道”，因为如果泄露的内存大小是个很常见的数字，比如8bit，4bit之类，这种方法就没用了。
