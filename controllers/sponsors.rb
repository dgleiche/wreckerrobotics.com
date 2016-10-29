class Wreck < Sinatra::Application
  get '/sponsors' do
    @page = 'sponsors'

    erb :sponsors
  end
end