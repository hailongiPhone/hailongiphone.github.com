---
layout: post
category: 
title: Circular inclusions
date: 2012-02-29 12:35:53
---

## 关于循环引入的问题

####### 英文Tag
	circular inclusions
	Circular dependency
  recursive includes

## 问题描述

    如果两个类ClassA，ClassB，需要相互引入对方.此时无论外界先引入A、B，编译都不能通过，没有定义的类型。

## 示例代码如下：

HLClassA.h
{% highlight objc %}
#import "HLClassB.h"                          //Line A1
@interface HLClassA : NSObject
@property (nonatomic, strong) HLClassB * tmp;  //Line A2
@end
{% endhighlight %}


HLClassB.h
{% highlight objc %}
#import "HLClassA.h"                          //Line B1
@interface HLClassB : NSObject
@property (nonatomic, strong) HLClassA * tmp; //Line B2
@end
{% endhighlight%}


对应的实现文件并没有处理任何操作便在此省略。

此时编译，编译器则提示：
![Image](/images/Debug/Debug_Circular_inclusions.png "编译器提示")


## 具体问题出现原因解析：
   如果我们其他类ClassC中用到ClassA，引入A的头文件，首先处理的就是Line
A1，这样就会import ClassB，处理执行到Line
B1的位置，由于ClassA已经被ClassC引入所以忽略/不再引入（为什么忽略可以见[#import
与#include的区别](http://stackoverflow.com/questions/439662/what-is-the-difference-between-import-and-include-in-objective-c)）。继续执行，执行到Line B2 时就会报错，class
A没有定义。
    如果我们先引入ClassB，首相处理到Line B1，处理继续则执行到Line
A1,由于已经引入ClassB忽略，执行到Line A2，报错，未定义的ClassB

## 对应的修改办法:
    解决的办法就是停止这种循环引用。

    # 首先从设计上解决：
      考虑能不能让A与B不要相互引用。

    # 其次从代码上解决：
      由上面的分析可知，我们只要修改A、B其中的一个，不引入对方即可打破循环引入。
      但是不引入文件我们如何使用其中的类那？
      forward-class declaration 提前类声明. 用@class 类名;的方式进行类失声，在.m实现文件中引入具体文件。

    修改后代码如下：
HLClassA.h
{% highlight objc %}
@class HLClassB;                                //Line A1
@interface HLClassA : NSObject
@property (nonatomic, strong) HLClassB * tmp;  //Line A2
@end
{% endhighlight%}

HLClassA.m
{% highlight objc %}
#import "HLClassA.h"
#import "HLClassB.m"
@implementation HLClassA
@synthesize tmp = _tmp;
@end
{% endhighlight%}

    大家可以看出来主要的修改就是用@class替换掉了#import，把#import移到.m实现文件中。
PS：这里也就是[@class VS. #import的利弊](http://stackoverflow.com/questions/322597/class-vs-import)

## 问题描述

	上面讲了对于类对象出现的相互引用，如果两个类A，B,都要实现对方的代理会如何？
	
	
	代码如下：
	ClassA.h 定义代理ClassADelegat
{% highlight objc%}

@class HLClassB;

@protocol ClassADelegate;						//Line A1

@interface HLClassA : NSObject<ClassBDelegate> //Line A2
@property (nonatomic, strong) HLClassB * tmp;

@protocol ClassADelegate						
- (void)classADelegate;
@end
@end
	{% endhighlight %}
	
	ClassB.h 定义代理ClassBDelegat
{% highlight objc%}

@class HLClassA;

@protocol ClassBDelegate;							//Line B1

@interface HLClassB : NSObject<ClassADelegate>	//Line B2
@property (nonatomic, strong) HLClassA * tmp;

@protocol ClassBDelegate
- (void)classBDelegate;
@end
@end	
{% endhighlight %}
	
	编译运行：
	![Image](/images/Debug/Debug_Circular_inclusions_delegate.png "代理循环")
	
	找不到定义的代理协议protocol。
	
## 解决方法：
	有了之前的经验，我们可以看出，还是的执行到自己的line 2的地方，对方的Line 1都还没有处理。
	那能否直接加协议提前声明？
	
	但是协议的提前声明似乎只在同一个文件有用，我们修改ClassB.h如下
	
{% highlight objc %}
@class HLClassA;
@protocol ClassADelegate;

@protocol ClassBDelegate;
@interface HLClassB : NSObject<ClassADelegate>
@property (nonatomic, strong) HLClassA * tmp;

@protocol ClassBDelegate
- (void)classBDelegate;
@end
@end
{% endhighlight %}

	可以通过编译，但有警告：
	Cannot find protocol declaration for 'HLClassADelegate'; did you mean 'HLClassBDelegate'?
	
	最后的解决办法就是把协议提到单独的头文件中，在需要使用的地方直接引入
修改后的ClassA.h
{% highlight objc %}
#import "HLClassBDelegate.h"
@class HLClassB;
@interface HLClassA : NSObject <HLClassBDelegate>
@property (nonatomic, strong) HLClassB * tmp1;
@end
{% endhighlight %}

HLClassBDelegate.h文件
{% highlight objc %}
@protocol HLClassBDelegate <NSObject>
- (void)classBDelegate;
@end
{% endhighlight %}




## 总结
	这里指出的两种情况都是很直接很明显的循环引入问题，平时如果会遇到，大都是隐藏的更深的，不明显的大循环：
		如 a->b->c->d…z->a
	所以为了更好的避免这种隐形的大循环
	最好用@class 代替 #import.
	协议最好单独写在一个头文件中.
	
	