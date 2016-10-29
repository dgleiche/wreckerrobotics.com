class Wreck < Sinatra::Application
  get '/about' do
    @page = 'about'

    erb :about
  end

  post '/member/add' do
    if logged_in?
      #post vars
      name = h(params[:name])
      bio = params[:bio]
      status = h(params[:status])

      #Switch status to appropriate int
      case status
        when 'Captain'
          status = 0
        when 'Member'
          status = 1
        when 'Alum'
          status = 2
        else
          raise 'Unknown Status Received'
      end

      #first upload image
      unless params[:file] &&
          (tmpfile = params[:file][:tempfile]) &&
          (fname = params[:file][:filename])
        raise 'No File Received'
      end

      puts "Uploading File #{fname.inspect}"

      dir = File.dirname(__FILE__) + '/../assets/images/members/'

      File.open(dir + fname, 'w') do |f|
        f.write(tmpfile.read)
      end

      puts 'Upload Successful'

      #Now add to db
      imgLoc = 'images/members/' + fname

      Member.insert(:name => name, :bio => bio, :status => status, :img => imgLoc)

      puts "Added Member #{name} Successfully!"

    end
  end

  post '/member/update' do
    if logged_in?

      name = h(params[:name])
      status = h(params[:status])
      bio = params[:bio]
      id = h(params[:id])

      #Switch status to appropriate int
      case status
        when 'Captain'
          status = 0
        when 'Member'
          status = 1
        when 'Alum'
          status = 2
        else
          raise 'Unknown Status Received'
      end

      Member.where(:id => id).update(:name => name, :status => status, :bio => bio)

      puts "Updated Member #{name}"
    end
  end

  post '/member/delete' do
    if logged_in?

      id = h(params[:id])

      Member.where(:id => id).delete

      puts "Deleted Member #{id}"
    end
  end

end