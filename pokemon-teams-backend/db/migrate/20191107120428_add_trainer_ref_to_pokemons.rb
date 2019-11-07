class AddTrainerRefToPokemons < ActiveRecord::Migration[5.2]
  def change
    add_reference :pokemons, :trainers, foreign_key: true
  end
end
