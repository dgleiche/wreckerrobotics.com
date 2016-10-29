Sequel.migration do
  up do
    create_table(:announcements) do
      primary_key :id

      String :title, :null => false

      Text :text, :null => false

      String :author, :null => false

      Date :date
    end
  end

  down do
    drop_table(:announcements)
  end
end