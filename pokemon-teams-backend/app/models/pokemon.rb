class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.create_random(trainer_id)
    Pokemon.create({
      trainer_id: trainer_id,
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name
    })
  end
end
