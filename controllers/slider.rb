class Wreck < Sinatra::Application
  post '/slider/add' do

    if logged_in?

      #first upload image
      unless params[:file] &&
          (tmpfile = params[:file][:tempfile]) &&
          (fname = params[:file][:filename])
        raise 'No File Received'
      end

      #Make filename 'good'
      fname = fname.tr(' ','-')
      fname = fname.tr('_', '-')
      fname = fname.tr('#', '-')
      fname.downcase!
      fname = 's' + fname

      puts "Uploading File #{fname.inspect}"

      #Dir to upload to
      dir = File.dirname(__FILE__) + '/../assets/images/slider/'

      #Write to new file
      File.open(dir + fname, 'w') do |f|
        f.write(tmpfile.read)
      end

      puts 'Upload Successful'

      #Now add to db
      img_loc = 'images/slider/' + fname

      Slider.insert(:img => img_loc, :sort_order => 1)

      puts "Added Image #{img_loc} Successfully!"

    end
  end

  post '/slider/delete' do
    if logged_in?

      id = h(params[:id])

      @loc = ''
      Slider.where(:id => id).each do |img|
        @loc = img.img
      end

      File.unlink(File.dirname(__FILE__) + '/../assets/' + @loc)

      Slider.where(:id => id).delete

      puts "Deleted Slider Image #{id}"
    end
  end

  post '/slider/update' do
    if logged_in?

      sort = h(params[:sort])
      id = h(params[:id])

      Slider.where(:id => id).update(:sort_order => sort)

      puts "Updated Slider #{id}"
    end
  end

end