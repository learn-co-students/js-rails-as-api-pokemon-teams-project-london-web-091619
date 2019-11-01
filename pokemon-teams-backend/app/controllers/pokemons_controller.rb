class PokemonsController < ApplicationController
  def create
    render json: Pokemon.create_random(params["trainerId"])
  end

  def destroy
    Pokemon.find(params[:id]).destroy
  end
end
