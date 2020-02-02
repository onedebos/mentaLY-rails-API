class CreateProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :providers do |t|
      t.string :name
      t.string :email
      t.string :state
      t.string :logo
      t.string :description

      t.timestamps
    end
  end
end
