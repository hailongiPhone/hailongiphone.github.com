require "rubygems"
require 'rake'
require 'fileutils'

task :default => :generate

desc 'Create new post with rake "post[post-name]"'
task :post, [:title,:category] do |t, args|
  if args.title then
    new_post(args.title,args.category)
  else
    puts 'rake "post[post-name]"'
  end
end

desc 'Run local server'
task :generate => :clean do
  `bundle exec jekyll serve`
end

desc 'Deploy with rake "depoly[comment]"'
task :deploy, [:comment] => :generate do |t, args|
  if args.comment then
    `git add . && git commit -m '#{args.comment}' && git push`
  else
    `git add . && git commit -m 'new deployment' && git push`
  end
end

desc 'Clean up'
task :clean do
  `rm -rf _site`
end

def new_post(title,category)
   filename = "#{Time.now.strftime('%Y-%m-%d')}-#{title}.markdown"
   if category
     filename = File.join("#{category}", filename)

     path2 = File.join("_posts",category)
      if ! File.exist? path2
        Dir.mkdir(path2)
      end
   end

    path = File.join("_posts", filename)
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
   `git add . && atom #{path}`
end
