class Wreck < Sinatra::Application
  get '/announcements' do
    @page = 'announcements'

    erb :announcements
  end

  post '/announcement/add' do
    if logged_in?
      title = h(params[:title])
      text = params[:post]

      unless (title && text) then raise 'Something is wrong' end

      curUser = user.name

      Announcement.insert(:title => title, :text => text, :author => curUser)

      puts "Successfully added article by #{curUser}"
    end
  end

  post '/announcement/update' do
    if logged_in?

      title = h(params[:title])
      text = params[:post]
      id = h(params[:id])

      Announcement.where(:id => id).update(:title => title, :text => text)

      puts "Updated Article #{title}"
    end
  end

  post '/announcement/delete' do
    if logged_in?

      id = h(params[:id])

      Announcement.where(:id => id).delete

      puts "Deleted Article #{id}"
    end
  end
end