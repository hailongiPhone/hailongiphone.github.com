---
layout : post
categories : Objective-c
tags : [Objecitve-c,Code,NSPredicate]
---

## 内容提要：
主要介绍如何使用NSPredicate过滤NSArray

## 使用到的对象有：

- NSArray

- NSPredicate

## 关键方法：

NSArray 的 filteredArrayUsingPredicate


## 示例代码如下
{% highlight objc %}

NSArray * tmp = [NSArray arrayWithObjects:@"test1",@"test2",@"test3",@"test4",@"test5",@"test6",@"test7",@"test8",@"test9",@"test10",@"test11",@"test12",@"test13",@"test14",@"test15",@"test16",@"test17",@"test18",@"test19",@"test20", nil];
NSArray * tmp2 = [NSArray arrayWithObjects:@"test1",@"test2",@"test3",nil];


NSPredicate *predicate =[NSPredicate predicateWithFormat:@"NOT SELF IN %@",tmp2];
NSArray * filtered = [tmp filteredArrayUsingPredicate:predicate];
{% endhighlight %}
## 需要注意理解的问题是NOT SELF IN

not 是指 取反

self 是指 对应于每一条NSString 这里的字符串来自于数组中的每个元素。

IN 是指在 在数组tmp2中

## 相关知识 Predicates

Predicates also have more condition functions, some of which I have only touched on here:

   * beginswith : matches anything that begins with the supplied condition
   * contains : matches anything that contains the supplied condition
   * endswith : the opposite of begins with
   * like : the wildcard condition, similar to its SQL counterpart. Matches anything that fits the wildcard condition
   * matches : a regular expression matching condition. Beware: quite intense to run
The syntax also contains the following other function, predicates and operations:

   * AND (&&), OR (||), NOT (!)
   * ANY, ALL, NONE, IN
   * FALSE, TRUE, NULL, SELF



