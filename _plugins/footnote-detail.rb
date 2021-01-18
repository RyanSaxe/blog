module Jekyll
    module AssetFilter
      def fndetail(input, id)
        "<li id='fn-#{id}'>#{input}<a href='#fnref-#{id}' class='footnote footnotes'>↩</a></li>"
      end
    end
  end
  
Liquid::Template.register_filter(Jekyll::AssetFilter)
