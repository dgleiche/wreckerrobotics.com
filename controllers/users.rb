class Wreck < Sinatra::Application
  # %w(get post).each do |method|
  #   send(method, '/auth/:provider/callback') do
  #     info = request.env['omniauth.auth'].info.to_hash
  #
  #     halt 500 unless info['email']
  #
  #     unless @user = User.first(:email => info['email'])
  #       @user = User.new
  #       @user.email = info['email']
  #       @user.name = info['name']
  #       @user.image = info['image']
  #     end
  #
  #     halt 500 unless @user.save
  #
  #     session[:user_id] = @user.id
  #
  #     redirect url('/')
  #   end
  # end

  get '/auth/login' do
    @page = 'login'

    erb :login
  end

  #Handle login
  post '/auth/login' do
    email = h(params[:email])
    pass = h(params[:p])

    #Err code 1 is invalid login
    login(email, pass) ? redirect('/') : redirect('/auth/login?err=1')
  end

  get '/auth/logout' do
    session.clear

    redirect to('/')
  end

  get '/register' do
    if logged_in?
      erb :register
    end
  end

  post '/register' do
    if logged_in?

      email = h(params[:email])
      name = h(params[:name])
      pass = h(params[:p])

      User.register(email, name, pass)

      redirect("/register?success=true&name=#{name}")
    end
  end

  def login(email, pass)
    #Use user agent for the session
    user_agent = request.user_agent

    user_arr = User.where(:email => email).to_a

    #Make sure there is one and only one user for a user
    if user_arr.length == 1
      user_arr.each do |user|
        db_pass = user[:password]
        salt = user[:salt]
        id = user[:id]
        name = user[:name]

        password = hex(pass + salt)

        if password == db_pass
          #Correct pass
          session['user_id'] = id
          session['email'] = email
          session['name'] = name

          #For checking if logged in in other places
          session['login-string'] = hex(password + user_agent)

          return true
        else
          #Lol
          return false
        end
      end
    end

    #Well, something went wrong
    false
  end

end