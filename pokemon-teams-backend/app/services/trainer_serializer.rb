class TrainerSerializer
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          only: %i[id species nickname]
        }
      },
      only: %i[id name]
    }

    @trainer.to_json(options)
  end
end
