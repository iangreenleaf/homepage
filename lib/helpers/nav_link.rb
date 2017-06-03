module NavLinkHelper
  def nav_link text, target, attributes={}
    is_current_path = @item_rep && @item_rep.path == target
    class_names = is_current_path ? "current" : ""
    "<li class=\"#{class_names}\">#{link_to text, target, attributes}</li>"
  end
end
