---
layout : post
categories : Objective-c
tags : [Objecitve-c,NSPredicate]
---


## 内容：
- Predicate的基本知识和限制
- 如何创建predicate
- 介绍常用的 predicate 语法

## 基础介绍：

#### 什么是predicate？
	一个predicate是一个逻辑运算，必须要返回True或者False。
	
#### predicate的分类？
- comparison predicate 
	比较式的谓词，比较运算符两边的数据，返回运算符表达式的结果

- compound predicate 
	组合式的谓词，由多个谓词组合而成，或者negates其他谓词

## Predicate Classes 结构
3个谓词类，NSPredicate 和 它的两个子类 NSComparisonPredicate NSCompoundPredicate

## 如何创建谓词
三种方式：
- 从格式化字符串创建
{% highlight objc %}
	NSPredicate *predicate = [NSPredicate
    predicateWithFormat:@"(lastName like[cd] %@) AND (birthday > %@)",
            lastNameSearchString, birthdaySearchDate];
{% endhighlight %}

注意
1 是对于这种格式化字符串，在写的时候并不会做语义分析，所以只有在运行时runtime才会对其做语义解析，才能发现格式化字符串是否有错。
2 对于字符串，变量，转义字符的使用。
	对于字符串，字符串变量要用引号包含起来
	例如：判断lastName中是否是 S开头
{% highlight objc %}
NSPredicate *predicate = [NSPredicate
    predicateWithFormat:@"lastName like[c] \"S*\""];
{% endhighlight %}
	例如：判断字符串本身是否符合 “prefix*suffix”的格式
{% highlight objc %}
NSString *prefix = @"prefix";
NSString *suffix = @"suffix";
NSPredicate *predicate = [NSPredicate
    predicateWithFormat:@"SELF like[c] %@",
    [[prefix stringByAppendingString:@"*"] stringByAppendingString:suffix]];
BOOL ok = [predicate evaluateWithObject:@"prefixxxxxxsuffix"];
{% endhighlight %}
这里的返回值ok就为YES
但如果写成：
{% highlight objc %}
predicate = [NSPredicate
    predicateWithFormat:@"SELF like[c] %@*%@", prefix, suffix];
ok = [predicate evaluateWithObject:@"prefixxxxxxsuffix"];
{% endhighlight %}
或者
{% highlight objc %}
predicate = [NSPredicate
    predicateWithFormat:@"SELF like[c] %@*", prefix];
{% endhighlight %}
在运行时就会报错， (Unable to parse the format string "SELF like[c] %@*").


3 对于Boolean 值的使用
只能以NSNumber或者YES、NO的方式使用，如下
{% highlight objc %}
	NSPredicate *newPredicate =
    [NSPredicate predicateWithFormat:@"anAttribute == %@", [NSNumber numberWithBool:aBool]];
NSPredicate *testForTrue =
    [NSPredicate predicateWithFormat:@"anAttribute == YES"];
{% endhighlight %}

4 动态属性名
{% highlight objc %}
NSString *attributeName = @"firstName";
NSString *attributeValue = @"Adam";
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"%K like %@",
        attributeName, attributeValue];
{% endhighlight %}
其效果： firstName like "Adam"

5 表达式变量
	详见模版方式创建predicate
- 用代码创建
 NSComparisonPredicate 和 NSCompoundPredicate就是为了方便用代码直接产生谓词的。还需要使用的是NSExpression-生成谓词表达式。
例如：用代码创建判断revenue >= 1000000和revenue < 100000000的谓词
代码如下：
{% highlight objc %}
NSExpression *lhs = [NSExpression expressionForKeyPath:@"revenue"];
 
NSExpression *greaterThanRhs = [NSExpression expressionForConstantValue:[NSNumber numberWithInt:1000000]];
NSPredicate *greaterThanPredicate = [NSComparisonPredicate
    predicateWithLeftExpression:lhs
    rightExpression:greaterThanRhs
    modifier:NSDirectPredicateModifier
    type:NSGreaterThanOrEqualToPredicateOperatorType
    options:0];
 
NSExpression *lessThanRhs = [NSExpression expressionForConstantValue:[NSNumber numberWithInt:100000000]];
NSPredicate *lessThanPredicate = [NSComparisonPredicate
    predicateWithLeftExpression:lhs
    rightExpression:lessThanRhs
    modifier:NSDirectPredicateModifier
    type:NSLessThanPredicateOperatorType
    options:0];
 
NSCompoundPredicate *predicate = [NSCompoundPredicate andPredicateWithSubpredicates:
    [NSArray arrayWithObjects:greaterThanPredicate, lessThanPredicate, nil]];
{% endhighlight %}
- 用谓词模版创建
谓词模版的出现，可以视作是对于方便使用，但是容易出错的格式化字符串，和纯代码方式的中和。
谓词模版实际上就是包含表达式变量的谓词。

使用的步骤：
1 创建谓词模版
2 使用NSPredicate 的实例方法 predicateWithSubstitutionVariables:来定义表达式变量的值，并返回最终的谓词。

如下：￥LAST_NAME 就算是一个表达式变量(variable expression)
{% highlight objc %}
predicateTemplate = [NSPredicate
    predicateWithFormat:@"lastName like[c] $LAST_NAME"];
predicate = [predicateTemplate predicateWithSubstitutionVariables:
    [NSDictionary dictionaryWithObject:@"Turner" forKey:@"LAST_NAME"]];
{% endhighlight %}


### Format String Summary
上面讲完了初始化NSPredicate的3种方式，
总结下在格式化字符串中出现的关键字占位符

%@ 如同printf，替换为对应变量的description
%K 替换为动态的属性名
$variable 替换为表达式

常见的格式如下：

@"SELF == %@"
判断检查对象本身的值是否等于占位符%@指代的对象

@"attributeName == %@"
判断谓词正在检测的对象的属性attributeName的值是否与占位符替代的字符串的值相等。

@"%K == %@"
判断正在检测对象的属性（由占位符%K指定属性名称）的值是否与%@指定的字符串对象相等

@"name IN $NAME_LIST"
判断属性name的值 是否在NAME_LIST指定的集合当中，这个集合由predicateWithSubstitutionVariables：方法指定

@"'name' IN $NAME_LIST"
判断字符串‘name’是否在NAME_LIST指定的集合当中。

@"$name IN $NAME_LIST"
判断name表达式的值是否在NAME_LIST表达式指定的集合中。

@"%K == '%@'"
判断%K属性的值是否和字符串'%@'相等