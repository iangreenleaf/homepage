module VimeoHelper
  def vimeo video_id, title, opts={}
    tag :div, :id => urlify( title ), :class => "video vimeo" do
      if opts[ :embed ]
        tag( :h2 ) do title end + \
        tag( :iframe, :src => "http://player.vimeo.com/video/#{video_id}", :width => "400", :height => "300", :frameborder => "0" ) do "" end
      else
        link_to title, "http://vimeo.com/#{video_id}"
      end
    end
  end
end
