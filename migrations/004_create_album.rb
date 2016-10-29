Sequel.migration do
  up do
    create_table(:albums) do
      primary_key :id

      String :name, :null => false

      String :description, :null => false

      String :author, :null => false
    end
  end

  down do
    drop_table(:albums)
  end
end