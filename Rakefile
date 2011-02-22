task :publish do |t|
  # Trailing slash is important
  build_path = "#{File.dirname __FILE__}/site/"
  exec "s3cmd", "put", "--recursive", build_path, "s3://www-iangreenleaf-com"
end
