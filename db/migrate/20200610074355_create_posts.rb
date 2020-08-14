class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content #カラムを追加できます。
      t.boolean :checked
      # ↪︎boolean型:trueまたはfalseの真理値を判断する型。（既読か未読かを判断するために記述）
      t.timestamps
    end
  end
end
