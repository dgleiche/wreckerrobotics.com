Sequel.migration do
  up do
    create_table(:sliders) do
      primary_key :id

      #Image name
      String :img, :null => false

      Integer :sort_order
    end
  end

  down do
    drop_table(:sliders)
  end
end