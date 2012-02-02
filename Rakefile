task :publish => :build do |t|
  system( "s3cmd", "sync", "--recursive", build_path, "--delete-removed", "s3://www.iangreenleaf.com" ) || fail
end

task :build do |t|
  system( "git", "clean", "-x", "-d", build_path ) || fail
  system( "staticmatic", "build", "." ) || fail
end

def build_path
  # Trailing slash is important
  "#{File.dirname __FILE__}/build/"
end
