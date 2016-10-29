class Gallery < Sequel::Model
  many_to_one :album

end