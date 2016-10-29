class User < Sequel::Model

  #NOTE -- Password should already be encrypted here
  def self.register(email, name, pass)
    if (self.where(:email => email)).to_a.length > 0
      #Email already exists
      #Return err code 2
      2
    else
      #Create a random salt
      salt = hex(SecureRandom.hex)

      pass = hex(pass + salt)

      self.insert(:email => email, :password => pass, :salt => salt, :name => name)
    end
  end

  def self.hex(text)
    #Encrypt via SHA2
    Digest::SHA2.new(512).hexdigest(text)
  end

end