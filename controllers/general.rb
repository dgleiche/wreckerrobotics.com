class Wreck < Sinatra::Application
  set :root => File.join(File.dirname(__FILE__), '..'),
      :views => Proc.new { File.join(root, 'views') }

  register Sinatra::AssetPack

  assets do

    serve '/js', from: 'assets/js'
    serve '/css', from: 'assets/stylesheets'
    serve '/images', from: 'assets/images'

    js :application, %W'//code.jquery.com/jquery-migrate-1.2.1.js /js/*.js /js/plugins/*.js'

    js :ie, %W'/js/ie/*.js'

    css :application, %W'/css/*.css'

    js_compression :jsmin
    css_compression :simple

  end

  get '/' do
    @page = 'home'

    erb :main
  end

  not_found do
    status 404
    erb :'404'
  end

end