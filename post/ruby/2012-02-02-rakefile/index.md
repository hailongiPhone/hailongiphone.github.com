```

desc 'Create new post with rake "post[post-name]"'
task :post, [:title,:category] do |t, args|
  if args.title then
    new_post(args.title,args.category)
  else
    puts 'rake "post[post-name]"'
  end
end

def new_post(title,category)
   filename = "#{Time.now.strftime('%Y-%m-%d')}-#{title}.markdown"
   if category
     filename = File.join("#{category}", filename)

     path2 = File.join("post",category)
      if ! File.exist? path2
        File.makedirs(path2)
      end
   end

    path = File.join("posts", filename)
    if File.exist? path; raise RuntimeError.new("Won't clobber #{path}"); end
      File.open(path, 'w') do |file|
        file.write <<-EOS
    ---
    layout: post
    category: #{category}
    title: #{title}
    date: #{Time.now.strftime('%Y-%m-%d %k:%M:%S')}
    ---
    EOS
      end
   `git add #{path}`
end


```
