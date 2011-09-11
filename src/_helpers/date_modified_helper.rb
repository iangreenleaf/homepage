module DateModifiedHelper
  def date_modified filename
    path = "#{File.dirname __FILE__}/../#{filename}"
    File.mtime path
  end
end
