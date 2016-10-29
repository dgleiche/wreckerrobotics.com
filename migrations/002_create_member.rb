Sequel.migration do
  up do
    create_table(:members) do
      primary_key :id

      String :name, :null => false

      #0 - capt; 1 - member; 2 - alum
      Integer :status, :null => false

      #Location
      String :img

      Text :bio
    end
  end

  down do
    drop_table(:members)
  end
end