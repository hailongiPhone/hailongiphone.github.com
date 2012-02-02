---
layout : post
category : cocoa-touch
title : cocoa-touch-Animations
tags ： [Cocoa-touch，iOS，Animations]
---

## 在iOS开发中使用animation方法一般有两种：
- UIView Animation
- Core Animation
#### 常用的方法-
UIView 下的Animation 作用与 UIView
最简单，最直接，当然功能效果也相对较少[如：只支持2D transformations]。
能修改UIView的属性包括：
- frame：  可以达到修改UIView的size和position（注意都是相对与其父类坐标系）
- bounds：	达到修改UIView的size
- center： 达到修改UIView的position
- transform：	修改UIView的scale，rotate，或者移动UIVIew的中心点2D的transformations变换
- alpha：修改UIView的transparency透明度，用该属性达到渐隐渐现的效果
- backgroundColor： 修改UIView的背景颜色
- contentStretch： 修改UIView中的内容自动拉升填满可用空间？？？

###### 如何使用UIView animation
使用方式有两种：
- Block-Based
从iOS4以后，可以使用block的方式初始化动画。优点是可以嵌套。
方法有：
{% highlight objc %}
- +animateWithDuration:animations:
- +animateWithDuration:animations:completion:
- +animateWithDuration:delay:options:animations:completion:
{% endhighlight %}
示例代码：
{% highlight objc %}
[UIView animateWithDuration:1.0 animations:^{
        firstView.alpha = 0.0;
        secondView.alpha = 1.0;
}];
{% endhighlight %}

- Begin/Commit模式
通过beginAnimations:context: 和 commitAnimations 方法来定义动画代码块，在执行commit后，在这两个方法之内设点的动画属性，会动态的转变成最新设置的值。

示例代码移动aView的
{% highlight objc%}
     UIView aV.frame = CGRectMake(0,0,100,100);
		CGRect endFrame = CGRectMake(100,100,100,100)
     [UIView beginAnimations:nil context:NULL];
     [UIView setAnimationDuration:0.45];
     [UIView setAnimationCurve:UIViewAnimationCurveEaseInOut];
     [aV setFrame:endFrame];
     [UIView commitAnimations];
   }
{% endhighlight %}

#### 功能强大的Core Animation
高性能，方便使用，支持更多效果，作用于CALayer
- The size and position of the layer
- The center point used when performing transformations
- Transformations to the layer or its sublayers in 3D space
- The addition or removal of a layer from the layer hierarchy
- The layer’s Z-order relative to other sibling layers
- The layer’s shadow
- The layer’s border (including whether the layer’s corners are rounded)
- The portion of the layer that stretches during resizing operations
- The layer’s opacity
- The clipping behavior for sublayers that lie outside the layer’s bounds
- The current contents of the layer
- The rasterization behavior of the layer

需要注意的问题：
- layer的坐标系
Layer Coordinate System
The coordinate system for layers differs depending on the current platform. In iOS, the default coordinate system origin is in the top-left corner of the layer and positive values extend down and to the right of that origin point.
iOS中，左上角是原点，向下和向右为正值

- 常用的 Key Path
- rotation.x  x轴旋转弧度
- rotation.y  y轴旋转弧度
- rotation.z  z轴旋转弧度
- rotation 
- scale.x
- scale.y
- scale.z
- scale
- translation.x
- translation.y
- translation.z
- translation

###### 常用的Transform Functions
- CATransform3DMakeTranslation
- CATransform3DTranslate
- CATransform3DMakeScale
- CATransform3DScale
- CATransform3DMakeRotation
- CATransform3DRotate

###### 常用的动画类型
- CABasicAnimation
- CAKeyframeAnimation
- CATransition
- CAAnimationGroup


示例代码，把self.contentView向屏幕上方移动55个像素
{% highlight objc %}
CABasicAnimation * theAnimation=[CABasicAnimation animationWithKeyPath:@"transform"];
    
    theAnimation.duration=0.35;
    theAnimation.repeatCount=1;
    theAnimation.autoreverses=NO;
    theAnimation.fromValue = [NSValue valueWithCATransform3D:CATransform3DIdentity];
    theAnimation.toValue = [NSValue valueWithCATransform3D:CATransform3DMakeTranslation(0, -55, 0)];

    theAnimation.removedOnCompletion = NO;
	theAnimation.fillMode = kCAFillModeForwards;

    [self.contentView.layer addAnimation:theAnimation forKey:@"transform"];
{% endhighlight %}