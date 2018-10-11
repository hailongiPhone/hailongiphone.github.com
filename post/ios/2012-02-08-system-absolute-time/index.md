## 什么是系统绝对时间？

    绝对时间：
    瞭解了一些時區的概念之後，這裡要談的是『什麼是正確的時間』。 在 1880 年代的時間標準是以 GMT 時間為主的，但是 GMT 時間是以太陽通過格林威治的那一刻來作為計時的標準。 然而我們都知道啊，地球自轉的軌道以及公轉的軌道並非正圓，加上地球的自轉速度好像有逐年遞減的問題， 所以這個 GMT 時間與我們目前計時的時間就有點不一樣了。(註1)

在計算時間的時候，最準確的計算應該是使用『原子震盪週期』所計算的物理時鐘了 (Atomic Clock, 也被稱為原子鐘)，這也被定義為標準時間 (International Atomic Time)。而我們常常看見的 UTC 也就是 Coordinated Universal Time (協和標準時間)就是利用這種 Atomic Clock 為基準所定義出來的正確時間。例如 1999 年在美國啟用的原子鐘 NIST F-1， 他所產生的時間誤差每兩千年才差一秒鐘！真的是很準吶！這個 UTC 標準時間雖然與 GMT 時間放在同一個時區為基準， 不過由於計時的方式不同，UTC 時間與 GMT 時間有差不多 16 分鐘的誤差呢！(註2)

事實上，在我們的身邊就有很多的原子鐘，例如石英表，還有電腦主機上面的 BIOS 內部就含有一個原子鐘在紀錄與計算時間的進行吶！不過由於原子鐘主要是利用計算晶片 (crystal) 的原子震盪週期去計時的，這是因為每種晶片都有自己的獨特的震盪週期之故。 然而因為這種晶片的震盪週期在不同的晶片之間多多少少都會有點差異性，甚至同一批晶片也可能會或多或少有些許的差異 (就連溫度也可能造成這樣的誤差呢)，因此也就造成了 BIOS 的時間會三不五時的給他快了幾秒或者慢了幾秒。

    在编程过程中会用到
    + 軟體時鐘：由 Linux 作業系統根據 1970/01/01 開始計算的總秒數；
    + 硬體時鐘：主機硬體系統上面的時鐘，例如 BIOS 記錄的時間；


## iOS中如何获取系统时间

    使用方法CFAbsoluteTimeGetCurrent()。

    apple开发文档中说明如下：
~~~~~~~~~
- CFAbsoluteTimeGetCurrent
Returns the current system absolute time.

- CFAbsoluteTime CFAbsoluteTimeGetCurrent ();
Return Value
The current absolute time.

- Discussion
Absolute time is measured in seconds relative to the absolute reference date of Jan 1 2001 00:00:00 GMT. A positive value represents a date after the reference date, a negative value represents a date before it. For example, the absolute time -32940326 is equivalent to December 16th, 1999 at 17:54:34. Repeated calls to this function do not guarantee monotonically increasing results. The system time may decrease due to synchronization with external time references or due to an explicit user change of the clock.

~~~~~~~~~


## 使用
    常用来计算运行时间等。

如计算并显示一段代码运行时间，其代码如下：

{% highlight objc%}
    NSTimeInterval startTime = CFAbsoluteTimeGetCurrent();
    //code ....
    NSLog(@"%s(timer:%d):%f",__FUNCTION__,__obj__,CFAbsoluteTimeGetCurrent()-startTime);
{% endhighlight %}
  


## 参考资料
    + 鳥哥的 Linux 私房菜+第十五章時間伺服器： NTP 伺服器（#http://linux.vbird.org/linux_server/0440ntp.php）
