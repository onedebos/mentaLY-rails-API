class CreateAppointments < ActiveRecord::Migration[6.0]
  def change
    create_table :appointments do |t|
      t.string :city
      t.references :user, null: false, foreign_key: true
      t.references :provider, null: false, foreign_key: true
      t.date :date, null: false
      t.time :time, null: false

      t.timestamps
    end
  end
end
