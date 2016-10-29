require 'rubygems'
require 'bundler'

Bundler.require

require File.expand_path('../app.rb', __FILE__)

#Preprocess CSS
Sass::Plugin.options[:style] = :compressed
Sass::Plugin.add_template_location('assets/stylesheets/sass', 'assets/stylesheets')
use Sass::Plugin::Rack

#ENV['GOOGLE_CLIENT_ID'] = ''
#ENV['GOOGLE_CLIENT_SECRET'] = ''

DB = Sequel.connect(ENV['DATABASE_URL'] || 'sqlite://db/db.db')

require_relative './models/init'

require_relative './controllers/init'
run Wreck


