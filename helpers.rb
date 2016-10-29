module Helpers
  include Rack::Utils
  alias_method :h, :escape_html

  def hex(text)
    #Used for encryption
    Digest::SHA2.new(512).hexdigest(text)
  end

  def all_defined?(*items)
    items.each do |item|
      if (!defined? item) || (item == '')
        return false
      end
    end

    true
  end

  alias_method :is_set?, :all_defined?

  def all_ints?(*items)
    items.each do |item|
      #Force boolean value
      if !!(item =~ /^[-+]?[0-9]+$/)
        next
      else
        return false
      end
    end

    true
  end


  def logged_in?
    User[session[:user_id]]
  end

  def user
    User[session[:user_id]] || halt(401)
  end

  # def item_of_cur_usr?(id)
  #   user_id = user.id
  #
  #   user_id_item = Deck.where(:id => h(id)).to_a[0][:user_id]
  #
  #   return user_id == user_id_item
  # rescue
  #   return false
  # end
end