class Album < Sequel::Model
  one_to_many :galleries

end