module FlickrHelper
  def flickr static_url, description=""
    img_num = /.*\/([[:digit:]]+)_[[:alnum:]]+.jpg/.match( static_url )[1]
    pic = img static_url, :alt => description
    tag :div, :class => "photo" do
      link pic, "http://www.flickr.com/photos/iangreenleaf/#{img_num}/", :title => description, :rel => "me"
    end
  end
end
