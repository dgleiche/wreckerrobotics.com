class Wreck < Sinatra::Application

  configure do
    #enable :sessions
    disable :method_override

    set :httponly => true,
        secure: true,
        :static => false,
        :environment => :development

    use Rack::Session::Cookie, :key => 'rack.session',
        :expire_after => 31557600,
        :secret => '361164d479131da9edd341eece70df93902efaa2de230d08226aa64e3ae2eb1bfd265b11f7bbdb9e1543d7fee114aacda59fbcc05ea177d304b86ca2726326c1'

    # use OmniAuth::Builder do
    #   provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'],
    #            {
    #                :name => 'google',
    #                :prompt => 'select_account',
    #                :scopes => 'email, plus.login',
    #                :image_aspect_ratio => 'square',
    #                :image_size => 140
    #            }
    # end
  end

  use Rack::Deflater

  Sequel.extension :inflector

  require './helpers'
  helpers Helpers

end