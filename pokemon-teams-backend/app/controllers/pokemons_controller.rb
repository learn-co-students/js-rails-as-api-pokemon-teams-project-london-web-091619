require 'faker'

class PokemonsController < ApplicationController
  def create
    pokemon = Pokemon.create({
      trainer_id: params["trainerId"],
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name
    })
    render json: pokemon
  end

  def destroy
    Pokemon.find(params[:id]).destroy
  end
end
