## plist文件，在NSData与NSDictionary之间的转换

1. plist文件转换成NSData

  {% highlight objc %}

  NSString *plistPath = [[NSBundle mainBundle] pathForResource:fileName ofType:@"plist"];
  plistData = [NSData dataWithContentsOfFile:plistPath];

  {% endhighlight objc %}

2. plist文件转换成NSDictionary

  {% highlight objc %}
  NSDictionary * dictionaryPlist = [NSDictionary dictionaryWithContentsOfFile:plistPath];
  {% endhighlight objc %}

3. plist文件转换成NSArray

  {% highlight objc %}
  NSArray *arrayPlist = [NSArray arrayWithContentsOfFile:plistPath];
  {% endhighlight objc %}

4. plist文件从NSData转换到相应的NSDictionary/NSArray

  {% highlight objc %}
  NSData *plistData;
   NSString *error;
   NSPropertyListFormat format;
   id plist;

   NSString *localizedPath = [[NSBundle mainBundle] pathForResource:fileName ofType:@"plist"];
   plistData = [NSData dataWithContentsOfFile:localizedPath];

  //关键代码
  plist = [NSPropertyListSerialization propertyListFromData:plistData mutabilityOption:NSPropertyListImmutable format:&format errorDescription:&error];

   if (!plist) {
      NSLog(@"Error reading plist from file '%s', error = '%s'", [localizedPath UTF8String], [error UTF8String]);
      [error release];
   }

   return plist;
  {% endhighlight objc %}
