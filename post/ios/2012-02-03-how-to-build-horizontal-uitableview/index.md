## 如何建立水平滑动的UITableView
最简单，最直接的做法：

- 在初始化UITableView的时候，旋转之。
- 在初始化tableViewcell的时候__反旋转__之。

需要说明的是：
	1 之所以tableview和cell的旋转方向不一样，是希望保证cell中的显示方向的正确性！
	2 从L->R活动，则tableView向左旋转，CGAffineTransformMakeRotation(-M_PI * 0.5);
				则其cell是向右旋转 CGAffineTransformMakeRotation(M_PI * 0.5);
	从R->L 旋转方向相反。

## 示例代码如下：
- step 1 初始化UITableView
{% highlight objc %}
    _tableView = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, 0, 0) 
                                              style:UITableViewStylePlain];
    _tableView.transform = CGAffineTransformMakeRotation(-M_PI * 0.5);
// 关键点UITableView transform 需要注意的是transform后frame也发生变换，需要重新设置
    _tableView.frame = CGRectMake(KTableViewX, KTableViewY, kTableViewWidth ,kTableViewHeight) ;
    _tableView.showsVerticalScrollIndicator = NO;
    _tableView.showsHorizontalScrollIndicator = NO;
    
    _tableView.separatorStyle = UITableViewCellSeparatorStyleSingleLine;
    _tableView.separatorColor = [UIColor blueColor];
    _tableView.dataSource = self;
    _tableView.delegate = self;
    _tableView.backgroundColor = [UIColor blueColor];
    [self.view addSubview:_tableView];
{% endhighlight %}
- step 2 初始化UITableViewCell
{% highlight objc %}
- (UITableViewCell *) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
	// Get section and row
	NSUInteger section;
	NSUInteger row;
	section = indexPath.section;
	row = indexPath.row;
	
	UITableViewCell* cell;
	cell = [tableView dequeueReusableCellWithIdentifier:@"default"];
	if (!cell) {
        
        NSArray *toplavelobject=[[NSBundle mainBundle]loadNibNamed:@"XIBNAME" owner:self options:nil];
        for(id c in toplavelobject)
        {
            if ([c isKindOfClass:[UITableViewCell class]])
            {
                cell=(UITableViewCell *) c;
                break;
            }
        }
			// 关键点cell.transform
        cell.transform = CGAffineTransformMakeRotation(M_PI * 0.5);
        [cell setFrame:CGRectMake(0, 0, kTableViewCellWidth, kTableViewCellHeight)];
	}
	cell.backgroundColor = [UIColor redColor];
	cell.textLabel.text = @"default";
	
	return cell;
}

{% endhighlight %}