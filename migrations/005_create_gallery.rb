Sequel.migration do
  up do
    create_table(:galleries) do
      primary_key :id

      String :description, :null => false

      String :author, :null => false

      #Image name for sprite
      String :img, :null => false

      foreign_key :album_id
    end
  end

  down do
    drop_table(:galleries)
  end
end