## 如何加载在xib中定义的UITableViewCell

- 主要还是使用NSBundle加载

关键代码如实：
{% highlight objc %}
//这里toplavelobject里元素的顺序在IB中编辑xib文件中的object的排序相同
NSArray *toplavelobject=[[NSBundle mainBundle] loadNibNamed:@"SHMessageLogTableViewCell" owner:self options:nil];

//for循环的目的是更通用，
for(id aObject in toplavelobject){
	if ([aObject isKindOfClass:[UITableViewCell class]])	{
		cell=(UITableViewCell *) aObject;
		break;
	}
}
{% endhighlight %}
