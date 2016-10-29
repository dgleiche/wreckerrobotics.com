class Wreck < Sinatra::Application
  #Opts : server, from, subject, body
  def send_email(to,opts={})
    opts[:server]      ||= 'localhost'
    opts[:from]        ||= 'mailer@wreckerrobotics.com'
    opts[:subject]     ||= 'Default Subject'
    opts[:body]        ||= 'Default Body'

    msg = <<END_OF_MESSAGE
From: <#{opts[:from]}>
To: #{to}
Subject: #{opts[:subject]}

    #{opts[:body]}
END_OF_MESSAGE

    Net::SMTP.start(opts[:server]) do |smtp|
      smtp.send_message msg, opts[:from], to
    end
  end

  get '/contact' do
    @page = 'contact'

    erb :contact
  end

  #Send the email
  post '/contact' do
    email = h(params[:email])
    subject = h(params[:subject])
    msg = h(params[:msg])

    email_to = %W'dgleiche@me.com rgleiche@wreckerrobotics.com madelinemds97@optonline.net eonsin@126.com svisme@me.com'

    send_email(email_to, :subject=>subject, :from=>email, :body=>msg)

    redirect '/contact?success=true'
  end

end