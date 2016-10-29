require 'fileutils'
require 'sprite_factory'

class Wreck < Sinatra::Application
  get '/media/gallery' do
    @page = 'gallery'

    erb :albums
  end

  post '/album/add' do
    if logged_in?
      name = h(params[:name])
      description = h(params[:description])

      unless (name && description) then raise 'Something is wrong' end

      curUser = user.name

      Album.insert(:name => name, :description => description, :author => curUser)

      puts "Successfully added album #{name} by #{curUser}"
    end
  end

  post '/album/update' do
    if logged_in?

      name = h(params[:name])
      description = h(params[:description])
      id = h(params[:id])

      Album.where(:id => id).update(:name => name, :description => description)

      puts "Updated Album #{name}"
    end
  end

  post '/album/delete' do
    if logged_in?

      id = h(params[:id])

      Album.where(:id => id).delete

      puts "Deleted Album #{id}"
    end
  end

  #Gallery
  get '/media/gallery/:id' do
    @id = h(params[:id])

    @page = 'gallery'

    Album.where(:id => @id).each do |album|
      @name = album.name
      @description = album.description
    end

    erb :gallery
  end

  #Add image to gallery
  post '/gallery/add' do
    if logged_in?
      #post vars
      description = h(params[:description])
      album_id = h(params[:album])

      Album.where(:id => album_id).each do |album|
        @album_name = album.name
      end

      #first upload image
      unless params[:file] &&
          (tmpfile = params[:file][:tempfile]) &&
          (fname = params[:file][:filename])
        raise 'No File Received'
      end

      puts "Uploading File #{fname.inspect}"

      @album_name = @album_name.tr(' ', '-')

      dir = File.dirname(__FILE__) + '/../assets/images/gallery/' + @album_name + '/'

      unless File.directory?(dir)
        FileUtils.mkdir_p(dir)
      end

      #Replace spaces and underscores with dashes in file name to make it css friendly
      #Also add a letter to ensure first char is a letter
      fname = fname.tr(' ','-')
      fname = fname.tr('_', '-')
      fname = fname.downcase
      fname = 'a' + fname

      File.open(dir + fname, 'w') do |f|
        f.write(tmpfile.read)
      end

      puts 'Upload Successful'

      #Now add to db
      img_name = File.basename(fname, '.*')

      Gallery.insert(:description => description, :album_id => album_id, :img => img_name, :author => user.name)

      puts "Added Image by #{user.name} Successfully!"

      #Re-create the sprite sheet
      output_dir = File.dirname(__FILE__) + '/../assets/stylesheets/sprite.css'

      cssurl = '/images/'

      sDir = File.dirname(__FILE__) + '/../assets/images/gallery/'

      SpriteFactory.run!(sDir, :output_style => output_dir, :cssurl => cssurl)
    end
  end
end