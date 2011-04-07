task :publish do |t|
  system "s3cmd", "put", "--recursive", build_path, "s3://www-iangreenleaf-com"
end

task :build do |t|
  system "git", "clean", "-x", "-d", build_path
  system "staticmatic", "build", "."
end

def build_path
  # Trailing slash is important
  "#{File.dirname __FILE__}/build/"
end
