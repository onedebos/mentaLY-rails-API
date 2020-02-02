class CreateAppointments < ActiveRecord::Migration[6.0]
  def change
    create_table :appointments do |t|
      t.string :city
      t.references :user, null: false, foreign_key: true
      t.references :provider, null: false, foreign_key: true
      t.date :date
      t.time :time

      t.timestamps
    end
  end
end
