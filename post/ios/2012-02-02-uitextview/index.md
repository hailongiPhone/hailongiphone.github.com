## UITextView
	在使用UITextView常遇到如下需求：
		- 键盘显示时，把界面上移
		- 键盘隐藏时，界面下移

		- 限制输入的字符数，并在界面上显示

		- 监听键盘上Done按钮和Delete按钮事件

	代码如下：

{% highlight objc %}

#define kMessageLimit 40

#pragma mark - UITextViewDelegate

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    //监听键盘显示和隐藏事件
	[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardShow) name:UIKeyboardWillShowNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(keyboardHide) name:UIKeyboardWillHideNotification object:nil];
}

- (void)textViewDidChange:(UITextView *)textView
{
	//处理剩余字符数的更新
    [self.limitWord setText:[NSString stringWithFormat:@"%d",kMessageLimit - [textView.text length]]];
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text
{
    NSLog(@"text = %@",text);
    //Done button
    if ([text isEqualToString:@"\n"]) {
        [textView resignFirstResponder];
        return FALSE;
    }
    //Delete button
    if ([text length]==0) {
        NSLog(@"DELETE");
    }

    //限制字符数的处理
    return [textView.text length]<= kMessageLimit;
}

- (void)textViewDidEndEditing:(UITextView *)textView
{
    NSLog(@"textViewDidEndEditing");
}

#pragma mark - keyboard
- (void)keyboardShow
{
    CABasicAnimation * theAnimation=[CABasicAnimation animationWithKeyPath:@"transform"];

    theAnimation.duration=0.35;
    theAnimation.repeatCount=1;
    theAnimation.autoreverses=NO;
    theAnimation.fromValue = [NSValue valueWithCATransform3D:CATransform3DIdentity];
    theAnimation.toValue = [NSValue valueWithCATransform3D:CATransform3DMakeTranslation(0, -55, 0)];

    theAnimation.removedOnCompletion = NO;
	theAnimation.fillMode = kCAFillModeForwards;

    [self.contentView.layer addAnimation:theAnimation forKey:@"transform"];

}

- (void)keyboardHide
{
    CABasicAnimation * theAnimation=[CABasicAnimation animationWithKeyPath:@"transform"];

    theAnimation.duration=0.35;
    theAnimation.repeatCount=1;
    theAnimation.autoreverses=NO;
    theAnimation.fromValue = [NSValue valueWithCATransform3D:CATransform3DMakeTranslation(0, -55, 0)];
    theAnimation.toValue = [NSValue valueWithCATransform3D:CATransform3DIdentity];

    theAnimation.removedOnCompletion = NO;
	theAnimation.fillMode = kCAFillModeForwards;

    [self.contentView.layer addAnimation:theAnimation forKey:@"transform"];
}

{% endhighlight %}
