class Wreck < Sinatra::Application
  get '/auto_sim' do
    @page = 'auto'

    erb :auton
  end
end