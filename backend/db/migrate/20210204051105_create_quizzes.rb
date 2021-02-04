class CreateQuizzes < ActiveRecord::Migration[6.0]
  def change
    create_table :quizzes do |t|
    t.belongs_to :user
      t.timestamps
    end
  end
end
