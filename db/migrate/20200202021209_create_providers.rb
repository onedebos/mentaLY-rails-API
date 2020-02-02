class CreateProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :providers do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :state, null: false
      t.string :logo
      t.string :description

      t.timestamps
    end
  end
end
