module VimeoHelper
  def vimeo video_id, title
    tag :div, :id => urlify( title ), :class => "video" do
      tag( :h2 ) do title end + \
      tag( :iframe, :src => "http://player.vimeo.com/video/#{video_id}", :width => "400", :height => "300", :frameborder => "0" ) do "" end
    end
  end
end
