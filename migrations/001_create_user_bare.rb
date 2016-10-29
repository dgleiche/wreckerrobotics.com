Sequel.migration do
  up do
    create_table(:users) do
      primary_key :id

      String :name

      String :email, :null => false, :unique => true

      String :password, :size => 128
      String :salt, :size => 128
    end
  end

  down do
    drop_table(:users)
  end
end