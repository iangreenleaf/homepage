module DateModifiedHelper
  def date_modified filename
    path = "#{File.dirname __FILE__}/../../content/#{filename}"
    File.mtime path
  end
end
