task :publish => :build do |t|
  system( "s3cmd", "sync", "--guess-mime-type", "--no-mime-magic", "--recursive", build_path, "--delete-removed", "s3://www.iangreenleaf.com" ) || fail
end

task :build do |t|
  system( "nanoc", "compile", "." ) || fail
end

def build_path
  # Trailing slash is important
  "#{File.dirname __FILE__}/build/"
end
